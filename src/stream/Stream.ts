import {Eventstore} from '../eventstore'
import {Event} from '../event'
import uuid = require('uuid/v4')
import * as bunyan from 'bunyan'
import * as model from '../protobuf/model'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import {ExpectedVersion} from '../protobuf/ExpectedVersion'

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
  protected streamName: string
  protected options: StreamOptions

  public constructor(eventstore: Eventstore, streamName: string, options: StreamOptions) {
    this.esConnection = eventstore
    this.streamName = streamName
    this.log = this.esConnection.logger.child
      ? this.esConnection.logger.child({module: 'Stream'})
      : this.esConnection.logger

    this.options = options
  }

  public get logger(): bunyan {
    return this.log
  }

  public async emit(event: Event | Event[]): Promise<void> {
    if (Array.isArray(event)) {
      return this.emitEvents(event)
    } else {
      return this.emitEvent(event)
    }
  }

  public async emitEvent(event: Event): Promise<void> {
    return
  }

  public async emitEvents(events: Event[]): Promise<void> {
    return
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
    this.log.debug(`Hard delete Stream ${this.streamName}`)
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
  public async softDelete(
    expectedVersion: ExpectedVersion = ExpectedVersion.Any,
    requireMaster?: boolean
  ): Promise<void> {
    this.log.debug(`Soft delete Stream ${this.streamName}`)
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
    return new Promise((resolve, reject) => {
      const raw = protobuf.DeleteStream.fromObject({
        eventStreamId: this.streamName,
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

  public async startTransaction(): Promise<void> {
    return
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
    return new Event()
  }

  public async getLastEvent(): Promise<Event | null> {
    return new Event()
  }

  public async getFirstEventOf(): Promise<Event | null> {
    return new Event()
  }

  public async getLastEventOf(): Promise<Event | null> {
    return new Event()
  }
}
