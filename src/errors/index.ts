import {EventstoreError} from './EventstoreError'

/**
 * Returns new EventstoreError type of EventstoreConnectionError
 */
function newConnectionError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(message, 'EventstoreConnectionError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreProtocolError
 */
function newProtocolError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(message, 'EventstoreProtocolError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreBadRequestError
 */
function newBadRequestError(
  message: string = 'Bad Request',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(message, 'EventstoreBadRequestError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreNotAuthenticatedError
 */
function newNotAuthenticatedError(
  message: string = 'Not Authenticated',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(message, 'EventstoreNotAuthenticatedError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreNotHandledError
 */
function newNotHandledError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Not handled ${message}`, 'EventstoreNotHandledError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstorePrepareTimeoutError
 */
function newPrepareTimeoutError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(
    `Prepare timeout error ${message}`,
    'EventstorePrepareTimeoutError',
    rootCause
  )
}

/**
 * Returns new EventstoreError type of EventstoreCommitTimeoutError
 */
function newCommitTimeoutError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Commit timeout ${message}`, 'EventstoreCommitTimeoutError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreForwardTimeoutError
 */
function newForwardTimeoutError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(
    `Forward timeout ${message}`,
    'EventstoreForwardTimeoutError',
    rootCause
  )
}

/**
 * Returns new EventstoreError type of EventstoreWrongExpectedVersionError
 */
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

/**
 * Returns new EventstoreError type of EventstoreStreamDeletedError
 */
function newStreamDeletedError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Stream deleted ${message}`, 'EventstoreStreamDeletedError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreInvalidTransactionError
 */
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

/**
 * Returns new EventstoreError type of EventstoreAccessDeniedError
 */
function newAccessDeniedError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Access denied ${message}`, 'EventstoreAccessDeniedError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreNotFoundError
 */
function newNotFoundError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Not found ${message}`, 'EventstoreNotFoundError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreNoStreamError
 */
function newNoStreamError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`No stream ${message}`, 'EventstoreNoStreamError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreNotModifiedError
 */
function newNotModifiedError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Not modified ${message}`, 'EventstoreNotModifiedError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreUnspecificError
 */
function newUnspecificError(message: string = '', rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(
    `Unspecified error: ${message}`,
    'EventstoreUnspecificError',
    rootCause
  )
}

/**
 * Returns new EventstoreError type of EventstoreImplementationError
 */
function newImplementationError(
  message: string = '',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(
    `Implementation error: ${message}`,
    'EventstoreImplementationError',
    rootCause
  )
}

/**
 * Returns new EventstoreError type of EventstoreDoesNotExistError
 */
function newDoesNotExistError(
  message: string = 'Does not exist',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(`${message}`, 'EventstoreDoesNotExistError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreAlreadyExistError
 */
function newAlreadyExistError(
  message: string = 'Already exists',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(`${message}`, 'EventstoreAlreadyExistError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreTimeoutError
 */
function newTimeoutError(message: string = '', rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Timeout error: ${message}`, 'EventstoreTimeoutError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreOperationError
 */
function newOperationError(message: string = '', rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Operation error: ${message}`, 'EventstoreOperationError', rootCause)
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
  newDoesNotExistError,
  newAlreadyExistError,
  newImplementationError,
  newTimeoutError,
  newOperationError
}
