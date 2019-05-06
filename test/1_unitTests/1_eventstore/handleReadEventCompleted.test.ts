/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {TCPConnection} from '../../../src/eventstore/TCPConnection'
import * as assert from 'assert'
import {EventstoreSettings, setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'
import * as model from '../../../src/protobuf/model'

describe('handleReadEventCompleted', (): void => {
  const protobuf = model.eventstore.proto

  class TestTCP extends TCPConnection {
    public constructor(connectionConfiguration: EventstoreSettings) {
      super(connectionConfiguration)
    }

    public rejectCommandPromise(id: string, err): void {
      throw err
    }

    public test(id: string, b: Buffer): void {
      this.handleReadEventCompleted(id, b)
    }
  }

  it('handles ReadEventResult.NotFound', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    const testBuffer = Buffer.from(
      protobuf.ReadEventCompleted.encode({
        event: protobuf.ResolvedEvent.fromObject({
          event: null,
          link: null,
          commitPosition: 0,
          preparePosition: 0
        }),
        result: protobuf.ReadEventCompleted.ReadEventResult.NotFound
      }).finish()
    )

    try {
      testClass.test('id', testBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreNotFoundError')
    }
  })

  it('handles ReadEventResult.NoStream', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    const testBuffer = Buffer.from(
      protobuf.ReadEventCompleted.encode({
        event: protobuf.ResolvedEvent.fromObject({
          event: null,
          link: null,
          commitPosition: 0,
          preparePosition: 0
        }),
        result: protobuf.ReadEventCompleted.ReadEventResult.NoStream
      }).finish()
    )

    try {
      testClass.test('id', testBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreNoStreamError')
    }
  })

  it('handles ReadEventResult.StreamDeleted', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    const testBuffer = Buffer.from(
      protobuf.ReadEventCompleted.encode({
        event: protobuf.ResolvedEvent.fromObject({
          event: null,
          link: null,
          commitPosition: 0,
          preparePosition: 0
        }),
        result: protobuf.ReadEventCompleted.ReadEventResult.StreamDeleted
      }).finish()
    )

    try {
      testClass.test('id', testBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreStreamDeletedError')
    }
  })
})
