import {Eventstore, WriteResult, Position} from '../eventstore'
import {Event} from '../event'
import uuid = require('uuid/v4')
import * as bunyan from 'bunyan'
import * as model from '../protobuf/model'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import {ExpectedVersion} from '../protobuf/ExpectedVersion'
import {StreamPosition} from './StreamPosition'
import {Transaction} from './Transaction'
import {
  Subscription,
  PersistentSubscriptionConfig,
  setPersistentSubscriptionConfig,
  PersistentSubscription
} from '../subscription'
import * as eventstoreError from '../errors'
import {UserCredentials} from '../eventstore/EventstoreSettings'
import Long = require('long')
import {JSONValue} from '../JSON'
import {StreamWalker} from '../StreamWalker'

/** protobuf shorthand */
const protobuf = model.eventstore.proto

/**
 * @typedef {object} StreamOptions
 * @property {boolean} requireMaster indicates if operations require master node
 * @property {boolean} resolveLinks indicates if event links should be resolved on read operations
 * @property {UserCredentials | null} credentials user credentials if others than default connection credentials
 */
export interface StreamOptions {
  requireMaster: boolean
  resolveLinks: boolean
  credentials: UserCredentials | null
}

/**
 * Base class for handling a stream
 */
export class Stream {
  /** eventstore instance */
  protected esConnection: Eventstore
  /** bunyan logger */
  public log: bunyan
  /** id of stream */
  protected streamId: string
  /** stream options */
  protected options: StreamOptions

  /**
   * Creates an instance of Stream.
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
   */
  public get name(): string {
    return 'Stream: ' + this.streamId
  }

  /**
   * Gets id  of stream
   */
  public get id(): string {
    return this.streamId
  }

  /**
   * Enforces to use master node for any read/write operation
   */
  public requiresMaster(): Stream {
    this.options.requireMaster = true
    return this
  }

  /**
   * Set credentials for any read/write operation
   */
  public withCredentials(credentials: UserCredentials): Stream {
    this.options.credentials = credentials
    return this
  }

  /**
   * Enforce to resolve links on read operations
   */
  public resolveAllLinks(): Stream {
    this.options.resolveLinks = true
    return this
  }

