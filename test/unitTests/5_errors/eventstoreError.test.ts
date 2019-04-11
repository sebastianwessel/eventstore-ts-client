import * as esError from '../../../src/errors'
import * as assert from 'assert'

describe('Eventstore error class', (): void => {
  it('creates an error instance', (): void => {
    const err = new esError.EventstoreError('some error')
    assert.strictEqual(err.name, 'EventstoreError')
    assert.strictEqual(err.message, 'some error')
  })

  it('can have a causing error instance', (): void => {
    const causedby = new Error('initial error')
    const err = new esError.EventstoreError('some error', 'NamedError', causedby)
    assert.strictEqual(err.name, 'NamedError')
    assert.strictEqual(err.message, 'some error')
    assert.strictEqual(JSON.stringify(err.rootCause), JSON.stringify(causedby))
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
        const causedby = new Error('initial error')
        const err = esError['new' + errorName]('some error', causedby)
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
    'TimeoutError',
    'OperationError'
  ]

  errorsWithDefaultMsg.forEach(
    (errorName): void => {
      it(`creates a ${errorName} without specifyed message`, (): void => {
        const err = esError['new' + errorName]()
        assert.strictEqual(err.name, `Eventstore${errorName}`)
      })
    }
  )
})
