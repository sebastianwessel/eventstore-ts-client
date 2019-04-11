import {expect} from 'chai'
import {Eventstore} from '../../../src'
import * as assert from 'assert'

describe('Connection test', (): void => {
  it('can connect to eventstore single node', async (): Promise<void> => {
    const es = new Eventstore({
      clientId: 'ts-client-test',
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
      clientId: 'ts-client-test',
      credentials: {
        username: 'invalidUser',
        password: 'wrongpassword'
      }
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
    clientId: 'ts-client-test',
    credentials: {
      username: 'restrictedUser',
      password: 'restrictedOnlyUserPassword'
    }
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