  /**
   * Appends array of events to stream
   */
  protected appendEvents(
    events: Event[],
    expectedVersion: ExpectedVersion | number | Long = -2,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<WriteResult> {
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster
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
      requireMaster: requireMaster === undefined ? this.options.requireMaster : requireMaster
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
   * Indicates if given stream is a metadata stream or a regular steam
   */
  public isMetaStream(): boolean {
    return this.streamId.startsWith('$$')
  }

  /**
   * Append single event or array of events to stream
   */
  public async append(
    event: Event | Event[],
    expectedVersion: ExpectedVersion | number | Long = -2,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<WriteResult> {
    if (Array.isArray(event)) {
      return await this.appendEvents(event, expectedVersion, requireMaster, credentials)
    } else {
      return await this.appendEvents([event], expectedVersion, requireMaster, credentials)
    }
  }

  /**
   * Hard deletes a stream - stream with same name can not be used in future
   */
  public async hardDelete(
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean
  ): Promise<Position> {
    this.log.debug(
      {fn: 'hardDelete', streamId: this.streamId},
      `Hard delete Stream ${this.streamId}`
    )
    return await this.delete(true, expectedVersion, requireMaster)
  }

  /**
   * Soft deletes a stream - stream with same name can be used in future and indexes are preserved
   */
  public async softDelete(
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean
  ): Promise<Position> {
    this.log.debug(
      {fn: 'softDelete', streamId: this.streamId},
      `Soft delete Stream ${this.streamId}`
    )
    return await this.delete(false, expectedVersion, requireMaster)
  }

  /**
   * Delete a stream - can't be called directly
   * Use softDelete or hardDelete instead
   */
  protected delete(
    hardDelete: boolean,
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean,
    credentials?: UserCredentials
  ): Promise<Position> {
    if (this.isMetaStream()) {
      throw eventstoreError.newBadRequestError(
        `You can not delete metadata stream ${this.streamId}`
      )
    }
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster
    }
    return new Promise(
      (resolve, reject): void => {
        const raw = protobuf.DeleteStream.fromObject({
          eventStreamId: this.streamId,
          expectedVersion,
          requireMaster: requireMaster === undefined ? this.requiresMaster : requireMaster,
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
   */
  public async getEventByNumber(
    eventNumber: Long | number,
    resolveLinks?: boolean,
    requireMaster?: boolean,
    credentials?: UserCredentials
  ): Promise<Event | null> {
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster
    }
    const result: model.eventstore.proto.IResolvedIndexedEvent = await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.ReadEvent.fromObject({
          eventStreamId: this.streamId,
          eventNumber: eventNumber,
          resolveLinkTos: resolveLinks === undefined ? this.options.resolveLinks : resolveLinks,
          requireMaster: requireMaster === undefined ? this.options.requireMaster : requireMaster
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
    if (!result.event && !result.link) {
      return null
    }

    return Event.fromRaw(result.event || result.link)
  }

  /**
   * Returns first event from stream
   */
  public async getFirstEvent(
    resolveLinks?: boolean,
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
   */
  public async getLastEvent(
    resolveLinks?: boolean,
    requireMaster?: boolean,
    credentials?: UserCredentials
  ): Promise<Event | null> {
    return await this.getEventByNumber(StreamPosition.End, resolveLinks, requireMaster, credentials)
  }

  /**
   * Returns stream metadata if set or
   */
  public async getMetadata(
    requireMaster?: boolean,
    credentials?: UserCredentials
  ): Promise<
    | {
        $correlationId?: string
      } & {[k: string]: JSONValue}
    | null
  > {
    if (this.isMetaStream()) {
      throw eventstoreError.newBadRequestError(
        `You can not get metadata of metadata stream ${this.streamId}`
      )
    }
    try {
      const metadataEvent = await this.esConnection
        .fromStream(`$$${this.streamId}`, {
          resolveLinks: true,
          requireMaster: requireMaster === undefined ? this.options.requireMaster : requireMaster,
          credentials: credentials || this.options.credentials
        })
        .getLastEvent()

      if (metadataEvent) {
        metadataEvent.freeze()
        // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
        return {...(<object>metadataEvent.data)}
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
    const newMetaEvent = new Event('$metadata', newMetadata)
    await this.esConnection
      .fromStream(`$$${this.streamId}`, {
        resolveLinks: false,
        requireMaster: requireMaster === undefined ? this.options.requireMaster : requireMaster,
        credentials: credentials || this.options.credentials
      })
      .append(
        newMetaEvent,
        ExpectedVersion.Any,
        requireMaster,
        credentials || this.options.credentials
      )
  }

  /**
   * Creates a new instance of {Transaction} for current stream
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
    const transactionId: Long = await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.TransactionStart.fromObject({
          eventStreamId: this.streamId,
          expectedVersion: expectedVersion,
          requireMaster: requireMaster === undefined ? this.options.requireMaster : requireMaster
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

    return new Transaction(
      this,
      transactionId,
      this.esConnection,
      requireMaster === undefined ? this.options.requireMaster : requireMaster,
      credentials
    )
  }

  /**
   * Reads a slice from current stream in given direction starting at given position
   */
  protected async readSlice(
    direction: EventstoreCommand,
    fromEventNumber: number | Long = 0,
    maxCount: number = 100,
    resolveLinks?: boolean,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadStreamEventsCompleted> {
    return await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.ReadStreamEvents.fromObject({
          eventStreamId: this.streamId,
          fromEventNumber,
          maxCount,
          resolveLinkTos: resolveLinks === undefined ? this.options.resolveLinks : resolveLinks,
          requireMaster: requireMaster === undefined ? this.options.requireMaster : requireMaster
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
   */
  public async readSliceForward(
    fromEventNumber: number | Long = StreamPosition.Start,
    maxCount: number = 100,
    resolveLinks: boolean,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadStreamEventsCompleted> {
    return await this.readSlice(
      EventstoreCommand.ReadStreamEventsForward,
      fromEventNumber,
      maxCount,
      resolveLinks,
      requireMaster,
      credentials
    )
  }

  /**
   * Read a slice from stream in backward direction starting at given position
   */
  public async readSliceBackward(
    fromEventNumber: number | Long = StreamPosition.End,
    maxCount: number = 100,
    resolveLinks: boolean,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadStreamEventsCompleted> {
    return await this.readSlice(
      EventstoreCommand.ReadStreamEventsBackward,
      fromEventNumber,
      maxCount,
      resolveLinks,
      requireMaster,
      credentials
    )
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected async walkStream(
    forward: boolean = true,
    start: Long | number = StreamPosition.Start,
    maxCount: number = 100,
    resolveLinks?: boolean,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ) {
    const that = this
    const resolveLinksTos = resolveLinks === undefined ? this.options.resolveLinks : resolveLinks
    const getSlice = forward ? 'readSliceForward' : 'readSliceBackward'
    if (requireMaster === undefined) {
      requireMaster = this.options.requireMaster
    }
    if (credentials === undefined) {
      credentials = this.options.credentials
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const asyncGenerator = async function*(begin: Long | number) {
      let index = 0
      //fetch first slice
      let readResult = that[getSlice](begin, maxCount, resolveLinksTos, requireMaster, credentials)
      let result = await readResult
      if (!result.isEndOfStream) {
        //we have more so start fetching in background
        begin = result.nextEventNumber
        readResult = that[getSlice](begin, maxCount, resolveLinksTos, requireMaster, credentials)
      }
      while (true) {
        if (index < result.events.length) {
          const entry = result.events[index++]
          yield Event.fromRaw(entry.event || entry.link)
        } else if (result.isEndOfStream) {
          return null
        } else {
          index = 0
          //wait for background fetch and grab result
          result = await readResult
          if (!result.isEndOfStream) {
            //if there are more events start fetching in background
            begin = result.nextEventNumber
            readResult = that[getSlice](
              begin,
              maxCount,
              resolveLinksTos,
              requireMaster,
              credentials
            )
          }
        }
      }
    }

    return new StreamWalker(asyncGenerator(start))
  }

  /**
   * Walk through all events in stream forward
   */
  public async walkStreamForward(
    start: Long | number = StreamPosition.Start,
    maxCount: number = 100,
    resolveLinkTos?: boolean,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<StreamWalker> {
    return await this.walkStream(true, start, maxCount, resolveLinkTos, requireMaster, credentials)
  }

  /**
   * Walk through all events in stream backward
   */
  public async walkStreamBackward(
    start: Long | number = StreamPosition.End,
    maxCount: number = 100,
    resolveLinkTos?: boolean,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<StreamWalker> {
    return await this.walkStream(false, start, maxCount, resolveLinkTos, requireMaster, credentials)
  }

  /**
   * Subscribe to current stream and return a subscription
   */
  public async subscribe(
    resolveLinkTos?: boolean,
    credentials?: UserCredentials | null
  ): Promise<Subscription> {
    return await this.esConnection
      .getConnection()
      .subscribeToStream(this, resolveLinkTos, credentials || this.options.credentials || null)
  }

  /**
   * Creates a persistent subscription for current stream
   * This operation needs admin rights and a master connection
   */
  public async createPersistentSubscription(
    subscriptionGroupName: string,
    customConfig: PersistentSubscriptionConfig | {} = {},
    credentials?: UserCredentials | null
  ): Promise<PersistentSubscription> {
    const settings = setPersistentSubscriptionConfig(customConfig)

    await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.CreatePersistentSubscription.fromObject({
          subscriptionGroupName,
          eventStreamId: this.id,
          ...settings
        })
        this.esConnection
          .getConnection()
          .sendCommand(
            uuid(),
            EventstoreCommand.CreatePersistentSubscription,
            Buffer.from(protobuf.CreatePersistentSubscription.encode(raw).finish()),
            credentials || this.options.credentials,
            {
              resolve,
              reject
            }
          )
      }
    )
    return new PersistentSubscription(
      this,
      this.esConnection,
      this.options.credentials,
      subscriptionGroupName
    )
  }

  /**
   * Returns a instance of persistance subscription given by group name
   */
  public getPersistentSubscription(
    subscriptionGroupName: string,
    credentials?: UserCredentials | null
  ): PersistentSubscription {
    return new PersistentSubscription(
      this,
      this.esConnection,
      credentials || this.options.credentials,
      subscriptionGroupName
    )
  }
}
