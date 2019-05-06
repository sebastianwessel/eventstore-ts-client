import {EventstoreSettings} from './EventstoreSettings'
import * as net from 'net'
import * as tls from 'tls'
import * as bunyan from 'bunyan'
import {EventEmitter} from 'events'
import {uuidToBuffer, uuidFromBuffer} from '../protobuf/uuidBufferConvert'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import * as eventstoreError from '../errors'
import {EventstoreError} from '../errors'
import * as model from '../protobuf/model'
import {
  Subscription,
  PersistentSubscription,
  SubscriptionDropReason,
  SubscriptionStatus
} from '../subscription'
import {Stream} from '../stream'
import {UserCredentials} from '../eventstore/EventstoreSettings'
import uuid = require('uuid/v4')
import {Event} from '../event'
import {getIpAndPort} from './getConnectInfo'
import {Position} from './Position'
import {WriteResult} from './Eventstore'
import Long from 'long'

/** protobuf shorthand */
const protobuf = model.eventstore.proto

/** typescript enumeration of connection states */
enum connectionState {
  closed,
  init,
  connected,
  drain
}

/** raw tcp communication constant */
const FLAGS_NONE = 0x00
/** raw tcp communication constant */
const FLAGS_AUTH = 0x01
/** raw tcp communication constant */
const UINT32_LENGTH = 4
/** raw tcp communication constant */
const GUID_LENGTH = 16
/** raw tcp communication constant */
const HEADER_LENGTH = 1 + 1 + GUID_LENGTH // Cmd + Flags + CorrelationId
/** raw tcp communication constant */
const COMMAND_OFFSET = UINT32_LENGTH
/** raw tcp communication constant */
const FLAGS_OFFSET = COMMAND_OFFSET + 1
/** raw tcp communication constant */
const CORRELATION_ID_OFFSET = FLAGS_OFFSET + 1
/** raw tcp communication constant */
const DATA_OFFSET = CORRELATION_ID_OFFSET + GUID_LENGTH // Length + Cmd + Flags + CorrelationId

/**
 * Raw tcp communication to eventstore
 * This class handles basic communication with eventstore
 */
export class TCPConnection extends EventEmitter {
  /** initial config */
  protected initialConfig: EventstoreSettings
  /** config after discovery process */
  protected connectionConfig: EventstoreSettings
  /** tcp socket  */
  protected socket: net.Socket | tls.TLSSocket
  /** connection id  */
  protected connectionId: string | null = null
  /** list of pending requests */
  protected pendingRequests: Map<
    string,
    {resolve: Function; reject: Function; sendTime: number}
  > = new Map()
  /** timeout interval for timed out pending requests */
  protected timeoutInterval: null | NodeJS.Timeout = null
  /** logger instance */
  public log: bunyan
  /** connection state */
  protected state: connectionState = connectionState.closed
  /** message offset of tcp data */
  protected messageCurrentOffset: number = 0
  /** message length of tcp data */
  protected messageCurrentLength: number = 0
  /** message buffer of tcp data */
  protected messageData: Buffer | null = null
  /** list of subscriptions */
  protected subscriptionList: Map<string, Subscription> = new Map()
  /** list of persistent subscriptions */
  protected persistentSubscriptionList: Map<string, PersistentSubscription> = new Map()
  /** indicates if connection close is wanted by user or not */
  protected isUnexpectedClosed: boolean = true
  /** counter for re-connections */
  protected reconnectCount: number = 0

  /**
   *Creates an instance of TCPConnection.
   */
  public constructor(connectionConfiguration: EventstoreSettings) {
    super()
    this.initialConfig = {...connectionConfiguration}
    this.connectionConfig = connectionConfiguration
    this.log = this.connectionConfig.logger.child
      ? this.connectionConfig.logger.child({module: 'TCPConnection'})
      : this.connectionConfig.logger

    this.socket = new net.Socket()
  }

  /**
   * Returns true if connected to eventstore otherwise false
   */
  public get isConnected(): boolean {
    return this.state === connectionState.connected
  }

  /**
   * Called to connect to eventstore
   */
  public async connect(): Promise<void> {
    let connected = false
    while (!connected && this.reconnectCount < this.initialConfig.maxReconnections) {
      this.state = connectionState.init
      this.connectionConfig = await getIpAndPort({...this.initialConfig}, this.log)

      try {
        await this.tryToConnect()
        connected = true
      } catch (err) {
        this.log.error({err, count: this.reconnectCount, fn: 'connect'}, 'Try to connect failed ')
        this.reconnectCount++
        this.emit('reconnect', this.reconnectCount)
        await new Promise(
          (resolve): void => {
            setTimeout(resolve, this.initialConfig.reconnectionDelay)
          }
        )
      }
    }
  }

