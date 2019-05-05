import * as esError from '../../../src/errors'
import * as assert from 'assert'

describe('Eventstore error class', (): void => {
  it('creates an error instance', (): void => {
    const err = new esError.EventstoreError('some error')
    assert.strictEqual(err.name, 'EventstoreError')
    assert.strictEqual(err.message, 'some error')
  })

  it('can have a causing error instance', (): void => {
    const causedBy = new Error('initial error')
    const err = new esError.EventstoreError('some error', 'NamedError', causedBy)
    assert.strictEqual(err.name, 'NamedError')
    assert.strictEqual(err.message, 'some error')
    assert.strictEqual(JSON.stringify(err.rootCause), JSON.stringify(causedBy))
  })
})

describe('Eventstore error types', (): void => {
  const errorList = Object.keys(esError)
    .map(
      (key): string | null => {
        return key.match(/new(.*Error)/) ? key.slice(3) : null
      }
    )
    .filter((key): boolean => key != null)

  errorList.forEach(
    (errorName): void => {
      it(`creates a ${errorName}`, (): void => {
        const err = esError['new' + errorName]('some error')
        assert.strictEqual(err.name, `Eventstore${errorName}`)
      })

      it(`creates a ${errorName} with causing error reference`, (): void => {
        const causedBy = new Error('initial error')
        const err = esError['new' + errorName]('some error', causedBy)
        assert.strictEqual(err.name, `Eventstore${errorName}`)
      })
    }
  )

  const errorsWithDefaultMsg = [
    'BadRequestError',
    'NotAuthenticatedError',
    'UnspecificError',
    'ImplementationError',
    'DoesNotExistError',
    'AlreadyExistError',
    'TimeoutError',
    'OperationError'
  ]

  errorsWithDefaultMsg.forEach(
    (errorName): void => {
      it(`creates a ${errorName} without specified message`, (): void => {
        const err = esError['new' + errorName]()
        assert.strictEqual(err.name, `Eventstore${errorName}`)
      })
    }
  )
})
