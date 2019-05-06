/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {TCPConnection} from '../../../src/eventstore/TCPConnection'
import * as assert from 'assert'
import {EventstoreSettings, setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'
import * as model from '../../../src/protobuf/model'

describe('checkOperationResult', (): void => {
  const protobuf = model.eventstore.proto

  class TestTCP extends TCPConnection {
    public constructor(connectionConfiguration: EventstoreSettings) {
      super(connectionConfiguration)
    }

    public rejectCommandPromise(id: string, err): void {
      throw err
    }

    public test(correlationId: string, result: number, message: string = ''): void {
      this.checkOperationResult(correlationId, result, message)
    }
  }

  it('handles OperationResult.AccessDenied', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    try {
      testClass.test('id', protobuf.OperationResult.AccessDenied)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreAccessDeniedError')
    }
  })

  it('handles OperationResult.CommitTimeout', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    try {
      testClass.test('id', protobuf.OperationResult.CommitTimeout)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreCommitTimeoutError')
    }
  })

  it('handles OperationResult.ForwardTimeout', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    try {
      testClass.test('id', protobuf.OperationResult.ForwardTimeout)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreForwardTimeoutError')
    }
  })

  it('handles OperationResult.InvalidTransaction', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    try {
      testClass.test('id', protobuf.OperationResult.InvalidTransaction)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreInvalidTransactionError')
    }
  })

  it('handles OperationResult.PrepareTimeout', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    try {
      testClass.test('id', protobuf.OperationResult.PrepareTimeout)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstorePrepareTimeoutError')
    }
  })

  it('handles OperationResult.StreamDeleted', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    try {
      testClass.test('id', protobuf.OperationResult.StreamDeleted)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreStreamDeletedError')
    }
  })

  it('handles OperationResult.WrongExpectedVersion', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    try {
      testClass.test('id', protobuf.OperationResult.WrongExpectedVersion)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreWrongExpectedVersionError')
    }
  })

  it('handles OperationResult.Unspecific', (): void => {
    const testClass = new TestTCP(setConnectionSettings({}))

    try {
      testClass.test('id', 10)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreUnspecificError')
    }
  })
})
