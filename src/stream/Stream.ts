import {Eventstore} from '../eventstore'
import {Event} from '../event'
import uuid = require('uuid/v4')
import * as bunyan from 'bunyan'
import * as model from '../protobuf/model'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import {ExpectedVersion} from '../protobuf/ExpectedVersion'
import {StreamPosition} from './StreamPosition'
import {Transaction} from './Transaction'
import {Subscription} from '../subscription'
import * as eventstoreError from '../errors'
import {UserCredentials} from '../eventstore/EventstoreSettings'
import Long = require('long')
import {JSONValue} from '../JSON'

const protobuf = model.eventstore.proto

export interface StreamOptions {
  requireMaster?: boolean
  resolveLinks?: boolean
  credentials?: UserCredentials | null
}

/**
 * Base class for handling a stream
 *
 * @export
 * @class Stream
 */
export class Stream {
  /** @type {Eventstore} */
  protected esConnection: Eventstore
  /** @type {Bunyan} */
  public log: bunyan
  /** @type {string} */
  protected streamId: string
  /** @type {StreamOptions} */
  protected options: StreamOptions

  /**
   * Creates an instance of Stream.
   * @param {Eventstore} eventstore
   * @param {string} streamId
   * @param {StreamOptions} options
   * @memberof Stream
   */
  public constructor(eventstore: Eventstore, streamId: string, options: StreamOptions) {
    this.esConnection = eventstore
    this.streamId = streamId
    this.log = this.esConnection.logger.child
      ? this.esConnection.logger.child({module: 'Stream'})
      : this.esConnection.logger

    this.options = options
  }

  /**
   * Return name of stream instance
   *
   * @readonly
   * @type {string}
   * @memberof Stream
   */
  public get name(): string {
    return 'Stream: ' + this.streamId
  }

  public get id(): string {
    return this.streamId
  }

  /**
   * Return current logger instance
   *
   * @readonly
   * @type {bunyan}
   * @memberof Stream
   */
  public get logger(): bunyan {
    return this.log
  }

  /**
   * Enforces to use master node for any read/write operation
   *
   * @returns {Stream}
   * @memberof Stream
   */
  public requiresMaster(): Stream {
    this.options.requireMaster = true
    return this
  }

  /**
   * Set credentials for any read/write operation
   *
   * @param {UserCredentials} credentials
   * @returns {Stream}
   * @memberof Stream
   */
  public withCredentials(credentials: UserCredentials): Stream {
    this.options.credentials = credentials
    return this
  }

  /**
   * Enforce to resolve linkson read operations
   *
   * @returns {Stream}
   * @memberof Stream
   */
  public resolveAllLinks(): Stream {
    this.options.resolveLinks = true
    return this
  }

  /**
   * Appends array of events to stream
   *
   * @protected
   * @param {Event[]} events
   * @param {(ExpectedVersion | number | Long)} [expectedVersion]
   * @param {boolean} [requireMaster]
   * @returns {Promise<void>}
   * @memberof Stream
   */
  protected appendEvents(
    events: Event[],
    expectedVersion: ExpectedVersion | number | Long = -2,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<void> {
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster === undefined ? false : this.options.requireMaster
    }
    const eventArrayTransformed: model.eventstore.proto.NewEvent[] = events.map(
      (event): model.eventstore.proto.NewEvent => {
        if (!event.isNew()) {
          throw eventstoreError.newOperationError(
            `Event ${event.name} is already stored in eventstore`
          )
        }
        return event.toRaw()
      }
    )

    const raw = protobuf.WriteEvents.fromObject({
      eventStreamId: this.streamId,
      expectedVersion: expectedVersion,
      events: eventArrayTransformed,
      requireMaster: requireMaster
    })
    return new Promise(
      (resolve, reject): void => {
        const setToWritten = (): void => {
          events.forEach((event): void => event.freeze())
          resolve()
        }

        this.esConnection
          .getConnection()
          .sendCommand(
            uuid(),
            EventstoreCommand.WriteEvents,
            Buffer.from(protobuf.WriteEvents.encode(raw).finish()),
            credentials || this.options.credentials,
            {
              resolve: setToWritten,
              reject
            }
          )
      }
    )
  }

