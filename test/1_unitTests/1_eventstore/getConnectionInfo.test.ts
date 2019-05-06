import {
  getIpListFromDns,
  fetchgossipJson,
  getIpAndPort
} from '../../../src/eventstore/getConnectInfo'
import * as assert from 'assert'
import * as bunyan from 'bunyan'
import {setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'

describe('Gossip connection info', (): void => {
  const log = bunyan.createLogger({name: 'unittest'})

  it('returns empty array on dns error', async (): Promise<void> => {
    const result = await getIpListFromDns('unknown', log)
    assert.strictEqual(JSON.stringify(result), JSON.stringify([]))
  })

  it('returns null on error', async (): Promise<void> => {
    const result = await fetchgossipJson('unknown', 80, true, 100, log)
    assert.strictEqual(result, null)
  })

  it('returns same settings', async (): Promise<void> => {
    const originalSettings = setConnectionSettings({
      uri: '',
      host: '',
      port: 0,
      gossipSeeds: [],
      clusterDns: ''
    })
    const result = await getIpAndPort({...originalSettings}, log)
    assert.strictEqual(JSON.stringify(result), JSON.stringify(originalSettings))
  })
})
