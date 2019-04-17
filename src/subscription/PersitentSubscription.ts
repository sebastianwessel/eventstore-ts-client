import {Stream} from '../stream'
import {UserCredentials, Eventstore} from '../eventstore'
import {EventEmitter} from 'events'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import * as model from '../protobuf/model'
import uuid = require('uuid/v4')
import {PersitentSubscriptionConfig, setPersitentSubscriptionConfig} from '../subscription'
import Long from 'long'
import * as eventstoreError from '../errors'

const protobuf = model.eventstore.proto

export enum PersitentSubscriptionStatus {
  disconnected,
  catchup,
  live,
  paused
}

/**
 * Represents a persistent subscription
 *
 * @export
 * @class PersitentSubscription
 * @extends {EventEmitter}
 */
export class PersitentSubscription extends EventEmitter {
  /** corresponding stream  */
  public stream: Stream
  /** connection to use */
  protected esConnection: Eventstore
  /** name of subscription */
  public subscriptionGroupName: string
  /** user credentials */
  protected credentials: UserCredentials | null = null

  public lastCommitPosition: Long = Long.fromNumber(0)
  public lastEventNumber: Long | null = null

  public subsciptionId: string = uuid()

  public allowInflightMessages: boolean = false

  protected status: PersitentSubscriptionStatus = PersitentSubscriptionStatus.disconnected

  /**
   * Creates an instance of persitent subscription.
   * @param stream
   * @param esConnection
   * @param subscriptionGroupName
   */
  public constructor(
    stream: Stream,
    esConnection: Eventstore,
    credentials: UserCredentials | null,
    subscriptionGroupName: string
  ) {
    super()
    this.stream = stream
    this.esConnection = esConnection
    this.subscriptionGroupName = subscriptionGroupName
    this.credentials = credentials
  }

  public get state(): PersitentSubscriptionStatus {
    return this.status
  }

  public set state(newStatus: PersitentSubscriptionStatus) {
    this.emit(PersitentSubscriptionStatus[newStatus])
    this.status = newStatus
  }

  /**
   * Connects persitent subscription
   * @param [credentials]
   * @returns connect
   */
  public async connect(
    allowInflightMessages: boolean = false,
    credentials?: UserCredentials | null
  ): Promise<void> {
    this.allowInflightMessages = allowInflightMessages
    if (credentials) {
      this.credentials = credentials
    }
    await this.esConnection
      .getConnection()
      .connectToPersitentSubscription(this, allowInflightMessages, credentials)
    this.catchUp()
  }

  protected async catchUp(): Promise<void> {
    this.state = PersitentSubscriptionStatus.catchup
  }

  public async pause(): Promise<void> {
    if (this.state !== PersitentSubscriptionStatus.live || PersitentSubscriptionStatus.catchup) {
      throw eventstoreError.newBadRequestError(
        `Subscription ${this.subscriptionGroupName} on stream ${this.stream.id} is ${
          PersitentSubscriptionStatus[this.state]
        }`
      )
    }
    this.state = PersitentSubscriptionStatus.paused
  }

  public async resume(): Promise<void> {
    if (this.state !== PersitentSubscriptionStatus.paused) {
      throw eventstoreError.newBadRequestError(
        `Subscription ${this.subscriptionGroupName} on stream ${this.stream.id} not paused`
      )
    }
    return await this.connect(this.allowInflightMessages, this.credentials)
  }

  /**
   * Deletes persitent subscription
   * @param [credentials]
   * @returns delete
   */
  public async delete(credentials?: UserCredentials | null): Promise<PersitentSubscription> {
    return await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.UpdatePersistentSubscription.fromObject({
          subscriptionGroupName: this.subscriptionGroupName,
          eventStreamId: this.stream.id
        })
        this.esConnection
          .getConnection()
          .sendCommand(
            uuid(),
            EventstoreCommand.DeletePersistentSubscription,
            Buffer.from(protobuf.DeletePersistentSubscription.encode(raw).finish()),
            credentials || this.credentials,
            {
              resolve,
              reject
            }
          )
      }
    )
  }

  /**
   * Updates persitent subscription
   * @param [credentials]
   * @returns update
   */
  public async update(
    customConfig: PersitentSubscriptionConfig | {} = {},
    credentials?: UserCredentials | null
  ): Promise<PersitentSubscription> {
    const settings = setPersitentSubscriptionConfig(customConfig)

    return await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.UpdatePersistentSubscription.fromObject({
          subscriptionGroupName: this.subscriptionGroupName,
          eventStreamId: this.stream.id,
          ...settings
        })
        this.esConnection
          .getConnection()
          .sendCommand(
            uuid(),
            EventstoreCommand.UpdatePersistentSubscription,
            Buffer.from(protobuf.UpdatePersistentSubscription.encode(raw).finish()),
            credentials || this.credentials,
            {
              resolve,
              reject
            }
          )
      }
    )
  }
}
