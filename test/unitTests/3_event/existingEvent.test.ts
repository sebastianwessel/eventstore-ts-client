import {Event} from '../../../src'
import * as assert from 'assert'
import uuid = require('uuid/v4')
import {uuidToBuffer} from '../../../src/protobuf/uuidBufferConvert'

interface TestEventDataSchema {
  someString: string
  someNumber: number
  someBoolean: boolean
  someObject: {
    moreText: string
    otherNumber: number
    otherBoolean: boolean
  }
}

describe('Existing event instance tests', () => {
  const testData: TestEventDataSchema = {
    someString: 'some text',
    someNumber: 100,
    someBoolean: true,
    someObject: {
      moreText: 'something more',
      otherNumber: 200,
      otherBoolean: false
    }
  }

  const testMetadata = {
    $correlationId: uuid(),
    $causationId: uuid()
  }

  it('returns false on existing event', () => {
    const existingEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    existingEvent.freeze()
    assert.strictEqual(existingEvent.isNew(), false)
  })

  it('throws on changeing name', () => {
    const existingEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    existingEvent.freeze()
    const newName = 'EventRenamed'
    try {
      existingEvent.name = newName
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreOperationError')
    }
  })

  it('throws on changeing eventId', () => {
    const existingEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    existingEvent.freeze()
    const newId = uuid()
    try {
      existingEvent.id = newId
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreOperationError')
    }
  })

  it('throws on changeing eventData', () => {
    const existingEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    existingEvent.freeze()
    const newData = {...testData, ...{someString: 'I was changed'}}
    try {
      existingEvent.data = newData
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreOperationError')
    }
  })

  it('throws on changeing eventMetadata', () => {
    const existingEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    existingEvent.freeze()
    const newMetadata = {somethingNew: uuid()}
    try {
      existingEvent.metadata = newMetadata
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreOperationError')
    }
  })

  it('throws on changeing eventCorrelationId', () => {
    const existingEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    existingEvent.freeze()
    const newCorrelationId = uuid()
    try {
      existingEvent.correlationId = newCorrelationId
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreOperationError')
    }
  })

  it('throws on changeing eventCausationId', () => {
    const existingEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    existingEvent.freeze()
    try {
      existingEvent.causationId = uuid()
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreOperationError')
    }
  })
})

describe('event from raw', () => {
  const rawEventId = uuid()
  const rawEventStreamId = 'stream-' + uuid()
  const rawCorrelationId = uuid()
  const rawCausationId = uuid()
  const rawEventData = {
    someField: 'someValue',
    someNumber: 100
  }
  const rawEventMetadata = {
    $correlationId: rawCorrelationId,
    $causationId: rawCausationId
  }

  const rawEventWithMeta = {
    eventType: 'SomethingWasHappened',
    eventStreamId: rawEventStreamId,
    eventNumber: 1,
    eventId: uuidToBuffer(rawEventId),
    dataContentType: 1,
    metadataContentType: 1,
    data: Buffer.from(JSON.stringify(rawEventData)),
    metadata: Buffer.from(JSON.stringify(rawEventMetadata)),
    objectCreated: Date.now(),
    objectCreatedEpoch: Date.now()
  }

  const rawEventWithoutMeta = {
    eventType: 'SomethingWasHappened',
    eventStreamId: rawEventStreamId,
    eventNumber: 1,
    eventId: uuidToBuffer(rawEventId),
    dataContentType: 1,
    metadataContentType: 1,
    data: Buffer.from(JSON.stringify(rawEventData)),
    metadata: null,
    objectCreated: null,
    objectCreatedEpoch: null
  }

  it('returns event instance with metadata', () => {
    const newEvent = Event.fromRaw(rawEventWithMeta)
    assert.strictEqual(newEvent.name, 'SomethingWasHappened')
    assert.strictEqual(newEvent.streamId, rawEventStreamId)
    assert.strictEqual(newEvent.data.toString(), rawEventData.toString())
    assert.strictEqual(newEvent.metadata.toString(), rawEventMetadata.toString())
    assert.strictEqual(newEvent.correlationId, rawEventMetadata.$correlationId)
    assert.strictEqual(newEvent.causationId, rawEventMetadata.$causationId)
  })

  it('returns event instance without metadata', () => {
    const newEvent = Event.fromRaw(rawEventWithoutMeta)
    assert.strictEqual(newEvent.name, 'SomethingWasHappened')
    assert.strictEqual(newEvent.streamId, rawEventStreamId)
    assert.strictEqual(newEvent.data.toString(), rawEventData.toString())
    assert.strictEqual(newEvent.metadata, null)
    assert.strictEqual(newEvent.correlationId, null)
    assert.strictEqual(newEvent.causationId, null)
  })

  it('sets metadata on setting correlationId', () => {
    const newEvent = new Event('SomethingWasHappened')
    newEvent.correlationId = rawEventMetadata.$correlationId
    const expected = {
      $correlationId: rawEventMetadata.$correlationId
    }
    assert.strictEqual(newEvent.metadata.toString(), expected.toString())
  })

  it('sets metadata on setting causationId', () => {
    const newEvent = new Event('SomethingWasHappened')
    newEvent.causationId = rawEventMetadata.$causationId
    const expected = {
      $causationId: rawEventMetadata.$causationId
    }
    assert.strictEqual(newEvent.metadata.toString(), expected.toString())
  })

  it('deletes correlationId from metadata', () => {
    const newEvent = new Event(
      'SomethingWasHappened',
      {},
      {$correlationId: rawEventMetadata.$correlationId}
    )
    newEvent.correlationId = null
    const expected = {}
    assert.strictEqual(newEvent.metadata.toString(), expected.toString())
  })

  it('deletes causationId from metadata', () => {
    const newEvent = new Event(
      'SomethingWasHappened',
      {},
      {$causationId: rawEventMetadata.$causationId}
    )
    newEvent.causationId = null
    const expected = {}
    assert.strictEqual(newEvent.metadata.toString(), expected.toString())
  })
})
