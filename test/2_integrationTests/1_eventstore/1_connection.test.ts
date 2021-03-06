import {expect} from 'chai'
import {Eventstore} from '../../../src'
import * as assert from 'assert'
import * as bunyan from 'bunyan'
import * as fs from 'fs'
import {setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'

describe('Connection test', (): void => {
  it('creates an instance without config', async (): Promise<void> => {
    const es = new Eventstore()
    expect(es.isConnected).not.to.true
  })

  it('creates an instance with eventstore settings object', async (): Promise<void> => {
    const es = new Eventstore(setConnectionSettings({}))
    expect(es.isConnected).not.to.true
  })

  it('returns false if not connected', async (): Promise<void> => {
    const es = new Eventstore({
      uri: 'tcp://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:1113'
    })
    expect(es.isConnected).not.to.true
  })

  it('does nothing if not connected', async (): Promise<void> => {
    const es = new Eventstore({
      uri: 'tcp://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:1113'
    })
    await es.disconnect()
    expect(true).to.be.true
  })

  it('set a logger', (): void => {
    const es = new Eventstore({
      uri: 'tcp://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:1113'
    })
    es.logger = bunyan.createLogger({name: 'unittest'})
    expect(true).to.be.true
  })

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

  it('can connect to eventstore single node to default port', async (): Promise<void> => {
    const es = new Eventstore({
      uri: 'tcp://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net'
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

  it('can connect to eventstore cluster secure tcp', async (): Promise<void> => {
    const es = new Eventstore({
      uri: 'discover://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:2112',
      useSSL: true
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

  it('can ssl connect to eventstore with cert & strict validation', async (): Promise<void> => {
    const es = new Eventstore({
      uri: 'discover://restrictedUser:restrictedOnlyUserPassword@escluster.net:2112',
      useSSL: true,
      validateServer: true,
      secureContext: {
        ca: fs.readFileSync('./test/2_integrationTests/testSetup/rootCA.crt'),
        key: fs.readFileSync('./test/2_integrationTests/testSetup/domain.key'),
        cert: fs.readFileSync('./test/2_integrationTests/testSetup/domain.crt')
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

  it('throws on invalid secure context', async (): Promise<void> => {
    const es = new Eventstore({
      uri: 'discover://restrictedUser:restrictedOnlyUserPassword@escluster.net:2112',
      useSSL: true,
      validateServer: true,
      secureContext: {
        ca: fs.readFileSync('./test/2_integrationTests/testSetup/rootCA.crt'),
        key: fs.readFileSync('./test/2_integrationTests/testSetup/invalid.key'),
        cert: fs.readFileSync('./test/2_integrationTests/testSetup/domain.crt')
      }
    })
    try {
      await es.connect()
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreConnectionError')
      assert.ok('has thrown')
    }
    expect(es.isConnected).not.to.true
  })

  it('finds cluster node over dns (require master)', async (): Promise<void> => {
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

  it('finds cluster node over dns', async (): Promise<void> => {
    const es = new Eventstore({
      uri: '',
      requireMaster: false,
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