  /**
   * Connect to eventstore
   */
  protected async tryToConnect(): Promise<void> {
    const port = this.connectionConfig.port
    const host = this.connectionConfig.host

    if (port === 0 || host === '') {
      throw eventstoreError.newConnectionError('Invalid connection settings on host and port')
    }

    this.log.debug(`Start connecting to ${host}:${port}`)

    await new Promise(
      (resolve, reject): void => {
        const errorListener = (err: Error | EventstoreError): void => {
          this.state = connectionState.closed
          if (err instanceof Error) {
            this.onError(eventstoreError.newConnectionError(err.message, err))
          } else {
            this.onError(err)
          }

          reject(err)
        }

        const successListener = (): void => {
          if (this.socket instanceof tls.TLSSocket) {
            if (!this.socket.authorized) {
              this.log.warn({err: this.socket.authorizationError}, 'SSL authorization warning')
            }
          }
          this.socket.removeListener('error', errorListener)
          this.socket.on('error', this.onError.bind(this))
          this.onConnect()
          resolve()
        }

        if (this.connectionConfig.useSSL) {
          let secureContext
          if (this.connectionConfig.secureContext) {
            try {
              secureContext = tls.createSecureContext(this.connectionConfig.secureContext)
            } catch (err) {
              const conErr = eventstoreError.newConnectionError(
                'Error creating secure context',
                err
              )
              reject(conErr)
            }
          }

          const options = {
            port,
            host,
            servername: host,
            requestCert: this.connectionConfig.validateServer,
            rejectUnauthorized: this.connectionConfig.validateServer,
            timeout: this.connectionConfig.connectTimeout,
            secureContext
          }

          this.socket = tls.connect(options, successListener)
        } else {
          const options = {
            port,
            host,
            servername: host,
            timeout: this.connectionConfig.connectTimeout
          }
          this.socket = net.connect(options, successListener)
        }

        this.socket.once('error', errorListener.bind(this))
        this.socket.on('close', this.onClose.bind(this))
        this.socket.on('data', this.onData.bind(this))
        this.socket.on('secureConnect', this.onSecureConnect.bind(this))
      }
    )
  }

