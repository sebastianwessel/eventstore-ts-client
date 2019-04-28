import {Stream} from '../stream'
import {UserCredentials, Eventstore} from '../eventstore'
import {EventEmitter} from 'events'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import * as model from '../protobuf/model'
import uuid = require('uuid/v4')
import {PersistentSubscriptionConfig, setPersistentSubscriptionConfig, SubscriptionStatus} from '.'
import Long from 'long'
import {Event} from '../event'
import {uuidToBuffer} from '../protobuf/uuidBufferConvert'

const protobuf = model.eventstore.proto

/**
 * Represents a persistent subscription
 */
export class PersistentSubscription extends EventEmitter {
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

  public id: string = uuid()

  public subscriptionId: string

  public allowedInFlightMessages: number = 10

  protected status: SubscriptionStatus = SubscriptionStatus.disconnected

  public autoAcknowledge: boolean = true

  /**
   * Creates an instance of persistent subscription.
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

    this.subscriptionId = `${this.stream.id} :: ${this.subscriptionGroupName}`

    this.on(
      'dropped',
      (): void => {
        this.state = SubscriptionStatus.disconnected
      }
    )
  }

  /**
   * Gets name
   */
  public get name(): string {
    return `PersistentSubscription: ${this.stream.id} :: ${this.subscriptionGroupName}`
  }

  /**
   * Gets state
   */
  public get state(): SubscriptionStatus {
    return this.status
  }

  /**
   * Sets state
   */
  public set state(newStatus: SubscriptionStatus) {
    this.emit(SubscriptionStatus[newStatus])
    this.status = newStatus
  }

  /**
   * Connects persistent subscription
   */
  public async subscribe(
    allowedInFlightMessages: number = 10,
    credentials?: UserCredentials | null
  ): Promise<PersistentSubscription> {
    this.allowedInFlightMessages = allowedInFlightMessages
    if (credentials) {
      this.credentials = credentials
    }
    const result = await this.esConnection
      .getConnection()
      .connectToPersistentSubscription(this, allowedInFlightMessages, this.credentials)
    this.subscriptionId = result.subscriptionId
    this.state = SubscriptionStatus.connected
    return this
  }

  /**
   * Unsubscribe from stream
   */
  public async unsubscribe(credentials?: UserCredentials | null): Promise<void> {
    await this.esConnection
      .getConnection()
      .unsubscribeFromPersistentSubscription(this.id, credentials || this.credentials)
  }

  /**
   * Deletes persistent subscription
   */
  public async delete(credentials?: UserCredentials | null): Promise<PersistentSubscription> {
    const result: PersistentSubscription = await new Promise(
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
    this.state = SubscriptionStatus.disconnected
    return result
  }

  /**
   * Updates persistent subscription
   */
  public async update(
    customConfig: PersistentSubscriptionConfig | {} = {},
    credentials?: UserCredentials | null
  ): Promise<PersistentSubscription> {
    const settings = setPersistentSubscriptionConfig(customConfig)

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

  /**
   * Acknowledges single event
   */
  public acknowledgeEvent(event: Event, credentials?: UserCredentials | null): void {
    return this.acknowledgeEvents([event], credentials)
  }

  /**
   * Acknowledges array of events
   */
  public acknowledgeEvents(events: Event[], credentials?: UserCredentials | null): void {
    const processedEventIds = events.map(
      (event): Buffer => {
        return uuidToBuffer(event.id)
      }
    )

    const raw = protobuf.PersistentSubscriptionAckEvents.fromObject({
      subscriptionId: this.subscriptionId,
      processedEventIds
    })
    this.esConnection
      .getConnection()
      .sendCommand(
        this.id,
        EventstoreCommand.PersistentSubscriptionAckEvents,
        Buffer.from(protobuf.PersistentSubscriptionAckEvents.encode(raw).finish()),
        credentials || this.credentials
      )
  }

  /**
   * Not acknowledge single event
   */
  public notAcknowledgeEvent(
    event: Event,
    reason: model.eventstore.proto.PersistentSubscriptionNakEvents.NakAction = model.eventstore
      .proto.PersistentSubscriptionNakEvents.NakAction.Unknown,
    message?: string,
    credentials?: UserCredentials | null
  ): void {
    return this.notAcknowledgeEvents([event], reason, message, credentials)
  }

  /**
   * Not acknowledge array of events
   */
  public notAcknowledgeEvents(
    events: Event[],
    reason: model.eventstore.proto.PersistentSubscriptionNakEvents.NakAction = model.eventstore
      .proto.PersistentSubscriptionNakEvents.NakAction.Unknown,
    message?: string,
    credentials?: UserCredentials | null
  ): void {
    const processedEventIds = events.map(
      (event): Buffer => {
        return uuidToBuffer(event.id)
      }
    )
    const raw = protobuf.PersistentSubscriptionNakEvents.fromObject({
      subscriptionId: this.subscriptionId,
      processedEventIds,
      message,
      action: reason
    })
    this.esConnection
      .getConnection()
      .sendCommand(
        this.id,
        EventstoreCommand.PersistentSubscriptionNakEvents,
        Buffer.from(protobuf.PersistentSubscriptionNakEvents.encode(raw).finish()),
        credentials || this.credentials
      )
  }
}
