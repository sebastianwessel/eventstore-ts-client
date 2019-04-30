import * as assert from 'assert'
import {TCPConnection} from '../../../src/eventstore/TCPConnection'
import {setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'

describe('tryToConnect', (): void => {
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
    }

    public async tryToConnect(): Promise<void> {
      await super.tryToConnect()
    }
  }

  it('throws on empty port or host', async (): Promise<void> => {
    const testClass = new TestClass()
    try {
      await testClass.tryToConnect()
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreConnectionError')
    }
    await testClass.disconnect()
  })
})
