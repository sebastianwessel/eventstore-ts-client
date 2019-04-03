import * as eventstoreError from '../errors'

/**
 * Converts a uuid as string from buffer
 * It returns an empty string for uuid set to null or throws {EventstoreProtocolError} for invalid buffer length
 *
 * @export
 * @param {Buffer} buffer
 * @returns {string}
 * @throws {EventstoreProtocolError}
 */
export function uuidFromBuffer(buffer: Buffer): string {
  if (buffer.length !== 16) {
    throw eventstoreError.newProtocolError(`Invalid buffer length for uuid: ${buffer.length}`)
  }

  if (buffer.equals(Buffer.alloc(16))) {
    return ''
  }

  const str = buffer.toString('hex')
  return `${str.slice(0, 8)}-${str.slice(8, 12)}-${str.slice(12, 16)}-${str.slice(
    16,
    20
  )}-${str.slice(20)}`
}

/**
 * Converts a uuid string to buffer representattion
 * throws {EventstoreProtocolError} for invalid input string length
 *
 * @export
 * @param {(string | null)} uuid
 * @returns {Buffer}
 * @throws {EventstoreProtocolError}
 */
export function uuidToBuffer(uuid: string | null): Buffer {
  if (!uuid) {
    return Buffer.alloc(16)
  }
  const hexStr = uuid.replace(/-/g, '')
  if (uuid.length !== 36 || hexStr.length !== 32) {
    throw eventstoreError.newProtocolError(`Invalid UUID string: ${uuid}`)
  }
  return Buffer.from(hexStr, 'hex')
}
