import {EventstoreError} from './EventstoreError'

/**
 * Returns new EventstoreError type of EventstoreConnectionError
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newConnectionError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(message, 'EventstoreConnectionError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreProtocolError
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newProtocolError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(message, 'EventstoreProtocolError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreBadRequestError
 *
 * @param {string} [message='Bad Request']
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newBadRequestError(
  message: string = 'Bad Request',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(message, 'EventstoreBadRequestError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreNotAuthenticatedError
 *
 * @param {string} [message='Not Authenticated']
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newNotAuthenticatedError(
  message: string = 'Not Authenticated',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(message, 'EventstoreNotAuthenticatedError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreNotHandledError
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newNotHandledError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Not handled ${message}`, 'EventstoreNotHandledError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstorePrepareTimeoutError
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
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
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newCommitTimeoutError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Commit timeout ${message}`, 'EventstoreCommitTimeoutError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreForwardTimeoutError
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
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
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
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
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newStreamDeletedError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Stream deleted ${message}`, 'EventstoreStreamDeletedError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreInvalidTransactionError
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
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
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newAccessDeniedError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Access denied ${message}`, 'EventstoreAccessDeniedError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreNotFoundError
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newNotFoundError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Not found ${message}`, 'EventstoreNotFoundError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreNoStreamError
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newNoStreamError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`No stream ${message}`, 'EventstoreNoStreamError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreNotModifiedError
 *
 * @param {string} message
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newNotModifiedError(message: string, rootCause: Error | null = null): EventstoreError {
  return new EventstoreError(`Not modified ${message}`, 'EventstoreNotModifiedError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreUnspecificError
 *
 * @param {string} [message='']
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
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
 *
 * @param {string} [message='']
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
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
 *
 * @param {string} [message='']
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newDoesNotExistError(
  message: string = '',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(`Does not exist: ${message}`, 'EventstoreDoesNotExistError', rootCause)
}

/**
 * Returns new EventstoreError type of EventstoreTimeoutError
 *
 * @param {string} [message='']
 * @param {(Error | null)} [rootCause=null]
 * @returns {EventstoreError}
 */
function newEventstoreTimeoutError(
  message: string = '',
  rootCause: Error | null = null
): EventstoreError {
  return new EventstoreError(`Timeout error: ${message}`, 'EventstoreTimeoutError', rootCause)
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
  newImplementationError,
  newEventstoreTimeoutError
}
