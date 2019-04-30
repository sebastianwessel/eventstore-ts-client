import * as assert from 'assert'
import {TCPConnection} from '../../../src/eventstore/TCPConnection'
import {setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'
import uuid = require('uuid/v4')

describe('sendCommand', (): void => {
  class TestClass extends TCPConnection {
    public constructor() {
      super(
        setConnectionSettings({
          port: 0,
          host: '',
          operationTimeout: 100,
          operationTimeoutCheckPeriod: 100,
          connectTimeout: 1,
          maxQueueSize: 2
        })
      )
      this.state = 2
    }

    public addRequest(uuid: string, resolve: Function, reject: Function, sendTime: number): void {
      this.pendingRequests.set(uuid, {resolve, reject, sendTime})
    }
  }

  it('throws on maximum ', async (): Promise<void> => {
    const testClass = new TestClass()
    new Promise(
      (resolve, reject): void => {
        testClass.addRequest(uuid(), resolve, reject, Date.now())
      }
    )
    new Promise(
      (resolve, reject): void => {
        testClass.addRequest(uuid(), resolve, reject, Date.now())
      }
    )
    try {
      await new Promise(
        (resolve, reject): void => {
          testClass.sendCommand(uuid(), 0x03, Buffer.from(''), null, {resolve, reject})
        }
      )
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreConnectionError')
    }
  })

  it('throws on socket error', async (): Promise<void> => {
    const testClass = new TestClass()
    try {
      await new Promise(
        (resolve, reject): void => {
          testClass.sendCommand(uuid(), 0x03, Buffer.from(''), null, {resolve, reject})
        }
      )
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreConnectionError')
    }
  })
})
