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

describe('New event instance tests', (): void => {
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
    $correlationId: uuid()
  }

  it('returns true on new event', (): void => {
    const newEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    assert.strictEqual(newEvent.isNew(), true)
  })

  it('can change name', (): void => {
    const newEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    const newName = 'EventRenamed'
    newEvent.name = newName
    expect(newEvent.name).not.to.be.equal('EventWasHappened')
    expect(newEvent.name).to.be.equal(newName)
  })

  it('can change eventId', (): void => {
    const newEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    const oldId = newEvent.id
    const newId = uuid()
    newEvent.id = newId
    expect(newEvent.id).not.to.be.equal(oldId)
    expect(newEvent.id).to.be.equal(newId)
  })

  it('can change eventData', (): void => {
    const newEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    const newData = {...testData, ...{someString: 'I was changed'}}
    newEvent.data = newData

    expect(JSON.stringify(newEvent.data)).not.to.be.equal(JSON.stringify(testData))
    assert.strictEqual(JSON.stringify(newEvent.data), JSON.stringify(newData))
  })

  it('can change eventMetadata', (): void => {
    const newEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    const newMetadata = {somethingNew: uuid()}
    newEvent.metadata = newMetadata

    expect(JSON.stringify(newEvent.metadata)).not.to.be.equal(JSON.stringify(testMetadata))
    assert.strictEqual(JSON.stringify(newEvent.metadata), JSON.stringify(newMetadata))
  })

  it('can change eventCorrelationId', (): void => {
    const newEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    const newCorrelationId = uuid()
    newEvent.correlationId = newCorrelationId

    if (typeof newEvent.metadata !== 'string') {
      expect(newEvent.metadata.$correlationId).not.to.be.equal(testMetadata.$correlationId)
      expect(newEvent.metadata.$correlationId).to.be.equal(newCorrelationId)
    } else {
      assert.fail('metadata is string instead of object')
    }

    expect(newEvent.correlationId).to.be.equal(newCorrelationId)
    const n = {...testMetadata, ...{$correlationId: newCorrelationId}}
    assert.strictEqual(JSON.stringify(newEvent.metadata), JSON.stringify(n))
  })

  it('returns model.eventstore.proto.NewEvent instance', (): void => {
    const newEvent = new Event('EventWasHappened', {...testData}, {...testMetadata})
    const result = newEvent.toRaw()
    assert.strictEqual(result.constructor.name, 'NewEvent')
  })
})