  /**
   * Inidcates if given stream is a metadata stream or a regular steam
   *
   * @returns {boolean} - true if metadata stream
   * @memberof Stream
   */
  public isMetaStream(): boolean {
    return this.streamId.startsWith('$$')
  }

  /**
   * Append single event or array of events to stream
   *
   * @param {(Event | Event[])} event
   * @param {(ExpectedVersion | number | Long)} [expectedVersion]
   * @param {boolean} [requireMaster]
   * @returns {Promise<void>}
   * @memberof Stream
   */
  public async append(
    event: Event | Event[],
    expectedVersion: ExpectedVersion | number | Long = -2,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<void> {
    if (Array.isArray(event)) {
      return await this.appendEvents(event, expectedVersion, requireMaster, credentials)
    } else {
      return await this.appendEvents([event], expectedVersion, requireMaster, credentials)
    }
  }

  /**
   * Hard deletes a stream - stream with same name can not be used in future
   *
   * @param {ExpectedVersion} [expectedVersion=ExpectedVersion.Any]
   * @param {boolean} [requireMaster]
   * @returns {Promise<void>}
   * @memberof Stream
   */
  public async hardDelete(
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean
  ): Promise<void> {
    this.log.debug(`Hard delete Stream ${this.streamId}`)
    await this.delete(true, expectedVersion, requireMaster)
  }

  /**
   * Soft deletes a stream - stream with same name can be used in future and indexes are preserved
   *
   * @param {ExpectedVersion} [expectedVersion=ExpectedVersion.Any]
   * @param {boolean} [requireMaster]
   * @returns {Promise<void>}
   * @memberof Stream
   */
  public async softDelete(
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean
  ): Promise<void> {
    this.log.debug(`Soft delete Stream ${this.streamId}`)
    await this.delete(false, expectedVersion, requireMaster)
  }

  /**
   * Delete a stream - can't be called directly
   * Use {@link <softDelete>} or {@link <hardDelete>} instead
   *
   * @protected
   * @param {boolean} hardDelete
   * @param {ExpectedVersion} [expectedVersion=ExpectedVersion.Any]
   * @param {boolean} [requireMaster]
   * @returns {Promise<void>}
   * @memberof Stream
   */
  protected delete(
    hardDelete: boolean,
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean,
    credentials?: UserCredentials
  ): Promise<void> {
    if (this.isMetaStream()) {
      throw eventstoreError.newBadRequestError(
        `You can not delete metadata stream ${this.streamId}`
      )
    }
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster === undefined ? false : this.options.requireMaster
    }
    return new Promise(
      (resolve, reject): void => {
        const raw = protobuf.DeleteStream.fromObject({
          eventStreamId: this.streamId,
          expectedVersion,
          requireMaster,
          hardDelete
        })
        this.esConnection
          .getConnection()
          .sendCommand(
            uuid(),
            EventstoreCommand.DeleteStream,
            Buffer.from(protobuf.DeleteStream.encode(raw).finish()),
            credentials || this.options.credentials,
            {
              resolve,
              reject
            }
          )
      }
    )
  }

