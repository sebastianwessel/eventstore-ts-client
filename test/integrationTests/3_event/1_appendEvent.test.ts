import {expect} from 'chai'
import {Eventstore, Event, ExpectedVersion} from '../../../src'
import * as assert from 'assert'

describe('Event emit tests', (): void => {
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

  it('appends single new event', async (): Promise<void> => {
    const eventData = {some: 'fancy', data: 1}
    const newEvent = new Event('SingleEventWritten', eventData)
    const stream = await es.stream('testemitstream')
    try {
      await stream.append(newEvent)
      expect(newEvent.isNew()).to.be.false
      const confirm = await stream.getFirstEvent()
      expect(JSON.stringify(confirm.data)).to.be.equal(JSON.stringify(eventData))
    } catch (err) {
      assert.fail(err)
    }
  })

  it('appends single new event with require master', async (): Promise<void> => {
    const newEvent = new Event('SingleEventWritten')
    const stream = await es.stream('testemitstreamMaster')
    try {
      await stream.append(newEvent, ExpectedVersion.Any, true)
      expect(newEvent.isNew()).to.be.false
    } catch (err) {
      assert.fail(err)
    }
  })

  it('appends single new event with require master', async (): Promise<void> => {
    const newEvent = new Event('SingleEventWritten')
    const stream = await es.stream('testemitstreamMaster')
    try {
      await stream.requiresMaster().append(newEvent, ExpectedVersion.Any, true)
      expect(newEvent.isNew()).to.be.false
    } catch (err) {
      assert.fail(err)
    }
  })

  it('appends single new event without require master', async (): Promise<void> => {
    const newEvent = new Event('SingleEventWritten')
    const stream = await es.stream('testemitstreamMaster')
    try {
      await stream.append(newEvent, ExpectedVersion.Any, false)
      expect(newEvent.isNew()).to.be.false
    } catch (err) {
      assert.fail(err)
    }
  })

  it('appends multiple new event', async (): Promise<void> => {
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
