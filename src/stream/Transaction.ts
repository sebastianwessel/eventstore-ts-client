import {Stream} from './Stream'
import {Event} from '../event'
import uuid = require('uuid/v4')
import * as model from '../protobuf/model'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import * as eventstoreError from '../errors'
import {UserCredentials} from '../eventstore/EventstoreSettings'
import {Eventstore} from '../eventstore'

const protobuf = model.eventstore.proto

/**
 * Base class for handling transaction writes to stream
 *
 * @export
 * @class Transaction
 */
export class Transaction {
  protected transactionId: Long
  protected stream: Stream
  protected esConnection: Eventstore
  protected commited: boolean = false
  protected roledBack: boolean = false
  protected requireMaster: boolean
  protected credentials: UserCredentials | null = null

  /**
   *  Creates an instance of Transaction.
   * @param {Stream} stream
   * @param {string} transactionId
   * @memberof Transaction
   */
  public constructor(
    stream: Stream,
    transactionId: Long,
    esConnection: Eventstore,
    requireMaster: boolean,
    credentials: UserCredentials | null = null
  ) {
    this.stream = stream
    this.transactionId = transactionId
    this.esConnection = esConnection
    this.requireMaster = requireMaster
    this.credentials = credentials
  }

  public get isCommited(): boolean {
    return this.commited
  }

  public get isRoledBack(): boolean {
    return this.roledBack
  }

  public async append(
    event: Event | Event[],
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<Transaction> {
    if (Array.isArray(event)) {
      return await this.appendEvents(event, requireMaster, credentials)
    } else {
      return await this.appendEvents([event], requireMaster, credentials)
    }
  }

  protected async appendEvents(
    events: Event[],
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<Transaction> {
    if (this.isCommited) {
      throw eventstoreError.newInvalidTransactionError(
        `Transaction ${this.transactionId} is already committed`
      )
    }
    if (this.isRoledBack) {
      throw eventstoreError.newInvalidTransactionError(
        `Transaction ${this.transactionId} is already roled back`
      )
    }
    if (!this.esConnection || !this.esConnection.isConnected) {
      throw eventstoreError.newConnectionError('No valid eventstore connection provided')
    }
    if (requireMaster === undefined) {
      requireMaster = this.requireMaster
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
    const raw = protobuf.TransactionWrite.fromObject({
      transactionId: this.transactionId,
      events: eventArrayTransformed,
      requireMaster: requireMaster
    })
    raw.transactionId = this.transactionId
    await new Promise(
      (resolve, reject): void => {
        const setToWritten = (id: Long): void => {
          events.forEach((event): void => event.freeze())
          resolve(id)
        }
        this.esConnection
          .getConnection()
          .sendCommand(
            uuid(),
            EventstoreCommand.TransactionWrite,
            Buffer.from(protobuf.TransactionWrite.encode(raw).finish()),
            credentials || this.credentials,
            {
              resolve: setToWritten,
              reject
            }
          )
      }
    )
    return this
  }

  public async commit(
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<void> {
    if (this.isCommited) {
      throw eventstoreError.newInvalidTransactionError(
        `Transaction ${this.transactionId} is already committed`
      )
    }
    if (this.isRoledBack) {
      throw eventstoreError.newInvalidTransactionError(
        `Transaction ${this.transactionId} is already roled back`
      )
    }
    if (requireMaster === undefined) {
      requireMaster = this.requireMaster
    }
    await new Promise(
      (resolve, reject): void => {
        const rejectFunction = (err: Error): void => {
          this.commited = true
          this.roledBack = true
          reject(err)
        }
        const raw = protobuf.TransactionCommit.fromObject({
          transactionId: this.transactionId,
          requireMaster: requireMaster
        })
        this.esConnection
          .getConnection()
          .sendCommand(
            uuid(),
            EventstoreCommand.TransactionCommit,
            Buffer.from(protobuf.TransactionCommit.encode(raw).finish()),
            credentials || this.credentials,
            {
              resolve,
              reject: rejectFunction
            }
          )
      }
    )
    this.commited = true
  }

  public roleBack(): void {
    this.roledBack = true
  }

  public get id(): Long {
    return this.transactionId
  }

  public get name(): string {
    return 'Transaction: ' + this.transactionId
  }
}