  /**
   * Get event at specified position from stream
   *
   * @param {(Long | number)} eventNumber
   * @param {boolean} [resolveLinks=true]
   * @param {boolean} [requireMaster]
   * @param {UserCredentials} [credentials]
   * @returns {Promise<Event>}
   * @memberof Stream
   */
  public async getEventByNumber(
    eventNumber: Long | number,
    resolveLinks: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials
  ): Promise<Event | null> {
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster === undefined ? false : this.options.requireMaster
    }
    const result: model.eventstore.proto.IResolvedIndexedEvent = await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.ReadEvent.fromObject({
          eventStreamId: this.streamId,
          eventNumber: eventNumber,
          resolveLinkTos: resolveLinks,
          requireMaster: requireMaster
        })
        this.esConnection
          .getConnection()
          .sendCommand(
            uuid(),
            EventstoreCommand.ReadEvent,
            Buffer.from(protobuf.ReadEvent.encode(raw).finish()),
            credentials || this.options.credentials,
            {
              resolve,
              reject
            }
          )
      }
    )

    if (result.event) {
      return Event.fromRaw(result.event)
    } else if (result.link) {
      return Event.fromRaw(result.link)
    }
    return null
  }

  /**
   * Returns first event from stream
   *
   * @param {boolean} [resolveLinks=true]
   * @param {boolean} [requireMaster]
   * @param {UserCredentials} [credentials]
   * @returns {(Promise<Event | null>)}
   * @memberof Stream
   */
  public async getFirstEvent(
    resolveLinks: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials
  ): Promise<Event | null> {
    return await this.getEventByNumber(
      StreamPosition.Start,
      resolveLinks,
      requireMaster,
      credentials
    )
  }

  /**
   * Returns last event from stream
   *
   * @param {boolean} [resolveLinks=true]
   * @param {boolean} [requireMaster]
   * @param {UserCredentials} [credentials]
   * @returns {(Promise<Event | null>)}
   * @memberof Stream
   */
  public async getLastEvent(
    resolveLinks: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials
  ): Promise<Event | null> {
    return await this.getEventByNumber(StreamPosition.End, resolveLinks, requireMaster, credentials)
  }

  /**
   * Returns stream metadata if set or
   *
   * @param {boolean} [requireMaster]
   * @returns {Promise<object>}
   * @memberof Stream
   * @throws {EventstoreBadRequestError}
   */
  public async getMetadata(
    requireMaster?: boolean,
    credentials?: UserCredentials
  ): Promise<
    | {
        $correlationId?: string
        $causationId?: string
      } & {[k: string]: JSONValue}
    | null
  > {
    if (this.isMetaStream()) {
      throw eventstoreError.newBadRequestError(
        `You can not get metadata of metadata stream ${this.streamId}`
      )
    }
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster === undefined ? false : this.options.requireMaster
    }
    try {
      const result = await this.esConnection
        .fromStream(`$$${this.streamId}`, {
          resolveLinks: false,
          requireMaster,
          credentials: credentials || this.options.credentials
        })
        .getLastEvent()

      if (result) {
        result.freeze()
        return {...result.data}
      } else return null
    } catch (err) {
      if (err.name === 'EventstoreNoStreamError') {
        return null
      }
      throw err
    }
  }

  /**
   * Set metadata for stream
   *
   * @param {Object} newMetadata
   * @param {boolean} [requireMaster]
   * @param {(UserCredentials | null)} [credentials]
   * @returns {Promise<void>}
   * @memberof Stream
   * @throws {EventstoreBadRequestError}
   */
  public async setMetadata(
    newMetadata: {},
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<void> {
    if (this.isMetaStream()) {
      throw eventstoreError.newBadRequestError(
        `You can not set metadata for metadata stream ${this.streamId}`
      )
    }
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster
    }
    const newMetaEvent = new Event('$metadata', newMetadata)
    await this.append(
      newMetaEvent,
      ExpectedVersion.Any,
      requireMaster,
      credentials || this.options.credentials
    )
  }

  /**
   * Creates a new instance of {Transaction} for current stream
   *
   * @param {ExpectedVersion} [expectedVersion=ExpectedVersion.Any]
   * @param {boolean} [requireMaster]
   * @param {(UserCredentials | null)} [credentials]
   * @returns {Promise<Transaction>}
   * @memberof Stream
   */
  public async startTransaction(
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<Transaction> {
    if (this.isMetaStream()) {
      throw eventstoreError.newBadRequestError(
        `Transactions fpr metadata stream ${this.streamId} not supported`
      )
    }
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster === undefined ? false : this.options.requireMaster
    }
    const transactionId: Long = await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.TransactionStart.fromObject({
          eventStreamId: this.streamId,
          expectedVersion: expectedVersion,
          requireMaster
        })
        this.esConnection
          .getConnection()
          .sendCommand(
            uuid(),
            EventstoreCommand.TransactionStart,
            Buffer.from(protobuf.TransactionStart.encode(raw).finish()),
            credentials || this.options.credentials,
            {
              resolve,
              reject
            }
          )
      }
    )

    return new Transaction(this, transactionId, this.esConnection, requireMaster, credentials)
  }

  /**
   * Reads a slice from current stream in given direction starting at given position
   *
   * @protected
   * @param {EventstoreCommand} direction - read direction forward/backward
   * @param {(number | Long)} [fromEventNumber=0] - read start position
   * @param {number} [maxCount=100] - maximum count of events to read
   * @param {boolean} [resolveLinkTos=true] - resolve event links
   * @param {boolean} [requireMaster]
   * @param {(UserCredentials | null)} [credentials]
   * @returns {Promise<model.eventstore.proto.ReadStreamEventsCompleted>}
   * @memberof Stream
   */
  protected async readSlice(
    direction: EventstoreCommand,
    fromEventNumber: number | Long = 0,
    maxCount: number = 100,
    resolveLinkTos: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadStreamEventsCompleted> {
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster === undefined ? false : this.options.requireMaster
    }
    return await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.ReadStreamEvents.fromObject({
          eventStreamId: this.streamId,
          fromEventNumber,
          maxCount,
          resolveLinkTos,
          requireMaster
        })
        this.esConnection
          .getConnection()
          .sendCommand(
            uuid(),
            direction,
            Buffer.from(protobuf.ReadStreamEvents.encode(raw).finish()),
            credentials || this.options.credentials,
            {
              resolve,
              reject
            }
          )
      }
    )
  }

  /**
   * Read a slice from stream in forward direction starting at given position
   *
   * @param {(number | Long)} [fromEventNumber=0] - read start position
   * @param {number} [maxCount=100] - maximum count of events to read
   * @param {boolean} [resolveLinkTos=true] - resolve event links
   * @param {boolean} [requireMaster]
   * @param {(UserCredentials | null)} [credentials]
   * @returns {Promise<model.eventstore.proto.ReadStreamEventsCompleted>}
   * @memberof Stream
   */
  public async readSliceForward(
    fromEventNumber: number | Long = StreamPosition.Start,
    maxCount: number = 100,
    resolveLinkTos: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadStreamEventsCompleted> {
    return await this.readSlice(
      EventstoreCommand.ReadStreamEventsForward,
      fromEventNumber,
      maxCount,
      resolveLinkTos,
      requireMaster,
      credentials
    )
  }

  /**
   * Read a slice from stream in backward direction starting at given position
   *
   * @param {(number | Long)} [fromEventNumber=-1] - read start position
   * @param {number} [maxCount=100] - maximum count of events to read
   * @param {boolean} [resolveLinkTos=true] - resolve event links
   * @param {boolean} [requireMaster]
   * @param {(UserCredentials | null)} [credentials]
   * @returns {Promise<model.eventstore.proto.ReadStreamEventsCompleted>}
   * @memberof Stream
   */
  public async readSliceBackward(
    fromEventNumber: number | Long = StreamPosition.End,
    maxCount: number = 100,
    resolveLinkTos: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadStreamEventsCompleted> {
    return await this.readSlice(
      EventstoreCommand.ReadStreamEventsBackward,
      fromEventNumber,
      maxCount,
      resolveLinkTos,
      requireMaster,
      credentials
    )
  }

  /**
   * Subscribe to current stream and return a subscription
   *
   * @param {boolean} [resolveLinkTos=true]
   * @param {(UserCredentials | null)} [credentials]
   * @returns {Promise<Subscription>}
   * @memberof Stream
   */
  public async subscribe(
    resolveLinkTos: boolean = true,
    credentials?: UserCredentials | null
  ): Promise<Subscription> {
    return await this.esConnection
      .getConnection()
      .subscribeToStream(this, resolveLinkTos, credentials || this.options.credentials || null)
  }

  public async aggregate<T>(initState: T): Promise<T> {
    return initState
  }

  public async getFirstEventOf(): Promise<Event | null> {
    return new Event(this.streamId)
  }

  public async getLastEventOf(): Promise<Event | null> {
    return new Event(this.streamId)
  }

  public async catchupSubscribe(): Promise<void> {
    return
  }
}
