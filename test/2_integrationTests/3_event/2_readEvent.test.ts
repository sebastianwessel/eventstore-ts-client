import {Eventstore, Event} from '../../../src'
import * as assert from 'assert'
import {JSONValue} from '../../../src/JSON'

describe('Read events from stream', (): void => {
  const es = new Eventstore({
    uri: 'discover://restrictedUser:restrictedOnlyUserPassword@cluster1.escluster.net:2112',
    clientId: 'ts-client-test',
    useSSL: true
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

  it('reads a slice forward', async (): Promise<void> => {
    const stream = await es.stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
    const result = await stream.readSliceForward(0, 100, true)
    assert.notStrictEqual(result, undefined)
    assert.notStrictEqual(result, null)
    assert.strictEqual(result.isEndOfStream, true)
    assert.strictEqual(result.events.length, 10)
    for (let x = 0, xMax = result.events.length; x < xMax; x++) {
      const event = Event.fromRaw(result.events[x].event)
      // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
      const data: {[k: string]: JSONValue} = <{count: number}>event.data
      assert.strictEqual(data.count, x + 1)
    }
  })

  it('reads a slice backward', async (): Promise<void> => {
    const stream = await es.stream('teneventsstream-ad44caa8-d701-48f2-ac1e-2ec147ff1df5')
    const result = await stream.readSliceBackward(-1, 100, true)
    assert.notStrictEqual(result, undefined)
    assert.notStrictEqual(result, null)
    assert.strictEqual(result.isEndOfStream, true)
    assert.strictEqual(result.events.length, 10)
    for (let x = result.events.length; x > 0; x--) {
      const event = Event.fromRaw(result.events[x - 1].event)
      // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
      const data: {[k: string]: JSONValue} = <{count: number}>event.data
      assert.strictEqual(data.count, 11 - x)
    }
  })
})
