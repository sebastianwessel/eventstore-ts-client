import * as assert from 'assert'
import {Eventstore} from '../../../src'
describe('Read stream basic tests', (): void => {
  const es = new Eventstore()
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

  describe('Read one event', async (): Promise<void> => {
    it('returns a event by given eventNumber', async (): Promise<void> => {
      const event = await es
        .stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
        .getEventByNumber(0, true)
      const data: {count?: number} = event.data

      assert.strictEqual(event.name, 'EventTypeOne')
      assert.notEqual(event.data, null)
      assert.strictEqual(data.count, 1)
    })

    it('returns first event of stream', async (): Promise<void> => {
      const event = await es
        .stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
        .getFirstEvent()
      const data: {count?: number} = event.data

      assert.strictEqual(event.name, 'EventTypeOne')
      assert.notEqual(event.data, null)
      assert.strictEqual(data.count, 1)
    })

    it('returns last event of stream', async (): Promise<void> => {
      const event = await es
        .stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
        .getLastEvent()
      const data: {count?: number} = event.data

      assert.strictEqual(event.name, 'EventTypeTwo')
      assert.notEqual(event.data, null)
      assert.strictEqual(data.count, 10)
    })
  })

  describe('Stream metadata', async (): Promise<void> => {
    it('returns null for existing stream with no metadata', async (): Promise<void> => {
      const metadata = await es
        .stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
        .getMetadata()
      assert.strictEqual(metadata, null)
    })

    it('returns null for not existing stream', async (): Promise<void> => {
      const metadata = await es.stream('notexistingstream').getMetadata()
      assert.strictEqual(metadata, null)
    })
  })
})
