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

describe('Event class base tests', () => {
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

  it('creates a event instance', () => {
    const newEvent = new Event('EventWasHappened')
    assert.strictEqual(JSON.stringify(newEvent.data), JSON.stringify({}))
    expect(newEvent.data).to.be.exist
    expect(newEvent.metadata).to.be.null
    expect(newEvent.id).to.be.exist
  })

  it('creates a event instance with eventData', () => {
    const newEvent = new Event('EventWasHappened', testData)
    expect(newEvent.data).to.be.exist
    assert.strictEqual(newEvent.data, testData)
    expect(newEvent.metadata).to.be.null
    expect(newEvent.id).to.be.exist
  })

  it('creates a event instance with eventData and metadata', () => {
    const newEvent = new Event('EventWasHappened', testData, testMetadata)
    expect(newEvent.data).to.be.exist
    assert.strictEqual(newEvent.data, testData)
    expect(newEvent.metadata).to.be.exist
    assert.strictEqual(newEvent.metadata, testMetadata)
    expect(newEvent.id).to.be.exist
    assert.strictEqual(newEvent.correlationId, testMetadata.$correlationId)
    assert.strictEqual(newEvent.causationId, testMetadata.$causationId)
  })
})
