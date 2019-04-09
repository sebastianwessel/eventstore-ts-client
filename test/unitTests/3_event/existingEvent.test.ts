import {expect} from 'chai'
import {Event} from '../../../src'
import * as assert from 'assert'
import uuid = require('uuid/v4')

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
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreOperationError')
    }
  })

  it('throws on changeing eventCausationId', () => {
    const existingEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    existingEvent.freeze()
    try {
      existingEvent.causationId = uuid()
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreOperationError')
    }
  })
})
