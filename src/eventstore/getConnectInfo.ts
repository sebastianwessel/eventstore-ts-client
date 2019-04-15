import * as dns from 'dns'
import * as util from 'util'
import * as request from 'request-promise-native'
import * as bunyan from 'bunyan'
import {JSONValue} from '../JSON'
import {URL} from 'url'
import {EventstoreSettings} from './EventstoreSettings'

const getIpListFromDns = async (dnsServer: string, log: bunyan): Promise<string[]> => {
  const lookup = util.promisify(dns.lookup)
  const dnsOptions = {
    family: 4,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
    all: true
  }
  log.debug({dnsServer}, 'Fetch ip list from dns')
  let ipList: string[] = []

  try {
    const result:
      | {address: string | dns.LookupAddress[]; family?: number}
      | dns.LookupAddress[] = await lookup(dnsServer, dnsOptions)

    if (Array.isArray(result)) {
      ipList = result.map((entry: dns.LookupAddress): string => entry.address)
    }
    log.debug({dnsServer, ipList}, 'Finished dns lookup')
  } catch (err) {
    log.error({err}, 'Failed to fetch dns information')
  }

  return ipList
}

const fetchgossipJson = async (
  host: string,
  port: number,
  useHttps: boolean,
  timeout: number,
  log: bunyan
): Promise<
  | JSONValue & {
      members: {
        state: string
        externalTcpIp: string
        externalTcpPort: number
        externalSecureTcpPort: number
        isAlive: boolean
      }[]
    }
  | null
> => {
  let gossipInfo = null
  const protocol = useHttps ? 'https' : 'http'
  try {
    log.debug({host, protocol, port}, 'Try to fetch gossip info')
    gossipInfo = await request.get({
      uri: `${protocol}://${host}:${port}/gossip?fomat=json`,
      json: true,
      timeout
    })
  } catch (err) {
    log.error({err}, 'No gossip info found')
  }
  return gossipInfo
}

const getMasterNodeInfo = (
  gossipInfo: JSONValue & {
    members: {
      state: string
      externalTcpIp: string
      externalTcpPort: number
      externalSecureTcpPort: number
      isAlive: boolean
    }[]
  }
): {ip: string; tcpPort: number; tcpSecurePort: number} | null => {
  if (!gossipInfo) {
    return null
  }
  let nodeInfo = null

  const aliveList = gossipInfo.members.filter(
    (entry): boolean => entry.isAlive && entry.state.toLowerCase() === 'master'
  )
  if (aliveList.length > 0) {
    nodeInfo = {
      ip: aliveList[0].externalTcpIp,
      tcpPort: aliveList[0].externalTcpPort,
      tcpSecurePort: aliveList[0].externalSecureTcpPort
    }
  }

  return nodeInfo
}

const getRandomNodeInfo = (
  gossipInfo: JSONValue & {
    members: {
      state: string
      externalTcpIp: string
      externalTcpPort: number
      externalSecureTcpPort: number
      isAlive: boolean
    }[]
  }
): {ip: string; tcpPort: number; tcpSecurePort: number} | null => {
  if (!gossipInfo) {
    return null
  }
  let nodeInfo = null

  const aliveList = gossipInfo.members.filter(
    (entry): boolean => {
      const skipItWhen = ['manager', 'shuttingdown', 'shutdown']
      return entry.isAlive && !skipItWhen.includes(entry.state)
    }
  )
  if (aliveList.length > 0) {
    const pos = Math.floor(Math.random() * aliveList.length)
    nodeInfo = {
      ip: aliveList[pos].externalTcpIp,
      tcpPort: aliveList[pos].externalTcpPort,
      tcpSecurePort: aliveList[pos].externalSecureTcpPort
    }
  }

  return nodeInfo
}

export const getIpAndPort = async (
  currentSettings: EventstoreSettings,
  log: bunyan
): Promise<EventstoreSettings> => {
  let gossipJson:
    | JSONValue & {
        members: {
          state: string
          externalTcpIp: string
          externalTcpPort: number
          externalSecureTcpPort: number
          isAlive: boolean
        }[]
      }
    | null = null

  if (currentSettings.uri && currentSettings.uri !== '') {
    const esUrl = new URL(currentSettings.uri)

    if (esUrl.username && esUrl.username !== '') {
      currentSettings.credentials.username = esUrl.username
    }
    if (esUrl.password && esUrl.password !== '') {
      currentSettings.credentials.password = esUrl.password
    }

    if (currentSettings.uri.toLowerCase().startsWith('tcp')) {
      //single node connection
      log.debug('Config for single node connection found')
      currentSettings.port = parseInt(esUrl.port) || 1113
      currentSettings.host = esUrl.hostname
      return currentSettings
    } else if (currentSettings.uri.toLowerCase().startsWith('discover')) {
      log.debug('Config for discover node connection found')
      //gossip
      gossipJson = await fetchgossipJson(
        esUrl.hostname,
        parseInt(esUrl.port),
        currentSettings.useHttps,
        currentSettings.gossipTimeout,
        log
      )
    }
  } else {
    //if we have a dns server we look for cluster node ip's
    if (currentSettings.clusterDns && currentSettings.clusterDns !== '') {
      const ipList = await getIpListFromDns(currentSettings.clusterDns, log)
      if (ipList.length > 0) {
        log.debug(`Found ${ipList.length} entries in DNS record`)
        //add dns lookup ip list
        const updatedList = ipList.concat(currentSettings.gossipSeeds)
        //remove duplicates from list
        currentSettings.gossipSeeds = [...new Set(updatedList)]
      }
    }

    //if we've a list of ip's we try to fetch gossipJson
    if (currentSettings.gossipSeeds.length > 0) {
      log.debug(
        `Try to find gossipJson from seed list of ${currentSettings.gossipSeeds.length} entries`
      )
      let found = false
      for (
        let x = 0, xMax = currentSettings.gossipSeeds.length;
        x < xMax && !found && x < currentSettings.maxDiscoverAttempts;
        x++
      ) {
        const res = await await fetchgossipJson(
          currentSettings.gossipSeeds[x],
          currentSettings.externalGossipPort,
          currentSettings.useHttps,
          currentSettings.gossipTimeout,
          log
        )
        if (res) {
          found = true
          gossipJson = res
        }
      }
    } else {
      log.debug('Gossip seed list empty')
    }
  }

  if (!gossipJson) {
    log.warn('Could not get any gossip info')
    return currentSettings
  }

  let nodeInfo: {ip: string; tcpPort: number; tcpSecurePort: number} | null = null

  if (currentSettings.requireMaster) {
    nodeInfo = getMasterNodeInfo(gossipJson)
    log.debug({nodeInfo}, 'Selecting master node')
  } else {
    nodeInfo = getRandomNodeInfo(gossipJson)
    log.debug({nodeInfo}, 'Selecting unspecific node')
  }

  if (nodeInfo) {
    currentSettings.host = nodeInfo.ip
    currentSettings.port = currentSettings.useSSL ? nodeInfo.tcpSecurePort : nodeInfo.tcpPort
  }

  return currentSettings
}
