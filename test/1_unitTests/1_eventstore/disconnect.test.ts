import * as assert from 'assert'
import {TCPConnection} from '../../../src/eventstore/TCPConnection'
import {setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'
import uuid = require('uuid/v4')

describe('disconnect', (): void => {
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
  }

  it('throws on empty port or host', async (): Promise<void> => {
    const testClass = new TestClass()
    const prom = new Promise(
      (resolve, reject): void => {
        testClass.addRequest(uuid(), resolve, reject, Date.now())
      }
    )
    const d = testClass.disconnect()
    try {
      await prom
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreConnectionError')
    }
    await d
  })
})
