import * as assert from 'assert'
import {TCPConnection} from '../../../src/eventstore/TCPConnection'
import {setConnectionSettings} from '../../../src/eventstore/EventstoreSettings'

describe('TCPConnection', (): void => {
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

    public handleMultiPacketResponseData(buffer: Buffer): Buffer | null {
      return super.handleMultiPacketResponseData(buffer)
    }

    public handleNewResponseData(buffer: Buffer): Buffer | null {
      return super.handleNewResponseData(buffer)
    }

    public handleSingleResponseData(buffer: Buffer): void {
      return super.handleSingleResponseData(buffer)
    }
  }

  describe('handleMultiPacketResponseData', (): void => {
    it('returns null when param is null', async (): Promise<void> => {
      const testClass = new TestClass()
      const result = testClass.handleMultiPacketResponseData(null)
      assert.strictEqual(result, null)
    })
  })

  describe('handleNewResponseData', (): void => {
    it('throws on invalid command length', async (): Promise<void> => {
      const testClass = new TestClass()
      let buf = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0])
      try {
        testClass.handleNewResponseData(buf)
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreProtocolError')
      }
    })
  })

  describe('handleSingleResponseData', (): void => {
    it('throws on invalid command length', async (): Promise<void> => {
      const testClass = new TestClass()
      let buf = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0])
      try {
        testClass.handleSingleResponseData(buf)
        assert.fail('has not thrown')
      } catch (err) {
        assert.strictEqual(err.name, 'EventstoreProtocolError')
      }
    })
  })
})
