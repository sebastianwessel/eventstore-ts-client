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

  let ipList: string[] = []

  try {
    const result:
      | {address: string | dns.LookupAddress[]; family?: number}
      | dns.LookupAddress[] = await lookup(dnsServer, dnsOptions)

    if (Array.isArray(result)) {
      ipList = result.map((entry: dns.LookupAddress): string => entry.address)
    }
  } catch (err) {
    log.error({err}, 'Failed to fetch dns information')
  }

  return ipList
}

const fetchgossipJson = async (
  host: string,
  port: number,
  useSSL: boolean,
  timeout: number,
  log: bunyan
): Promise<JSONValue | null> => {
  let gossipInfo = null
  try {
    await request.get({uri: `http://${host}:${port}/gossip?fomat=json`, json: true, timeout})
  } catch (err) {
    log.error({err}, 'No gossip info found')
  }
  return gossipInfo
}

const getMasterNodeInfo = async (
  gossipInfo: JSONValue & {
    members: {
      state: string
      externalTcpIp: string
      externalTcpPort: number
      externalSecureTcpPort: number
      isAlive: boolean
    }[]
  }
): Promise<{ip: string; tcpPort: number; tcpSecurePort: number} | null> => {
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

const getIpAndPort = async (
  currentSettings: EventstoreSettings,
  log: bunyan
): Promise<EventstoreSettings> => {
  let gossipJson = null

  if (currentSettings.uri && currentSettings.uri !== '') {
    const esUrl = new URL(currentSettings.uri)

    if (esUrl.username && esUrl.username !== '') {
      currentSettings.credentials.username = esUrl.username
    }
    if (esUrl.password && esUrl.password !== '') {
      currentSettings.credentials.password = esUrl.password
    }

    if (esUrl.protocol.toLowerCase() === 'tcp') {
      //single node connection
      log.debug('Config for single node connection found')
      currentSettings.port = parseInt(esUrl.port) || 1113
      currentSettings.host = esUrl.hostname
      return currentSettings
    } else if (esUrl.protocol.toLowerCase() === 'discover') {
      log.debug('Config for discover node connection found')
      //gossip
      gossipJson = await fetchgossipJson(
        esUrl.hostname,
        parseInt(esUrl.port),
        currentSettings.useSSL,
        currentSettings.gossipTimeout,
        log
      )
    }
  } else {
    //if we have a dns server we look for cluster node ip's
    if (currentSettings.clusterDns && currentSettings.clusterDns !== '') {
      log.debug('Fetching ip list from dns server')
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
    }
  }

  return currentSettings
}
