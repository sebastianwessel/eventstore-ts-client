/* eslint-disable @typescript-eslint/no-explicit-any */
import * as assert from 'assert'
import {Eventstore} from '../../../src'

describe('walkEventsByCorrelationId', (): void => {
  const es = new Eventstore({
    uri: 'discover://admin:changeit@cluster1.escluster.net:2112',
    clientId: 'ts-client-test',
    useSSL: true
  })

  const validateIdArray = [
    '6072f9ce-1235-44ec-998d-7f4869dafaa4',
    '1227f490-9921-498d-a6fc-3d14195a40eb',
    '66fbbc77-6e6f-4d16-a208-871efdb4a4bb',
    'd8ae42b1-6ffb-494e-a40c-d463a73f03e4'
  ]

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

  it('returns all resolved events for given uuid', async (): Promise<void> => {
    let walker
    try {
      walker = await es.walkEventsByCorrelationId('b9599c37-ce20-415a-bbb5-6d8a1da97cec')
      const result = await walker.toArray()
      assert.ok('ok')
      assert.strictEqual(result.length, 4)
      assert.strictEqual(result[0].name, 'CommandEvent')
      assert.strictEqual(result[1].name, 'CausedEvent1')
      assert.strictEqual(result[2].name, 'CausedEvent2')
      assert.strictEqual(result[3].name, 'CausedEvent3')
    } catch (err) {
      assert.fail(err)
    }
  })

  it('returns all linked events for given uuid', async (): Promise<void> => {
    let walker
    try {
      walker = await es.walkEventsByCorrelationId('b9599c37-ce20-415a-bbb5-6d8a1da97cec', 0, false)
      const result = await walker.toArray()
      assert.ok('ok')
      assert.strictEqual(result.length, 4)
      assert.strictEqual(result[1].metadata.$causedBy, validateIdArray[1])
      assert.strictEqual(result[2].metadata.$causedBy, validateIdArray[2])
      assert.strictEqual(result[3].metadata.$causedBy, validateIdArray[3])
    } catch (err) {
      assert.fail(err)
    }
  })
})
