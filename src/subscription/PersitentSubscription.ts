import {Stream} from '../stream'
import {UserCredentials, Eventstore} from '../eventstore'
import {EventEmitter} from 'events'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import * as model from '../protobuf/model'
import uuid = require('uuid/v4')
import {
  PersitentSubscriptionConfig,
  setPersitentSubscriptionConfig,
  SubscriptionStatus
} from '../subscription'
import Long from 'long'
import {Event} from '../event'
import {uuidToBuffer} from '../protobuf/uuidBufferConvert'

const protobuf = model.eventstore.proto

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

  public id: string = uuid()

  public subscriptionId: string

  public allowedInFlightMessages: number = 10

  protected status: SubscriptionStatus = SubscriptionStatus.disconnected

  public autoAcknownledge: boolean = true

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

    this.subscriptionId = `${this.stream.id} :: ${this.subscriptionGroupName}`

    this.on(
      'event',
      (event): void => {
        console.log('received ' + event.name + ' - ' + event.eventNumber)
        this.acknowledgeEvent(event)
      }
    )
    this.on(
      'drop',
      (reason): void => {
        this.state = SubscriptionStatus.disconnected
        console.log('dropped because of ' + reason)
      }
    )
  }

  /**
   * Gets name
   */
  public get name(): string {
    return `PersitentSubsbscription: ${this.stream.id} :: ${this.subscriptionGroupName}`
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
   * Connects persitent subscription
   * @param [credentials]
   * @returns connect
   */
  public async start(
    allowedInFlightMessages: number = 10,
    credentials?: UserCredentials | null
  ): Promise<PersitentSubscription> {
    this.allowedInFlightMessages = allowedInFlightMessages
    if (credentials) {
      this.credentials = credentials
    }
    const result = await this.esConnection
      .getConnection()
      .connectToPersitentSubscription(this, allowedInFlightMessages, this.credentials)
    this.subscriptionId = result.subscriptionId
    this.state = SubscriptionStatus.connected
    return this
  }

  /**
   * Deletes persitent subscription
   * @param [credentials]
   * @returns delete
   */
  public async delete(credentials?: UserCredentials | null): Promise<PersitentSubscription> {
    const result: PersitentSubscription = await new Promise(
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

  /**
   * Acknowledges single event
   * @param event
   * @param [credentials]
   * @returns event
   */
  public acknowledgeEvent(event: Event, credentials?: UserCredentials | null): void {
    return this.acknowledgeEvents([event], credentials)
  }

  /**
   * Acknowledges array of events
   * @param events
   * @param [credentials]
   * @returns events
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
   * @param event
   * @param [reason]
   * @param [message]
   * @param [credentials]
   * @returns acknowledge event
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
   * @param events
   * @param [reason]
   * @param [message]
   * @param [credentials]
   * @returns acknowledge events
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
