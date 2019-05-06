/* eslint-disable @typescript-eslint/no-explicit-any */
import * as assert from 'assert'
import {Eventstore} from '../../../src'

describe('get stream names by category', (): void => {
  const es = new Eventstore({
    uri: 'discover://admin:changeit@cluster1.escluster.net:2112',
    clientId: 'ts-client-test',
    useSSL: true
  })

  const streamList = [
    'projectiontest-56e774fc-6dc6-49f5-bd6f-e9733aa61dfa',
    'projectiontest-7b5aedec-f3b2-44cf-b3d7-9c8b9b947ecd',
    'projectiontest-98cb75de-3a70-49ac-b4fd-e96ae542452c'
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

  it('returns all stream names for category', async (): Promise<void> => {
    let walker
    try {
      walker = await es.streamNamesByCategory('projectiontest')
      const result = await walker.toArray()
      assert.ok('ok')
      assert.strictEqual(result.length, 3)
      result.forEach(
        (stream): void => {
          assert.strictEqual(streamList.includes(stream.data), true)
        }
      )
    } catch (err) {
      assert.fail(err)
    }
  })
})
