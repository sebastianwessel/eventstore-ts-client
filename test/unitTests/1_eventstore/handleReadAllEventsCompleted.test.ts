/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {TCPConnection} from '../../../src/eventstore/TCPConnection'
import * as assert from 'assert'
import {EventstoreSettings, setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'
import * as model from '../../../src/protobuf/model'

describe('handleReadAllEventsCompleted', (): void => {
  const protobuf = model.eventstore.proto

  class TestTCP extends TCPConnection {
    public constructor(connectionConfiguration: EventstoreSettings) {
      super(connectionConfiguration)
    }

    public rejectCommandPromise(id: string, err): void {
      throw err
    }

    public test(id: string, b: Buffer): void {
      this.handleReadAllEventsCompleted(id, b)
    }
  }

  it('handles ReadEventResult.AccessDenied', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    const testBuffer = Buffer.from(
      protobuf.ReadAllEventsCompleted.encode({
        commitPosition: 0,
        preparePosition: 0,
        events: [],
        nextCommitPosition: 0,
        nextPreparePosition: 0,
        result: protobuf.ReadAllEventsCompleted.ReadAllResult.AccessDenied
      }).finish()
    )

    try {
      testClass.test('id', testBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
    }
  })

  it('handles ReadEventResult.NotModified', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    const testBuffer = Buffer.from(
      protobuf.ReadAllEventsCompleted.encode({
        commitPosition: 0,
        preparePosition: 0,
        events: [],
        nextCommitPosition: 0,
        nextPreparePosition: 0,
        result: protobuf.ReadAllEventsCompleted.ReadAllResult.NotModified
      }).finish()
    )

    try {
      testClass.test('id', testBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreNotModifiedError')
    }
  })

  it('handles ReadEventResult.UnspecificError', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    const testBuffer = Buffer.from(
      protobuf.ReadAllEventsCompleted.encode({
        commitPosition: 0,
        preparePosition: 0,
        events: [],
        nextCommitPosition: 0,
        nextPreparePosition: 0,
        result: protobuf.ReadAllEventsCompleted.ReadAllResult.Error,
        error: 'some error'
      }).finish()
    )

    try {
      testClass.test('id', testBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreUnspecificError')
    }
  })
})
