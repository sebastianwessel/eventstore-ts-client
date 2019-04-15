import {uuidToBuffer, uuidFromBuffer} from '../../../src/protobuf/uuidBufferConvert'
import * as assert from 'assert'
import uuid = require('uuid/v4')

describe('uuid to buffer', (): void => {
  const testId = uuid()

  it('converts a uuid to fomated buffer', (): void => {
    const result = uuidToBuffer(testId)
    assert.strictEqual(result.toString(), Buffer.from(testId.replace(/-/g, ''), 'hex').toString())
  })

  it('returns a buffer for id=null', (): void => {
    const result = uuidToBuffer(null)
    assert.strictEqual(result.toString(), Buffer.alloc(16).toString())
  })

  it('throws on uuid size', (): void => {
    try {
      uuidToBuffer('00000000-0000-0000-0000-00000000000')
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreProtocolError')
    }
  })

  it('throws on invalid uuid format', (): void => {
    try {
      uuidToBuffer('000000000000000000000000000000000000')
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreProtocolError')
    }
  })
})

describe('buffer to uuid', (): void => {
  const testId = uuid()
  const testBuffer = Buffer.from(testId.replace(/-/g, ''), 'hex')

  it('converts buffer to uuid', (): void => {
    const result = uuidFromBuffer(testBuffer)
    assert.strictEqual(result, testId)
  })

  it('converts buffer to uuid', (): void => {
    const result = uuidFromBuffer(Buffer.alloc(16))
    assert.strictEqual(result, '')
  })

  it('throws on invalid buffer size', (): void => {
    const invalidBuffer = Buffer.alloc(17, 'hex')
    try {
      uuidFromBuffer(invalidBuffer)
      assert.fail('has not thrown')
    } catch (err) {
      assert.strictEqual(err.name, 'EventstoreProtocolError')
    }
  })
})
