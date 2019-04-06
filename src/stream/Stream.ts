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
export class Stream {
  protected esConnection: Eventstore
  public log: bunyan
  protected streamId: string
  protected options: StreamOptions

  public constructor(eventstore: Eventstore, streamId: string, options: StreamOptions) {
    this.esConnection = eventstore
    this.streamId = streamId
    this.log = this.esConnection.logger.child
      ? this.esConnection.logger.child({module: 'Stream'})
      : this.esConnection.logger

    this.options = options
  }

  public get logger(): bunyan {
    return this.log
  }

  public async append(
    event: Event | Event[],
    expectedVersion?: ExpectedVersion | number | Long,
    requireMaster?: boolean
  ): Promise<void> {
    if (Array.isArray(event)) {
      return this.appendEvents(event, expectedVersion, requireMaster)
    } else {
      return this.appendEvents([event], expectedVersion, requireMaster)
    }
  }

  protected async appendEvents(
    events: Event[],
    expectedVersion?: ExpectedVersion | number | Long,
    requireMaster?: boolean
  ): Promise<void> {
    const eventArrayTransformed: model.eventstore.proto.NewEvent[] = events.map((event) => {
      if (!event.isNew) {
        throw eventstoreError.newEventstoreOperationError(
          `Event ${event.name} is already stored in eventstore`
        )
      }
      return event.toRaw()
    })

    const raw = protobuf.WriteEvents.fromObject({
      eventStreamId: this.streamId,
      expectedVersion: expectedVersion !== undefined ? expectedVersion : ExpectedVersion.Any,
      events: eventArrayTransformed,
      requireMaster: requireMaster !== undefined ? requireMaster : this.options.requireMaster
    })
    await new Promise((resolve, reject) => {
      const setToWritten = (): void => {
        events.map((event) => (event.isNew = false))
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
    })
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
  public hardDelete(
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean
  ): Promise<void> {
    this.log.debug(`Hard delete Stream ${this.streamId}`)
    return this.delete(true, expectedVersion, requireMaster)
  }

  /**
   * Soft deletes a stream - stream with same name can be used in future and indexes are preserved
   *
   * @param {ExpectedVersion} [expectedVersion=ExpectedVersion.Any]
   * @param {boolean} [requireMaster]
   * @returns {Promise<void>}
   * @memberof Stream
   */
  public softDelete(
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean
  ): Promise<void> {
    this.log.debug(`Soft delete Stream ${this.streamId}`)
    return this.delete(false, expectedVersion, requireMaster)
  }

  /**
   * Delete a stream - can't be called directly
   * Use softDelete() or hardDelete() instead
   *
   * @protected
   * @param {boolean} hardDelete
   * @param {ExpectedVersion} [expectedVersion=ExpectedVersion.Any]
   * @param {boolean} [requireMaster]
   * @returns {Promise<void>}
   * @memberof Stream
   */
  protected async delete(
    hardDelete: boolean,
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean
  ): Promise<void> {
    if (!requireMaster) {
      requireMaster = this.options.requireMaster
    }
    await new Promise((resolve, reject) => {
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
    })
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
