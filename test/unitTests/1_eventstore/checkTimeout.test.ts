import * as assert from 'assert'
import {TCPConnection} from '../../../src/eventstore/TCPConnection'
import {setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'
import uuid = require('uuid/v4')
import * as sinon from 'sinon'

describe('checkTimeout', (): void => {
  let sandbox

  beforeEach(
    (): void => {
      sandbox = sinon.createSandbox()
    }
  )

  afterEach(
    (): void => {
      sandbox.reset()
    }
  )

  class TestClass extends TCPConnection {
    public constructor() {
      super(
        setConnectionSettings({
          port: 0,
          host: '',
          operationTimeout: 100,
          operationTimeoutCheckPeriod: 100,
          connectTimeout: 1
        })
      )
      this.state = 2
    }

    public addRequest(uuid: string, resolve: Function, reject: Function, sendTime: number): void {
      this.pendingRequests.set(uuid, {resolve, reject, sendTime})
    }

    public checkTimeout(): void {
      super.checkTimeout()
    }
  }

  it('throws timed out promises', async (): Promise<void> => {
    const testClass = new TestClass()
    const prom = new Promise(
      (resolve, reject): void => {
        testClass.addRequest(uuid(), resolve, reject, Date.now() - 5000)
      }
    )
    testClass.checkTimeout()
    try {
      await prom
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreTimeoutError')
    }
  })

  it('logs errors on timeout', async (): Promise<void> => {
    sandbox.stub(TestClass.prototype, 'rejectCommandPromise').throws(new Error())

    const testClass = new TestClass()
    const prom = new Promise(
      (resolve, reject): void => {
        testClass.addRequest(uuid(), resolve, reject, Date.now() - 5000)
      }
    )

    try {
      testClass.checkTimeout()
      assert.ok('does not throw')
    } catch (err) {
      assert.fail(err)
    }
  })
})
