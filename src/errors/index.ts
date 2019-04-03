import {EventstoreError} from './EventstoreError'

function newConnectionError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(message, 'EventstoreConnectionError', rootCause)
}

function newProtocolError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(message, 'EventstoreProtocolError', rootCause)
}

function newBadRequestError(
  message: string = 'Bad Request',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(message, 'EventstoreBadRequestError', rootCause)
}

function newNotAuthenticatedError(
  message: string = 'Not Authenticated',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(message, 'EventstoreNotAuthenticatedError', rootCause)
}

function newNotHandledError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Not handled ${message}`, 'EventstoreNotHandledError', rootCause)
}

function newPrepareTimeoutError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(
    `Prepare timeout error ${message}`,
    'EventstorePrepareTimeoutError',
    rootCause
  )
}

function newCommitTimeoutError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Commit timeout ${message}`, 'EventstoreCommitTimeoutError', rootCause)
}

function newForwardTimeoutError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(
    `Forward timeout ${message}`,
    'EventstoreForwardTimeoutError',
    rootCause
  )
}

function newWrongExpectedVersionError(
  message: string,
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(
    `Wrong expected version ${message}`,
    'EventstoreWrongExpectedVersionError',
    rootCause
  )
}

function newStreamDeletedError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Stream deleted ${message}`, 'EventstoreStreamDeletedError', rootCause)
}

function newInvalidTransactionError(
  message: string,
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(
    `Invalid transaction ${message}`,
    'EventstoreInvalidTransactionError',
    rootCause
  )
}

function newAccessDeniedError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Access denied ${message}`, 'EventstoreAccessDeniedError', rootCause)
}

function newNotFoundError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Not found ${message}`, 'EventstoreNotFoundError', rootCause)
}

function newNoStreamError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`No stream ${message}`, 'EventstoreNoStreamError', rootCause)
}

function newNotModifiedError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Not modified ${message}`, 'EventstoreNotModifiedError', rootCause)
}

function newUnspecificError(message: string = '', rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(
    `Unspecified error: ${message}`,
    'EventstoreUnspecificError',
    rootCause
  )
}

function newDoesNotExistError(
  message: string = '',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(`Does not exist: ${message}`, 'EventstoreoesNotExistError', rootCause)
}

export {
  EventstoreError,
  newConnectionError,
  newProtocolError,
  newBadRequestError,
  newNotAuthenticatedError,
  newNotHandledError,
  newPrepareTimeoutError,
  newCommitTimeoutError,
  newForwardTimeoutError,
  newWrongExpectedVersionError,
  newStreamDeletedError,
  newInvalidTransactionError,
  newAccessDeniedError,
  newNotFoundError,
  newNoStreamError,
  newNotModifiedError,
  newUnspecificError,
  newDoesNotExistError
}
