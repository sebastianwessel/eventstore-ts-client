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
 */
export class Transaction {
  /** id of transaction */
  protected transactionId: Long
  /** corresponding stream */
  protected stream: Stream
  /** current connection */
  protected esConnection: Eventstore
  /** indicates if transaction is committed */
  protected committed: boolean = false
  /** indicates if transaction is rolled back */
  protected rolledBack: boolean = false
  /** indicates if transaction needs master node */
  protected requireMaster: boolean
  /** credentials for transaction */
  protected credentials: UserCredentials | null = null

  /**
   *  Creates an instance of Transaction.
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

  /**
   * Gets whether is committed
   */
  public get isCommitted(): boolean {
    return this.committed
  }

  /**
   * Gets whether is rolled back
   */
  public get isRolledBack(): boolean {
    return this.rolledBack
  }

  /**
   * Appends single event or array of events to transaction
   */
  public async append(
    event: Event | Event[],
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<void> {
    if (Array.isArray(event)) {
      return await this.appendEvents(event, requireMaster, credentials)
    } else {
      return await this.appendEvents([event], requireMaster, credentials)
    }
  }

  /**
   * Appends array of evens to transaction
   */
  protected async appendEvents(
    events: Event[],
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<void> {
    if (this.isCommitted) {
      throw eventstoreError.newInvalidTransactionError(
        `Transaction ${this.transactionId} is already committed`
      )
    }
    if (this.isRolledBack) {
      throw eventstoreError.newInvalidTransactionError(
        `Transaction ${this.transactionId} is already rolled back`
      )
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
  }

  /**
   * Commits transaction
   */
  public async commit(
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<void> {
    if (this.isCommitted) {
      throw eventstoreError.newInvalidTransactionError(
        `Transaction ${this.transactionId} is already committed`
      )
    }
    if (this.isRolledBack) {
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
          this.committed = true
          this.rolledBack = true
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
    this.committed = true
  }

  /**
   * Roles back transaction
   */
  public roleBack(): void {
    this.rolledBack = true
  }

  /**
   * Gets transaction id
   */
  public get id(): Long {
    return this.transactionId
  }

  /**
   * Gets transaction name
   */
  public get name(): string {
    return 'Transaction: ' + this.transactionId
  }
}
