import {Eventstore} from '../eventstore'
import {Event} from '../event'
import uuid = require('uuid/v4')
import * as bunyan from 'bunyan'
import * as model from '../protobuf/model'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import {ExpectedVersion} from '../protobuf/ExpectedVersion'
import {Transaction} from './Transaction'
import * as eventstoreError from '../errors'

const protobuf = model.eventstore.proto

export interface StreamOptions {
  requireMaster?: boolean
  resolveLinks?: boolean
  credentials?: {
    username: string
    password: string
  }
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
    expectedVersion?: ExpectedVersion | number | Long,
    requireMaster?: boolean
  ): Promise<void> {
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
      expectedVersion: expectedVersion !== undefined ? expectedVersion : ExpectedVersion.Any,
      events: eventArrayTransformed,
      requireMaster: requireMaster !== undefined ? requireMaster : this.options.requireMaster
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
            this.options.credentials,
            {
              resolve: setToWritten,
              reject
            }
          )
      }
    )
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
    expectedVersion?: ExpectedVersion | number | Long,
    requireMaster?: boolean
  ): Promise<void> {
    if (Array.isArray(event)) {
      return await this.appendEvents(event, expectedVersion, requireMaster)
    } else {
      return await this.appendEvents([event], expectedVersion, requireMaster)
    }
  }

  public async subscribe(): Promise<void> {
    return
  }

  public async catchupSubscribe(): Promise<void> {
    return
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
    requireMaster?: boolean
  ): Promise<void> {
    if (!requireMaster) {
      requireMaster = this.options.requireMaster
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
            this.options.credentials,
            {
              resolve,
              reject
            }
          )
      }
    )
  }

  public async getEventByNumber(
    eventNumber: Long | number,
    resolveLinks: boolean,
    requireMaster?: boolean
  ): Promise<Event> {
    if (!requireMaster) {
      requireMaster = this.options.requireMaster
    }
    const result: model.eventstore.proto.IResolvedIndexedEvent = await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.ReadEvent.fromObject({
          eventStreamId: this.name,
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
            this.options.credentials,
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
    throw eventstoreError.newProtocolError('Result does not contain event or link')
  }

  public async startTransaction(): Promise<Transaction> {
    return new Transaction(this, 'someid')
  }

  public async getMetadata(): Promise<object> {
    return {}
  }

  public async setMetadata(newMetadata: object): Promise<object> {
    return {...newMetadata}
  }

  public async aggregate<T>(initState: T): Promise<T> {
    return initState
  }

  public async getFirstEvent(): Promise<Event | null> {
    return new Event(this.streamId)
  }

  public async getLastEvent(): Promise<Event | null> {
    return new Event(this.streamId)
  }

  public async getFirstEventOf(): Promise<Event | null> {
    return new Event(this.streamId)
  }

  public async getLastEventOf(): Promise<Event | null> {
    return new Event(this.streamId)
  }

  public get name(): string {
    return this.streamId
  }
}
