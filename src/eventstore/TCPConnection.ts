import {EventstoreSettings} from './EventstoreSettings'
import * as net from 'net'
import * as tls from 'tls'
import * as bunyan from 'bunyan'
import {EventEmitter} from 'events'
import {uuidToBuffer, uuidFromBuffer} from '../protobuf/uuidBufferConvert'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import * as eventstoreError from '../errors'
import * as model from '../protobuf/model'
import {Subscription} from '../subscription'
import {Stream} from '../stream'
import {UserCredentials} from '../eventstore/EventstoreSettings'
import uuid = require('uuid/v4')
import {Event} from '../event'
import {getIpAndPort} from './getConnectInfo'

const protobuf = model.eventstore.proto

enum connectionState {
  closed,
  init,
  connected,
  drain
}

const FLAGS_NONE = 0x00
const FLAGS_AUTH = 0x01

const UINT32_LENGTH = 4
const GUID_LENGTH = 16
const HEADER_LENGTH = 1 + 1 + GUID_LENGTH // Cmd + Flags + CorrelationId

const COMMAND_OFFSET = UINT32_LENGTH
const FLAGS_OFFSET = COMMAND_OFFSET + 1
const CORRELATION_ID_OFFSET = FLAGS_OFFSET + 1
const DATA_OFFSET = CORRELATION_ID_OFFSET + GUID_LENGTH // Length + Cmd + Flags + CorrelationId

/**
 * Raw tcp communication to eventstore
 * This class handles basic communication with eventstore
 *
 * @export
 * @class TCPConnection
 * @extends {EventEmitter}
 * @emits {error} emit error on connection errors
 * @emits {heartbeat} emit incoming heartbeat
 * @emits {connected} emit when connection is established
 * @emits {close} emit when connection is closed
 * @emits {drain} emit before connection closes
 *
 */
export class TCPConnection extends EventEmitter {
  protected initialConfig: EventstoreSettings
  protected connectionConfig: EventstoreSettings
  protected socket: net.Socket | tls.TLSSocket
  protected connectionId: string | null = null
  protected pendingRequests: Map<string, {resolve: Function; reject: Function}> = new Map()
  public log: bunyan
  protected state: connectionState = connectionState.closed
  protected messageCurrentOffset: number = 0
  protected messageCurrentLength: number = 0
  protected messageData: Buffer | null = null
  protected subscriptionList: Map<string, Subscription> = new Map()
  protected isUnexpectedClosed: boolean = true
  protected heartBeatCheckInterval: NodeJS.Timeout | null = null
  protected lastHeartBeatTime: number

  public constructor(connectionConfiguration: EventstoreSettings) {
    super()
    this.initialConfig = {...connectionConfiguration}
    this.connectionConfig = connectionConfiguration
    this.log = this.connectionConfig.logger.child
      ? this.connectionConfig.logger.child({module: 'TCPConnection'})
      : this.connectionConfig.logger

    this.socket = new net.Socket()

    this.lastHeartBeatTime = Date.now()
  }

  /**
   * Returns true if connected to eventstore otherwise false
   *
   * @readonly
   * @type {boolean}
   * @memberof TCPConnection
   */
  public get isConnected(): boolean {
    return this.state === connectionState.connected
  }

