/* eslint-disable @typescript-eslint/no-explicit-any */
import * as assert from 'assert'
import {Eventstore} from '../../../src'

describe('Read all events', (): void => {
  const es = new Eventstore({
    uri: 'discover://admin:changeit@cluster1.escluster.net:2112',
    clientId: 'ts-client-test',
    useSSL: true
  })

  let forwardResult: any[]
  let backwardResult: any[]

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

  it('reads  all events forward', async (): Promise<void> => {
    let slice
    try {
      slice = await es.walkAllForward()
      forwardResult = await slice.toArray()

      assert.ok('ok')
    } catch (err) {
      assert.fail(err)
    }

    assert.strictEqual(forwardResult.length > 10000, true)
  })

  it('reads  all events backward', async (): Promise<void> => {
    let slice
    try {
      slice = await es.walkAllBackward()
      backwardResult = await slice.toArray()

      assert.ok('ok')
    } catch (err) {
      assert.fail(err)
    }

    assert.strictEqual(backwardResult.length > 10000, true)
  })

  it('matches end/start entries', (): void => {
    assert.strictEqual(forwardResult[0].eventId, backwardResult[backwardResult.length - 1].eventId)
    assert.strictEqual(
      forwardResult[forwardResult.length - 1].eventId,
      backwardResult[backwardResult.length - forwardResult.length].eventId
    )
  })
})
