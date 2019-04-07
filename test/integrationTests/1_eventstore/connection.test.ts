import {expect} from 'chai'
import {Eventstore} from '../../../src'
import * as assert from 'assert'

describe('Connection test', () => {
  it('can connect to eventstore', async () => {
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

describe('Basic connection test', () => {
  const es = new Eventstore({clientId: 'ts-client-test'})
  before(async () => {
    await es.connect()
  })

  after(async () => {
    await es.disconnect()
  })

  it('returns clientId - name of connection', () => {
    expect(es.name).to.be.equal('ts-client-test')
  })

  it('can ping eventstore', async () => {
    try {
      await es.ping()
      assert.ok('get pong response from ping request')
    } catch (err) {
      assert.fail(err)
    }
  })
})
