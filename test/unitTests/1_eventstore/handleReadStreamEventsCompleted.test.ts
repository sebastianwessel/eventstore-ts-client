/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {TCPConnection} from '../../../src/eventstore/TCPConnection'
import * as assert from 'assert'
import {EventstoreSettings, setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'
import * as model from '../../../src/protobuf/model'

describe('handleReadStreamEventsCompleted', (): void => {
  const protobuf = model.eventstore.proto

  class TestTCP extends TCPConnection {
    public constructor(connectionConfiguration: EventstoreSettings) {
      super(connectionConfiguration)
    }

    public rejectCommandPromise(id: string, err): void {
      throw err
    }

    public test(id: string, b: Buffer): void {
      this.handleReadStreamEventsCompleted(id, b)
    }
  }

  it('handles ReadStreamResult.NoStream', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    const testBuffer = Buffer.from(
      protobuf.ReadStreamEventsCompleted.encode({
        events: null,
        nextEventNumber: 0,
        lastEventNumber: 0,
        isEndOfStream: true,
        lastCommitPosition: 0,
        result: protobuf.ReadStreamEventsCompleted.ReadStreamResult.NoStream
      }).finish()
    )

    try {
      testClass.test('id', testBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreNoStreamError')
    }
  })

  it('handles ReadStreamResult.NotModified', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    const testBuffer = Buffer.from(
      protobuf.ReadStreamEventsCompleted.encode({
        events: null,
        nextEventNumber: 0,
        lastEventNumber: 0,
        isEndOfStream: true,
        lastCommitPosition: 0,
        result: protobuf.ReadStreamEventsCompleted.ReadStreamResult.NotModified
      }).finish()
    )

    try {
      testClass.test('id', testBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreNotModifiedError')
    }
  })

  it('handles ReadStreamResult.StreamDeleted', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    const testBuffer = Buffer.from(
      protobuf.ReadStreamEventsCompleted.encode({
        events: null,
        nextEventNumber: 0,
        lastEventNumber: 0,
        isEndOfStream: true,
        lastCommitPosition: 0,
        result: protobuf.ReadStreamEventsCompleted.ReadStreamResult.StreamDeleted
      }).finish()
    )

    try {
      testClass.test('id', testBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreStreamDeletedError')
    }
  })

  it('handles ReadStreamResult.AccessDenied', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    const testBuffer = Buffer.from(
      protobuf.ReadStreamEventsCompleted.encode({
        events: null,
        nextEventNumber: 0,
        lastEventNumber: 0,
        isEndOfStream: true,
        lastCommitPosition: 0,
        result: protobuf.ReadStreamEventsCompleted.ReadStreamResult.AccessDenied
      }).finish()
    )

    try {
      testClass.test('id', testBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
    }
  })
})
