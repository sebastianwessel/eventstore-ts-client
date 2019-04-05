import {expect} from 'chai'
import {Eventstore, Event} from '../../src'
import * as assert from 'assert'

describe('Event emit tests', () => {
  const es = new Eventstore()
  before(async () => {
    await es.connect()
  })

  after(async () => {
    await es.disconnect()
  })

  it('emits a new event', async () => {
    const newEvent = new Event('testevent')
    try {
      const stream = await es.stream('hola')
      await stream.append(newEvent)
    } catch (err) {
      assert.fail(err)
    }
  })
})
