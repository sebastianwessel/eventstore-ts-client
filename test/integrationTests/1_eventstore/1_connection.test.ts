import {expect} from 'chai'
import {Eventstore} from '../../../src'
import * as assert from 'assert'

describe('Connection test', (): void => {
  it('can connect to eventstore single node unsecure', async (): Promise<void> => {
    const es = new Eventstore({
      uri: 'tcp://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:1113'
    })
    try {
      await es.connect()
      assert.ok('connected')
      await es.disconnect()
      assert.ok('disconnects')
    } catch (err) {
      assert.fail(err)
    }
    expect(es.isConnected).not.to.true
  })

  it('can connect to eventstore cluster unsecure', async (): Promise<void> => {
    const es = new Eventstore({
      uri: 'discover://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:2112'
    })
    try {
      await es.connect()
      assert.ok('connected')
      await es.disconnect()
      assert.ok('disconnects')
    } catch (err) {
      assert.fail(err)
    }
    expect(es.isConnected).not.to.true
  })

  it('finds cluster node over dns', async (): Promise<void> => {
    const es = new Eventstore({
      uri: '',
      clusterDns: 'escluster.net',
      credentials: {
        username: 'restrictedUser',
        password: 'restrictedOnlyUserPassword'
      }
    })
    try {
      await es.connect()
      assert.ok('connected')
      await es.disconnect()
      assert.ok('disconnects')
    } catch (err) {
      assert.fail(err)
    }
    expect(es.isConnected).not.to.true
  })

  it('finds cluster node from seed list', async (): Promise<void> => {
    const es = new Eventstore({
      uri: '',
      gossipSeeds: ['172.22.0.2', '172.22.0.3', '172.22.0.4'],
      credentials: {
        username: 'restrictedUser',
        password: 'restrictedOnlyUserPassword'
      }
    })
    try {
      await es.connect()
      assert.ok('connected')
      await es.disconnect()
      assert.ok('disconnects')
    } catch (err) {
      assert.fail(err)
    }
    expect(es.isConnected).not.to.true
  })

  it('it throws on invalid credentials', async (): Promise<void> => {
    const es = new Eventstore({
      uri: 'tcp://invalidUser:wrongpassword@cluster1.escluster.net:1113',
      clientId: 'ts-client-test'
    })
    try {
      await es.connect()
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreNotAuthenticatedError')
    }
    expect(es.isConnected).not.to.true
  })
})

describe('Basic connection test', (): void => {
  const es = new Eventstore({
    uri: 'discover://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:2112',
    clientId: 'ts-client-test'
  })
  before(
    async (): Promise<void> => {
      await es.connect()
    }
  )

  after(
    async (): Promise<void> => {
      await es.disconnect()
    }
  )

  it('returns clientId - name of connection', (): void => {
    expect(es.name).to.be.equal('ts-client-test')
  })

  it('can ping eventstore', async (): Promise<void> => {
    try {
      await es.ping()
      assert.ok('get pong response from ping request')
    } catch (err) {
      assert.fail(err)
    }
  })
})
