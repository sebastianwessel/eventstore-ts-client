import {expect} from 'chai'
import {Eventstore} from '../../../src'
import * as assert from 'assert'

describe('Connection test', (): void => {
  it('can connect to eventstore', async (): Promise<void> => {
    const es = new Eventstore()
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
})

describe('Basic connection test', (): void => {
  const es = new Eventstore({clientId: 'ts-client-test'})
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
