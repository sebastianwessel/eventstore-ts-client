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

  it('returns a event by given eventNumber', async (): Promise<void> => {
    const event = await es
      .stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
      .getEventByNumber(0, true)
    const data: {count?: number} = event.data

    assert.strictEqual(event.name, 'EventTypeOne')
    assert.notEqual(event.data, null)
    assert.strictEqual(data.count, 1)
  })
})