  /**
   * Connect to eventstore
   *
   * @returns {Promise<void>}
   * @memberof TCPConnection
   */
  public async connect(): Promise<void> {
    this.state = connectionState.init

    this.connectionConfig = await getIpAndPort({...this.initialConfig}, this.log)

    const port = this.connectionConfig.port
    const host = this.connectionConfig.host

    if (port === 0 || host === '') {
      throw eventstoreError.newConnectionError('Invalid connection settings on host and port')
    }

    this.log.debug(`Start connecting to ${host}:${port}`)

    await new Promise(
      (resolve, reject): void => {
        const errorListener = (err: Error): void => {
          this.state = connectionState.closed
          this.onError(eventstoreError.newConnectionError(err.message, err))
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
          this.heartBeatCheckInterval = setInterval((): void => {
            if (this.lastHeartBeatTime + this.connectionConfig.heartbeatTimeout < Date.now()) {
              const err = eventstoreError.newTimeoutError(
                `Heartbeat missing more than ${this.connectionConfig.heartbeatTimeout}ms`
              )
              this.onError(err)
            }
          }, this.connectionConfig.heartbeatInterval)
          resolve()
          this.isUnexpectedClosed = false
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
   *
   * @returns {Promise<void>}
   * @memberof TCPConnection
   */
  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return
    }
    if (this.heartBeatCheckInterval) {
      clearInterval(this.heartBeatCheckInterval)
    }
    await new Promise(
      (resolve, reject): void => {
        this.onDrain()
        if (this.pendingRequests.size <= 0) {
          this.state = connectionState.closed
          this.isUnexpectedClosed = false
          this.socket.end(
            (): void => {
              this.socket.destroy()
              resolve()
            }
          )
        } else {
          setTimeout((): void => {
            this.state = connectionState.closed
            this.isUnexpectedClosed = false
            if (this.pendingRequests.size > 0) {
              this.socket.end(
                (): void => {
                  this.socket.destroy()
                  const err = eventstoreError.newConnectionError(
                    `Lost ${this.pendingRequests.size} answers`
                  )
                  reject(err)
                  this.onError(err)
                }
              )
            } else {
              this.socket.end(
                (): void => {
                  this.socket.destroy()
                  resolve()
                }
              )
            }
          }, 10000)
        }
      }
    )
  }

  /**
   * Creates and sends raw data message to eventstore and adds given promise to pending queue
   *
   * @param {string} correlationId
   * @param {EventstoreCommand} command
   * @param {?Buffer)} [data=null]
   * @param {?(UserCredentials)} [credentials=null]
   * @param {(?{resolve: Function; reject: Function})} [promise=null]
   * @memberof TCPConnection
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
      if (this.pendingRequests.size >= this.connectionConfig.maxConcurrentItems) {
        throw eventstoreError.newConnectionError('Maximum concurrent items reached')
      }
      this.pendingRequests.set(correlationId, promise)
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
   *
   * @protected
   * @param {Buffer} data
   * @returns {(Buffer | null)}
   * @memberof TCPConnection
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
   *
   * @protected
   * @param {Buffer} data
   * @returns {(Buffer | null)}
   * @memberof TCPConnection
   */
  protected handleMultiPacketResponseData(data: Buffer): Buffer | null {
    this.log.debug({fn: 'handleMultiPacketResponseData'}, `MultipacketResponse`)
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
   *
   * @protected
   * @param {Buffer} data
   * @emits {heartbeat}
   * @memberof TCPConnection
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
      /*
      case EventstoreCommand.ScavengeDatabaseCompleted:
        this.handleScavengeDatabaseResponse(correlationId, payload)
        break
*/
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

  protected handleDeletePersistentSubscriptionCompleted(
    correlationId: string,
    payload: Buffer
  ): void {
    const decoded = protobuf.DeletePersistentSubscriptionCompleted.decode(payload)
    if (
      decoded.result ===
      protobuf.DeletePersistentSubscriptionCompleted.DeletePersistentSubscriptionResult.Success
    ) {
      this.resolveCommandPromise(correlationId)
    } else {
      const err = new eventstoreError.EventstoreError(
        `${
          protobuf.DeletePersistentSubscriptionCompleted.DeletePersistentSubscriptionResult[
            decoded.result
          ]
        } ` + (decoded.reason || ''),
        'EventstoreDeletePersistentSubscriptionError'
      )
      this.rejectCommandPromise(correlationId, err)
    }
  }

  protected handleDeleteStreamCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.DeleteStreamCompleted.decode(payload)
    if (this.checkOperationResult(correlationId, decoded.result, decoded.message)) {
      this.resolveCommandPromise(correlationId)
    }
  }

  protected handleReadAllEventsCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.ReadAllEventsCompleted.decode(payload)
    let err: eventstoreError.EventstoreError
    const message: string = decoded.error || ''
    switch (decoded.result) {
      case protobuf.ReadAllEventsCompleted.ReadAllResult.Success:
        this.resolveCommandPromise(correlationId, decoded)
        return
        break
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

  protected handleReadStreamEventsCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.ReadStreamEventsCompleted.decode(payload)
    let err: eventstoreError.EventstoreError
    const message: string = decoded.error || ''
    switch (decoded.result) {
      case protobuf.ReadStreamEventsCompleted.ReadStreamResult.Success:
        this.resolveCommandPromise(correlationId, decoded)
        return
        break
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

  protected handleReadEventCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.ReadEventCompleted.decode(payload)

    let err: eventstoreError.EventstoreError
    const message: string = decoded.error || ''
    switch (decoded.result) {
      case protobuf.ReadEventCompleted.ReadEventResult.Success:
        this.resolveCommandPromise(correlationId, decoded.event)
        return
        break
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

  /*
  protected handleScavengeDatabaseResponse(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.ScavengeDatabaseResponse.decode(payload)
    if ((decoded.result = protobuf.ScavengeDatabaseResponse.ScavengeResult.Unauthorized)) {
      const err = eventstoreError.newAccessDeniedError('Unauthorized to scavenge database')
      this.rejectCommandPromise(correlationId, err)
      return
    }

    this.resolveCommandPromise(correlationId, decoded)
  }
  */

  protected handleStreamEventAppeared(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.StreamEventAppeared.decode(payload)
    const subscription = this.subscriptionList.get(correlationId)
    if (subscription) {
      let event
      if (decoded.event.event) {
        event = Event.fromRaw(decoded.event.event)
      } else if (decoded.event.link) {
        event = Event.fromRaw(decoded.event.link)
      } else {
        subscription.emit(
          'error',
          eventstoreError.newProtocolError(
            'Received stream event with empty event and empty link field'
          )
        )
        return
      }
      subscription.emit('event', event, decoded.event.commitPosition, decoded.event.preparePosition)
      subscription.emit(
        `event-${event.name.toLocaleLowerCase()}`,
        event,
        decoded.event.commitPosition,
        decoded.event.preparePosition
      )
    } else {
      this.log.error({subscriptionId: correlationId}, 'Received StreamEventAppeared for unknown id')
      this.emit(
        'error',
        eventstoreError.newImplementationError(
          `Received StreamEventAppeared for unknown id ${correlationId}`
        )
      )
    }
  }

  protected handleSubscriptionConfirmation(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.SubscriptionConfirmation.decode(payload)

    this.resolveCommandPromise(correlationId, {
      subscriptionId: correlationId,
      lastCommitPosition: decoded.lastCommitPosition,
      lastEventNumber: decoded.lastEventNumber
    })
  }

  protected handleSubscriptionDropped(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.SubscriptionDropped.decode(payload)
    const subscription = this.subscriptionList.get(correlationId) || null
    if (subscription) {
      subscription.emit('dropped', decoded.reason)
    }
    if (this.pendingRequests.has(correlationId)) {
      this.resolveCommandPromise(correlationId, decoded)
    }
  }

  protected handleTransactionCommitCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.TransactionCommitCompleted.decode(payload)
    if (this.checkOperationResult(correlationId, decoded.result, decoded.message)) {
      this.resolveCommandPromise(correlationId, decoded)
    }
  }

  protected handleTransactionStartCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.TransactionStartCompleted.decode(payload)
    if (this.checkOperationResult(correlationId, decoded.result, decoded.message)) {
      this.resolveCommandPromise(correlationId, decoded.transactionId)
    }
  }

  protected handleTransactionWriteCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.TransactionWriteCompleted.decode(payload)
    if (this.checkOperationResult(correlationId, decoded.result, decoded.message)) {
      this.resolveCommandPromise(correlationId, decoded.transactionId)
    }
  }

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

  protected handleWriteEventsCompleted(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.WriteEventsCompleted.decode(payload)
    if (this.checkOperationResult(correlationId, decoded.result, decoded.message)) {
      this.resolveCommandPromise(correlationId, decoded)
    }
  }

  protected handlePersistentSubscriptionConfirmation(correlationId: string, payload: Buffer): void {
    const decoded = protobuf.PersistentSubscriptionConfirmation.decode(payload)
    this.resolveCommandPromise(correlationId, decoded)
  }

  protected handlePersistentSubscriptionStreamEventAppeared(
    correlationId: string,
    payload: Buffer
  ): void {
    /*TODO*/
  }

  /**
   * CHecks if given result is an error code
   * It returns true for successful result otherwise it returns false.
   * If result is an error this function rejectes corresponding command promise and remove it from command queue
   *
   * @protected
   * @param {string} correlationId
   * @param {number} result
   * @param {string} [message='']
   * @returns {boolean}
   * @memberof TCPConnection
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
        break
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
   *
   * @protected
   * @param {string} correlationId
   * @param {eventstoreError.EventstoreError} error
   * @memberof TCPConnection
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
   *
   * @protected
   * @param {string} correlationId
   * @param {(null | T)} [result=null]
   * @memberof TCPConnection
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
   * Emit general low level connection errors (communication errors).
   * Will not emit errors on business level
   *
   * @protected
   * @param {Error} [err]
   * @memberof TCPConnection
   */
  protected onError(err?: Error): void {
    let errorMessage
    let error = err ? err : eventstoreError.newConnectionError('Eventstore connection error')

    if (error.name === 'Error') {
      error = eventstoreError.newConnectionError(error.message, err)
    }
    this.log.error({err: error}, errorMessage)
    this.emit('error', error)
  }

  /**
   * Emit as soon as connection to eventstore was established successfull
   *
   * @protected
   * @memberof TCPConnection
   */
  protected onConnect(): void {
    this.log.debug('Connected to eventstore')
    this.state = connectionState.connected
    this.emit('connected')
  }

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
   *
   * @protected
   * @memberof TCPConnection
   */
  protected onClose(): void {
    this.log.debug('Connection to eventstore closed')
    this.state = connectionState.closed
    if (this.heartBeatCheckInterval) {
      clearInterval(this.heartBeatCheckInterval)
    }
    this.emit('close')
    if (this.isUnexpectedClosed) {
      this.emit('error', eventstoreError.newConnectionError('Connection closed unexpected'))
    }
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
