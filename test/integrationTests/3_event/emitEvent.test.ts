import {expect} from 'chai'
import {Eventstore, Event} from '../../../src'
import * as assert from 'assert'

describe('Event emit tests', (): void => {
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

  it('emits single new event', async (): Promise<void> => {
    const newEvent = new Event('SingleEventWritten')
    const stream = await es.stream('testemitstream')
    try {
      await stream.append(newEvent)
      expect(newEvent.isNew()).to.be.false
    } catch (err) {
      assert.fail(err)
    }
  })

  it('emits multiple new event', async (): Promise<void> => {
    const newEvents = [
      new Event('FirstEventWritten'),
      new Event('NextEventWritten'),
      new Event('LastEventWritten')
    ]
    const stream = await es.stream('testemitstream')
    try {
      await stream.append(newEvents)
      expect(newEvents[0].isNew()).to.be.false
      expect(newEvents[1].isNew()).to.be.false
      expect(newEvents[2].isNew()).to.be.false
    } catch (err) {
      assert.fail(err)
    }
  })

  it('throws when emitting events already stored in eventstore', async (): Promise<void> => {
    const newEvents = [
      new Event('FirstEventWritten'),
      new Event('NextEventWritten'),
      new Event('LastEventWritten')
    ]
    const stream = await es.stream('testemitstream')
    try {
      await stream.append(newEvents)
      expect(newEvents[0].isNew()).to.be.false
      expect(newEvents[1].isNew()).to.be.false
      expect(newEvents[2].isNew()).to.be.false
    } catch (err) {
      assert.fail(err)
    }
    try {
      await stream.append(newEvents)
      assert.fail('has not thrown')
    } catch (err) {
      assert.ok(err)
      expect(err.name).to.be.equal('EventstoreOperationError')
    }
  })
})