  /**
   * Disconnect from eventstore.
   * It tries to drain pending queue to prevent data loose before connection gets closed
   * If disconnect() is call no new outgoing requests accepted
   */
  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return
    }
    this.isUnexpectedClosed = false
    await new Promise(
      (resolve): void => {
        this.onDrain()
        if (this.pendingRequests.size <= 0) {
          this.state = connectionState.closed
          this.socket.destroy()
          resolve()
        } else {
          this.log.debug(
            {
              pendingRequests: this.pendingRequests.size,
              timeout:
                this.initialConfig.operationTimeout + this.initialConfig.operationTimeoutCheckPeriod
            },
            'Wait for pending requests'
          )
          // wait for pending requests/timeouts
          setTimeout((): void => {
            this.state = connectionState.closed
            this.socket.destroy()
            this.log.debug('Timeout finished')
            this.pendingRequests.forEach(
              (value, id): void => {
                this.rejectCommandPromise(
                  id,
                  eventstoreError.newConnectionError('Connection closed')
                )
              }
            )
            resolve()
          }, this.initialConfig.operationTimeout + this.initialConfig.operationTimeoutCheckPeriod)
        }
      }
    )
  }

  /**
   * Called by interval function to check if there are some pending requests which should be rejected with time out error
   */
  protected checkTimeout(): void {
    this.log.trace('Check timeout queue')
    const timeout: string[] = []
    const now = Date.now() - this.initialConfig.operationTimeout
    for (var [key, value] of this.pendingRequests) {
      if (value.sendTime < now) {
        timeout.push(key)
      }
    }
    for (let x = 0, xMax = timeout.length; x < xMax; x++) {
      try {
        this.rejectCommandPromise(
          timeout[x],
          eventstoreError.newTimeoutError('Timeout by eventstore-ts-client')
        )
      } catch (err) {
        this.log.error({err, fn: 'checkTimeout'}, 'Error on rejectCommandPromise')
      }
    }
  }

  /**
   * Creates and sends raw data message to eventstore and adds given promise to pending queue
   */
  public sendCommand(
    correlationId: string,
    command: EventstoreCommand,
    data: Buffer | null = null,
    credentials: UserCredentials | null = null,
    promise: {resolve: Function; reject: Function} | null = null
  ): void {
    this.log.trace(`Sending ${EventstoreCommand[command]} with ${correlationId}`)
    if (
      this.state !== connectionState.connected &&
      command !== EventstoreCommand.HeartbeatResponseCommand &&
      command !== EventstoreCommand.Pong
    ) {
      throw eventstoreError.newConnectionError(
        'Connection to eventstore is: ' + connectionState[this.state]
      )
    }

    if (promise) {
      if (this.pendingRequests.size >= this.connectionConfig.maxQueueSize) {
        promise.reject(eventstoreError.newConnectionError('Maximum concurrent items reached'))
        throw eventstoreError.newConnectionError('Maximum concurrent items reached')
      }
      this.pendingRequests.set(correlationId, {...promise, sendTime: Date.now()})
    }

    try {
      let authLength = 0
      let flags = FLAGS_NONE
      if (credentials) {
        flags = FLAGS_AUTH
        authLength = 1 + credentials.username.length + 1 + credentials.password.length
      }

      let commandLength = HEADER_LENGTH + authLength
      if (data) {
        commandLength += data.length
      }
      const packetLength = 4 + commandLength

      const buf = Buffer.alloc(packetLength)
      buf.writeUInt32LE(commandLength, 0)
      buf[COMMAND_OFFSET] = command
      buf[FLAGS_OFFSET] = flags

      uuidToBuffer(correlationId).copy(buf, CORRELATION_ID_OFFSET, 0, GUID_LENGTH)
      if (credentials) {
        buf.writeUInt8(credentials.username.length, DATA_OFFSET)
        buf.write(credentials.username, DATA_OFFSET + 1)
        buf.writeUInt8(credentials.password.length, DATA_OFFSET + 1 + credentials.username.length)
        buf.write(credentials.password, DATA_OFFSET + 1 + credentials.username.length + 1)
      }

      if (data) {
        data.copy(buf, DATA_OFFSET + authLength, 0, data.length)
      }

      this.socket.write(buf)
    } catch (err) {
      const newErr = eventstoreError.newConnectionError(err.message, err)
      this.rejectCommandPromise(correlationId, newErr)
      this.onError(newErr)
    }
  }

  /**
   * Gets called as soon as new data over tcp connection arrives as raw buffer data
   * Checks if
   * - new received data is part of previously received data
   * - new data contains multiple responses
   * - new data is single response
   */
  protected handleNewResponseData(data: Buffer): Buffer | null {
    const commandLength = data.readUInt32LE(0)
    if (commandLength < HEADER_LENGTH) {
      this.log.error(
        {
          connectionId: this.connectionId,
          fn: 'handleNewResponseData'
        },
        'Invalid command length of ' + commandLength + ' bytes'
      )
      throw eventstoreError.newProtocolError('Invalid command length')
    }

    const messageLength = UINT32_LENGTH + commandLength
    if (data.length === messageLength) {
      // A single packet message, no need to copy into another buffer
      this.handleSingleResponseData(data)
      return null
    } else if (data.length > messageLength) {
      // Multiple messages in one packet
      const firstMessage = data.slice(0, messageLength)
      this.messageCurrentLength = messageLength
      this.handleSingleResponseData(firstMessage)
      return data.slice(this.messageCurrentLength)
    } else {
      // The first packet of a multi-packet message
      this.messageData = Buffer.alloc(messageLength)
      const packetLength = data.copy(this.messageData, this.messageCurrentOffset, 0)
      this.messageCurrentOffset = packetLength
      return null
    }
  }

  /**
   * This function handles raw buffer responses received within multiple tcp data package
   */
  protected handleMultiPacketResponseData(data: Buffer): Buffer | null {
    this.log.trace({fn: 'handleMultiPacketResponseData'}, `MultipacketResponse`)
    if (this.messageData === null) {
      return null
    }
    const packetLength = data.copy(this.messageData, this.messageCurrentOffset, 0)
    this.messageCurrentOffset += packetLength
    if (this.messageCurrentOffset >= this.messageData.length) {
      this.handleSingleResponseData(this.messageData)
      this.messageData = null
      this.messageCurrentOffset = 0
    }
    return null
  }

  /**
   * This function handles a single raw buffer response
   */
  protected handleSingleResponseData(data: Buffer): void {
    const commandLength = data.readUInt32LE(0)
    if (commandLength < HEADER_LENGTH) {
      this.log.error(
        {
          connectionId: this.connectionId,
          fn: 'handleSingleResponseData'
        },
        'Invalid command length of ' + commandLength + ' bytes'
      )
      throw eventstoreError.newProtocolError('Invalid command length')
    }

    const command = data[COMMAND_OFFSET]

    const correlationId = uuidFromBuffer(
      data.slice(CORRELATION_ID_OFFSET, CORRELATION_ID_OFFSET + GUID_LENGTH)
    )

    this.log.trace('Incoming response: ' + EventstoreCommand[command])

    //Answer Heartbeat directly without adding to promise queue
    if (command === EventstoreCommand.HeartbeatRequestCommand) {
      this.emit('heartbeat')
      this.sendCommand(correlationId, EventstoreCommand.HeartbeatResponseCommand)
      return
    }

    //Answer Ping directly without adding to promise queue
    if (command === EventstoreCommand.Ping) {
      this.sendCommand(correlationId, EventstoreCommand.Pong)
      return
    }

    const payloadLength = commandLength - HEADER_LENGTH
    const payload = Buffer.alloc(payloadLength)
    if (payloadLength > 0) {
      data.copy(payload, 0, DATA_OFFSET, DATA_OFFSET + payloadLength)
    }

    let err: eventstoreError.EventstoreError
    switch (command) {
      case EventstoreCommand.BadRequest:
        err = eventstoreError.newBadRequestError()
        this.rejectCommandPromise(correlationId, err)
        this.onError(err)
        break
      case EventstoreCommand.NotAuthenticated:
        err = eventstoreError.newNotAuthenticatedError()
        this.rejectCommandPromise(correlationId, err)
        this.onError(err)
        break
      case EventstoreCommand.NotHandled:
        const notHandled = protobuf.NotHandled.decode(payload)
        err = eventstoreError.newNotHandledError(`
          ${protobuf.NotHandled.NotHandledReason[notHandled.reason]}
        `)
        this.rejectCommandPromise(correlationId, err)
        this.onError(err)
        break
      case EventstoreCommand.CreatePersistentSubscriptionCompleted:
        this.handleCreatePersistentSubscriptionCompleted(correlationId, payload)
        break
      case EventstoreCommand.DeletePersistentSubscriptionCompleted:
        this.handleDeletePersistentSubscriptionCompleted(correlationId, payload)
        break
      case EventstoreCommand.DeleteStreamCompleted:
        this.handleDeleteStreamCompleted(correlationId, payload)
        break
      case EventstoreCommand.PersistentSubscriptionConfirmation:
        this.handlePersistentSubscriptionConfirmation(correlationId, payload)
        break
      case EventstoreCommand.PersistentSubscriptionStreamEventAppeared:
        this.handlePersistentSubscriptionStreamEventAppeared(correlationId, payload)
        break

      case EventstoreCommand.ReadAllEventsBackwardCompleted:
        this.handleReadAllEventsCompleted(correlationId, payload)
        break
      case EventstoreCommand.ReadAllEventsForwardCompleted:
        this.handleReadAllEventsCompleted(correlationId, payload)
        break

      case EventstoreCommand.ReadEventCompleted:
        this.handleReadEventCompleted(correlationId, payload)
        break

      case EventstoreCommand.ReadStreamEventsBackwardCompleted:
        this.handleReadStreamEventsCompleted(correlationId, payload)
        break
      case EventstoreCommand.ReadStreamEventsForwardCompleted:
        this.handleReadStreamEventsCompleted(correlationId, payload)
        break
      case EventstoreCommand.StreamEventAppeared:
        this.handleStreamEventAppeared(correlationId, payload)
        break
      case EventstoreCommand.SubscriptionConfirmation:
        this.handleSubscriptionConfirmation(correlationId, payload)
        break
      case EventstoreCommand.SubscriptionDropped:
        this.handleSubscriptionDropped(correlationId, payload)
        break
      case EventstoreCommand.TransactionCommitCompleted:
        this.handleTransactionCommitCompleted(correlationId, payload)
        break
      case EventstoreCommand.TransactionStartCompleted:
        this.handleTransactionStartCompleted(correlationId, payload)
        break
      case EventstoreCommand.TransactionWriteCompleted:
        this.handleTransactionWriteCompleted(correlationId, payload)
        break
      case EventstoreCommand.UpdatePersistentSubscriptionCompleted:
        this.handleUpdatePersistentSubscriptionCompleted(correlationId, payload)
        break
      case EventstoreCommand.WriteEventsCompleted:
        this.handleWriteEventsCompleted(correlationId, payload)
        break
      case EventstoreCommand.ClientIdentified:
        this.resolveCommandPromise(correlationId)
        break
      case EventstoreCommand.Pong:
        this.resolveCommandPromise(correlationId)
        break
      case EventstoreCommand.Authenticated:
        this.resolveCommandPromise(correlationId)
        break
      default:
        err = new eventstoreError.EventstoreError(
          'Unhandled eventstore command : ' + EventstoreCommand[command] + ' -> ' + command,
          'EventstoreImplementationError'
        )
        this.rejectCommandPromise(correlationId, err)
        this.onError(err)
        break
    }
  }

  /**
   * Handle response for command CreatePersistentSubscription
   */
  protected handleCreatePersistentSubscriptionCompleted(
    correlationId: string,
    payload: Buffer
  ): void {
    const decoded = protobuf.CreatePersistentSubscriptionCompleted.decode(payload)
    if (
      decoded.result ===
      protobuf.CreatePersistentSubscriptionCompleted.CreatePersistentSubscriptionResult.Success
    ) {
      this.resolveCommandPromise(correlationId)
    } else {
      const errorMsg =
        `${
          protobuf.CreatePersistentSubscriptionCompleted.CreatePersistentSubscriptionResult[
            decoded.result
          ]
        } ` + (decoded.reason || '')
      let err
      switch (decoded.result) {
        case protobuf.CreatePersistentSubscriptionCompleted.CreatePersistentSubscriptionResult
          .AccessDenied:
          err = eventstoreError.newAccessDeniedError(errorMsg)
          break
        case protobuf.CreatePersistentSubscriptionCompleted.CreatePersistentSubscriptionResult
          .AlreadyExists:
          err = eventstoreError.newAlreadyExistError(errorMsg)
          break
        default:
          err = eventstoreError.newUnspecificError(errorMsg)
      }
      this.rejectCommandPromise(correlationId, err)
    }
  }

  /**
   * Handle response for command DeletePersistentSubscription
   */
  protected handleDeletePersistentSubscriptionCompleted(
    correlationId: string,
    payload: Buffer
  ): void {
    const status = protobuf.DeletePersistentSubscriptionCompleted.DeletePersistentSubscriptionResult
    const decoded = protobuf.DeletePersistentSubscriptionCompleted.decode(payload)
    if (decoded.result === status.Success) {
      this.resolveCommandPromise(correlationId)
    } else {
      let returnError
      switch (decoded.result) {
        case status.AccessDenied:
          returnError = eventstoreError.newAccessDeniedError(
            'Delete of Subscription not allowed: ' + decoded.reason || ''
          )
          break
        case status.DoesNotExist:
          returnError = eventstoreError.newDoesNotExistError(
            'Persistent subscription does not exist: ' + decoded.reason || ''
          )
          break
        default:
          returnError = eventstoreError.newUnspecificError(
            'Delete persistent connection failed: ' + (decoded.reason || '')
          )
      }
      this.rejectCommandPromise(correlationId, returnError)
    }
  }

  /**
   * Handle response for command DeleteStreamCompleted
   */
  protected handleDeleteStreamCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.DeleteStreamCompleted.decode(payload)
    if (
      this.checkOperationResult(
        correlationId,
        decoded.result,
        'handleDeleteStream: ' + decoded.message
      )
    ) {
      this.resolveCommandPromise(
        correlationId,
        new Position(decoded.commitPosition, decoded.preparePosition)
      )
    }
  }

  /**
   * Handle response for command ReadAllEvents
   */
  protected handleReadAllEventsCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.ReadAllEventsCompleted.decode(payload)
    let err: eventstoreError.EventstoreError
    const message: string = decoded.error || ''
    switch (decoded.result) {
      case protobuf.ReadAllEventsCompleted.ReadAllResult.Success:
        this.resolveCommandPromise(correlationId, decoded)
        return
      case protobuf.ReadAllEventsCompleted.ReadAllResult.AccessDenied:
        err = eventstoreError.newAccessDeniedError(message)
        break
      case protobuf.ReadAllEventsCompleted.ReadAllResult.NotModified:
        err = eventstoreError.newNotModifiedError(message)
        break
      default:
        err = eventstoreError.newUnspecificError(message)
    }
    this.rejectCommandPromise(correlationId, err)
  }

  /**
   * Handle response for command ReadStreamEvents
   */
  protected handleReadStreamEventsCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.ReadStreamEventsCompleted.decode(payload)
    let err: eventstoreError.EventstoreError
    const message: string = decoded.error || ''
    switch (decoded.result) {
      case protobuf.ReadStreamEventsCompleted.ReadStreamResult.Success:
        this.resolveCommandPromise(correlationId, decoded)
        return
      case protobuf.ReadStreamEventsCompleted.ReadStreamResult.NoStream:
        err = eventstoreError.newNoStreamError(message)
        break
      case protobuf.ReadStreamEventsCompleted.ReadStreamResult.NotModified:
        err = eventstoreError.newNotModifiedError(message)
        break
      case protobuf.ReadStreamEventsCompleted.ReadStreamResult.StreamDeleted:
        err = eventstoreError.newStreamDeletedError(message)
        break
      case protobuf.ReadStreamEventsCompleted.ReadStreamResult.AccessDenied:
        err = eventstoreError.newAccessDeniedError(message)
        break

      default:
        err = eventstoreError.newUnspecificError(message)
    }
    this.rejectCommandPromise(correlationId, err)
  }

  /**
   * Handle response for command ReadEvent
   */
  protected handleReadEventCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.ReadEventCompleted.decode(payload)

    let err: eventstoreError.EventstoreError
    const message: string = decoded.error || ''
    switch (decoded.result) {
      case protobuf.ReadEventCompleted.ReadEventResult.Success:
        this.resolveCommandPromise(correlationId, decoded.event)
        return
      case protobuf.ReadEventCompleted.ReadEventResult.NotFound:
        err = eventstoreError.newNotFoundError(message)
        break
      case protobuf.ReadEventCompleted.ReadEventResult.NoStream:
        err = eventstoreError.newNoStreamError(message)
        break
      case protobuf.ReadEventCompleted.ReadEventResult.StreamDeleted:
        err = eventstoreError.newStreamDeletedError(message)
        break
      case protobuf.ReadEventCompleted.ReadEventResult.AccessDenied:
        err = eventstoreError.newAccessDeniedError(message)
        break
      default:
        err = eventstoreError.newUnspecificError(message)
    }
    this.rejectCommandPromise(correlationId, err)
  }

  /**
   * Handle incoming event for subscription
   */
  protected handleStreamEventAppeared(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.StreamEventAppeared.decode(payload)
    const subscription = this.subscriptionList.get(correlationId)
    if (subscription) {
      const event = Event.fromRaw(decoded.event.event || decoded.event.link)
      subscription.eventAppeared(
        event,
        new Position(decoded.event.commitPosition, decoded.event.preparePosition)
      )
    } else {
      this.log.error(
        {subscriptionId: correlationId, fn: 'handleStreamEventAppeared'},
        'Received StreamEventAppeared for unknown id'
      )
      this.emit(
        'error',
        eventstoreError.newImplementationError(
          `Received StreamEventAppeared for unknown id ${correlationId}`
        )
      )
    }
  }

  /**
   * Handle response for command Subscription
   */
  protected handleSubscriptionConfirmation(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.SubscriptionConfirmation.decode(payload)

    this.resolveCommandPromise(correlationId, {
      subscriptionId: correlationId,
      lastCommitPosition: decoded.lastCommitPosition,
      lastEventNumber: decoded.lastEventNumber
    })
  }

  /**
   * Handle subscription drop
   */
  protected handleSubscriptionDropped(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.SubscriptionDropped.decode(payload)
    const subscription = this.subscriptionList.get(correlationId) || null
    if (subscription) {
      subscription.emit('dropped', SubscriptionDropReason[decoded.reason])
    }
    const persistentSubscription = this.persistentSubscriptionList.get(correlationId) || null
    if (persistentSubscription) {
      persistentSubscription.emit('dropped', SubscriptionDropReason[decoded.reason])
    }
    if (this.pendingRequests.has(correlationId)) {
      if (decoded.reason === SubscriptionDropReason.Unsubscribed) {
        this.resolveCommandPromise(correlationId, SubscriptionDropReason[decoded.reason])
      } else {
        this.rejectCommandPromise(
          correlationId,
          eventstoreError.newUnspecificError(
            'Subscription dropped: ' + SubscriptionDropReason[decoded.reason]
          )
        )
      }
    }
  }

  /**
   * Handle response for command TransactionCommit
   */
  protected handleTransactionCommitCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.TransactionCommitCompleted.decode(payload)
    if (
      this.checkOperationResult(
        correlationId,
        decoded.result,
        'handleTransactionCommit: ' + decoded.message
      )
    ) {
      const result: WriteResult = {
        firstEventNumber: decoded.firstEventNumber,
        lastEventNumber: decoded.lastEventNumber,
        position: new Position(decoded.commitPosition, decoded.preparePosition)
      }
      this.resolveCommandPromise(correlationId, result)
    }
  }

  /**
   * Handle response for command TransactionStart
   */
  protected handleTransactionStartCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.TransactionStartCompleted.decode(payload)
    if (
      this.checkOperationResult(
        correlationId,
        decoded.result,
        'handleTransactionStart: ' + decoded.message
      )
    ) {
      this.resolveCommandPromise(correlationId, decoded.transactionId)
    }
  }

  /**
   * Handles transaction write completed
   */
  protected handleTransactionWriteCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.TransactionWriteCompleted.decode(payload)
    if (
      this.checkOperationResult(
        correlationId,
        decoded.result,
        'handleTransactionWrite: ' + decoded.message
      )
    ) {
      this.resolveCommandPromise(correlationId, decoded.transactionId)
    }
  }

  /**
   * Handles update persistent subscription completed
   */
  protected handleUpdatePersistentSubscriptionCompleted(
    correlationId: string,
    payload: Buffer
  ): void {
    const decoded = protobuf.UpdatePersistentSubscriptionCompleted.decode(payload)
    const status = protobuf.UpdatePersistentSubscriptionCompleted.UpdatePersistentSubscriptionResult
    const message = decoded.reason || ''
    switch (decoded.result) {
      case status.Success:
        this.resolveCommandPromise(correlationId)
        break
      case status.DoesNotExist:
        this.rejectCommandPromise(correlationId, eventstoreError.newDoesNotExistError(message))
        break
      case status.AccessDenied:
        this.rejectCommandPromise(correlationId, eventstoreError.newAccessDeniedError(message))
        break
      default:
    }
  }

  /**
   * Handles write events completed
   */
  protected handleWriteEventsCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.WriteEventsCompleted.decode(payload)
    if (
      this.checkOperationResult(
        correlationId,
        decoded.result,
        'handleWriteEvents: ' + decoded.message
      )
    ) {
      this.resolveCommandPromise(correlationId, decoded)
    }
  }

  /**
   * Handles persistent subscription confirmation
   */
  protected handlePersistentSubscriptionConfirmation(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.PersistentSubscriptionConfirmation.decode(payload)
    this.resolveCommandPromise(correlationId, decoded)
  }

  /**
   * Handles persistent subscription stream event appeared
   */
  protected handlePersistentSubscriptionStreamEventAppeared(
    correlationId: string,
    payload: Buffer
  ): void {
    const decoded = protobuf.PersistentSubscriptionStreamEventAppeared.decode(payload)
    const subscription = this.persistentSubscriptionList.get(correlationId)
    if (subscription) {
      const event = Event.fromRaw(decoded.event.event || decoded.event.link)
      subscription.eventAppeared(event)
    } else {
      this.log.error(
        {
          subscriptionId: correlationId,
          persistentSubscriptionList: this.persistentSubscriptionList,
          fn: 'handlePersistentSubscriptionStreamEventAppeared'
        },
        'Received PersistentSubscriptionStreamEventAppeared for unknown id'
      )
      this.emit(
        'error',
        eventstoreError.newImplementationError(
          `Received PersistentSubscriptionStreamEventAppeared for unknown id ${correlationId}`
        )
      )
    }
  }

  /**
   * CHecks if given result is an error code
   * It returns true for successful result otherwise it returns false.
   * If result is an error this function rejects corresponding command promise and remove it from command queue
   */
  protected checkOperationResult(
    correlationId: string,
    result: number,
    message: string = ''
  ): boolean {
    let err: eventstoreError.EventstoreError
    switch (result) {
      case protobuf.OperationResult.Success:
        return true
      case protobuf.OperationResult.AccessDenied:
        err = eventstoreError.newAccessDeniedError(message)
        break
      case protobuf.OperationResult.CommitTimeout:
        err = eventstoreError.newCommitTimeoutError(message)
        break
      case protobuf.OperationResult.ForwardTimeout:
        err = eventstoreError.newForwardTimeoutError(message)
        break
      case protobuf.OperationResult.InvalidTransaction:
        err = eventstoreError.newInvalidTransactionError(message)
        break
      case protobuf.OperationResult.PrepareTimeout:
        err = eventstoreError.newPrepareTimeoutError(message)
        break
      case protobuf.OperationResult.StreamDeleted:
        err = eventstoreError.newStreamDeletedError(message)
        break
      case protobuf.OperationResult.WrongExpectedVersion:
        err = eventstoreError.newWrongExpectedVersionError(message)
        break
      default:
        err = eventstoreError.newUnspecificError('Invalid operation result')
        break
    }
    this.rejectCommandPromise(correlationId, err)
    return false
  }

  /**
   * Will be called if a command send to eventstore was replied with an error
   * In this case corresponding promise will be rejected and removed from queue
   */
  protected rejectCommandPromise(
    correlationId: string,
    error: eventstoreError.EventstoreError
  ): void {
    const resultPromise = this.pendingRequests.get(correlationId)
    if (resultPromise) {
      resultPromise.reject(error)
      this.pendingRequests.delete(correlationId)
    } else {
      const err = eventstoreError.newImplementationError(
        `Could not find correlationId ${correlationId} on rejectCommandPromise`
      )
      this.onError(err)
    }
  }

  /**
   * Will be called if a command send to eventstore was replied with success response
   * In this case corresponding promise will be resolved with result received from eventstore
   */
  protected resolveCommandPromise<T>(correlationId: string, result: null | T = null): void {
    const resultPromise = this.pendingRequests.get(correlationId)
    if (resultPromise) {
      resultPromise.resolve(result)
      this.pendingRequests.delete(correlationId)
    } else {
      const err = eventstoreError.newImplementationError(
        `Could not find correlationId ${correlationId} on resolveCommandPromise`
      )
      this.onError(err)
    }
  }

  /**
   * Subscribes to stream
   */
  public subscribeToStream(
    stream: Stream,
    resolveLinkTos: boolean = true,
    credentials: UserCredentials | null
  ): Promise<Subscription> {
    const newSubscription = new Subscription(uuid(), this, stream, resolveLinkTos, credentials)
    this.subscriptionList.set(newSubscription.id, newSubscription)
    return new Promise(
      (resolve, reject): void => {
        const resolveFunction = (): void => {
          newSubscription.isSubscribed = true
          newSubscription.emit('subscribed')
          resolve(newSubscription)
        }
        const raw = protobuf.SubscribeToStream.fromObject({
          eventStreamId: stream.id,
          resolveLinkTos
        })
        this.sendCommand(
          newSubscription.id,
          EventstoreCommand.SubscribeToStream,
          Buffer.from(protobuf.SubscribeToStream.encode(raw).finish()),
          credentials,
          {
            resolve: resolveFunction,
            reject
          }
        )
      }
    )
  }

  /**
   * Unsubscribes from stream
   */
  public async unsubscribeFromStream(subscriptionId: string): Promise<void> {
    const subscription = this.subscriptionList.get(subscriptionId)
    if (!subscription) {
      throw eventstoreError.newImplementationError(
        `Can not unsubscribe - subscription ${subscriptionId} not found`
      )
    }
    const subscriptionList = this.subscriptionList
    await new Promise(
      (resolve, reject): void => {
        const resolveFunction = (): void => {
          subscription.isSubscribed = false
          subscriptionList.delete(subscriptionId)
          resolve()
        }
        this.sendCommand(
          subscription.id,
          EventstoreCommand.UnsubscribeFromStream,
          null,
          subscription.getCredentials,
          {
            resolve: resolveFunction,
            reject
          }
        )
      }
    )
  }

  /**
   * Connects to persistent subscription
   */
  public async connectToPersistentSubscription(
    subscription: PersistentSubscription,
    allowedInFlightMessages: number = 10,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.PersistentSubscriptionConfirmation> {
    this.persistentSubscriptionList.set(subscription.id, subscription)
    const result: model.eventstore.proto.PersistentSubscriptionConfirmation = await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.ConnectToPersistentSubscription.fromObject({
          subscriptionId: subscription.subscriptionGroupName,
          eventStreamId: subscription.stream.id,
          allowedInFlightMessages
        })
        this.sendCommand(
          subscription.id,
          EventstoreCommand.ConnectToPersistentSubscription,
          Buffer.from(protobuf.ConnectToPersistentSubscription.encode(raw).finish()),
          credentials,
          {
            resolve,
            reject
          }
        )
      }
    )
    subscription.emit('subscribed')
    subscription.lastCommitPosition = result.lastCommitPosition
      ? Long.fromValue(result.lastCommitPosition)
      : Long.fromValue(0)
    subscription.lastEventNumber = result.lastEventNumber
      ? Long.fromValue(result.lastEventNumber)
      : Long.fromValue(-1)

    return result
  }

  /**
   * Stop listening on persistent subscription
   */
  public async unsubscribeFromPersistentSubscription(
    subscriptionId: string,
    credentials?: UserCredentials | null
  ): Promise<void> {
    const subscription = this.persistentSubscriptionList.get(subscriptionId)
    if (!subscription) {
      throw eventstoreError.newImplementationError(
        `Can not unsubscribe - persistent subscription ${subscriptionId} not found`
      )
    }
    const subscriptionList = this.persistentSubscriptionList
    await new Promise(
      (resolve, reject): void => {
        const resolveFunction = (): void => {
          subscription.state = SubscriptionStatus.disconnected
          subscriptionList.delete(subscriptionId)
          resolve()
        }
        this.sendCommand(
          subscription.id,
          EventstoreCommand.UnsubscribeFromStream,
          null,
          credentials,
          {
            resolve: resolveFunction,
            reject
          }
        )
      }
    )
  }

  /**
   * Emit general low level connection errors (communication errors).
   * Will not emit errors on business level
   */
  protected onError(err?: Error): void {
    let errorMessage
    let error = err ? err : eventstoreError.newConnectionError('Eventstore connection error')

    if (error.name === 'Error') {
      error = eventstoreError.newConnectionError(error.message, err)
    }
    errorMessage = error.message
    this.log.error({err: error}, errorMessage)
    this.emit('error', error)
  }

  /**
   * Emit as soon as connection to eventstore was established successfully
   */
  protected onConnect(): void {
    this.reconnectCount = 0
    this.isUnexpectedClosed = true
    this.log.debug('Connected to eventstore')
    this.state = connectionState.connected
    this.emit('connected')

    this.timeoutInterval = setInterval(
      this.checkTimeout.bind(this),
      this.initialConfig.operationTimeoutCheckPeriod
    )
  }

  /**
   * Emitted as soon as data arrives over tcp connection
   */
  protected onData(data: Buffer | null): void {
    while (data != null) {
      if (this.messageData === null) {
        data = this.handleNewResponseData(data)
      } else {
        data = this.handleMultiPacketResponseData(data)
      }
    }
  }

  /**
   * Emit as soon as connection to eventstore is closed
   */
  protected onClose(): void {
    this.log.debug('Connection to eventstore closed')
    this.state = connectionState.closed
    this.emit('close')
    if (this.isUnexpectedClosed) {
      this.emit('error', eventstoreError.newConnectionError('Connection closed unexpected'))
      this.connect()
    }

    // stop timeout interval
    if (this.timeoutInterval) {
      clearInterval(this.timeoutInterval)
      this.timeoutInterval = null
    }

    // reject all pending promises
    this.pendingRequests.forEach(
      (value): void => {
        value.reject(eventstoreError.newConnectionError('Connection closed'))
      }
    )
    this.pendingRequests = new Map()

    //drop all subscriptions
    this.subscriptionList.forEach(
      (subscription): void => {
        subscription.emit('dropped', 'Connection closed')
      }
    )

    //drop all persistent subscriptions
    this.persistentSubscriptionList.forEach(
      (subscription): void => {
        subscription.emit('dropped', 'Connection closed')
      }
    )
  }

  /**
   * Emit when connection starts draining
   */
  protected onDrain(): void {
    this.log.debug('Eventstore connection draining')
    this.state = connectionState.drain
    this.emit('drain')
  }

  /**
   * Emit when connection secured
   */
  protected onSecureConnect(): void {
    this.log.debug('Eventstore connection secured')
    this.emit('secureConnect')
  }
}
