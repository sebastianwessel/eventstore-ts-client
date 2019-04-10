import * as esError from '../../../src/errors'
import * as assert from 'assert'

describe('Eventstore error class', () => {
  it('creates an error instance', () => {
    const err = new esError.EventstoreError('some error')
    assert.strictEqual(err.name, 'EventstoreError')
    assert.strictEqual(err.message, 'some error')
  })

  it('can have a causing error instance', () => {
    const causedby = new Error('initial error')
    const err = new esError.EventstoreError('some error', 'NamedError', causedby)
    assert.strictEqual(err.name, 'NamedError')
    assert.strictEqual(err.message, 'some error')
    assert.strictEqual(JSON.stringify(err.rootCause), JSON.stringify(causedby))
  })
})

describe('Eventstore error types', () => {
  const errorList = Object.keys(esError)
    .map((key) => {
      return key.match(/new(.*Error)/) ? key.slice(3) : null
    })
    .filter((key) => key != null)

  errorList.forEach((errorName) => {
    it(`creates a ${errorName}`, () => {
      const err = esError['new' + errorName]('some error')
      assert.strictEqual(err.name, `Eventstore${errorName}`)
    })

    it(`creates a ${errorName} with causing error reference`, () => {
      const causedby = new Error('initial error')
      const err = esError['new' + errorName]('some error', causedby)
      assert.strictEqual(err.name, `Eventstore${errorName}`)
    })
  })

  const errorsWithDefaultMsg = [
    'BadRequestError',
    'NotAuthenticatedError',
    'UnspecificError',
    'ImplementationError',
    'DoesNotExistError',
    'TimeoutError',
    'OperationError'
  ]

  errorsWithDefaultMsg.forEach((errorName) => {
    it(`creates a ${errorName} without specifyed message`, () => {
      const err = esError['new' + errorName]()
      assert.strictEqual(err.name, `Eventstore${errorName}`)
    })
  })
})
