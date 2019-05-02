import {EventEmitter} from 'events'
import * as model from '../protobuf/model'
import {UserCredentials, Position} from '../eventstore'
import {Stream} from '../stream'
import {TCPConnection} from '../eventstore/TCPConnection'
import * as bunyan from 'bunyan'
import {Event} from '../event'

/**
 * Base class for handling subscriptions
 * @emits {subscribed}
 * @emits {dropped}
 * @emits {event}
 * @emits {event-eventnametolowercase}
 * @emits {error}
 */
export class Subscription extends EventEmitter {
  /** uuid4 of subscription */
  protected subscriptionId: string
  /** indicates if subscription is running */
  public isSubscribed: boolean = false
  /** connection to use */
  protected tcpConnection: TCPConnection
  /** credentials for subscription */
  protected credentials: UserCredentials | null = null
  /** instance of corresponding stream */
  protected stream: Stream
  /** indicates if events should be full resolved */
  protected resolveLinkTos: boolean
  /** logger */
  public log: bunyan
  /** global log position */
  protected position: Position | null = null

  /**
   * Creates an instance of subscription.
   */
  public constructor(
    subscriptionId: string,
    tcpConnection: TCPConnection,
    stream: Stream,
    resolveLinkTos: boolean,
    credentials: UserCredentials | null
  ) {
    super()
    this.subscriptionId = subscriptionId
    this.tcpConnection = tcpConnection
    this.credentials = credentials
    this.stream = stream
    this.resolveLinkTos = resolveLinkTos
    this.on('subscribed', this.onSubscribed)
    this.on('dropped', this.onDropped)
    this.on('event', this.onEvent)
    this.on('error', this.onError)
    this.log = stream.log.child({module: 'Subscription', subscriptionId: this.id})
  }

  /**
   * Returns subscriptionId
   */
  public get id(): string {
    return this.subscriptionId
  }

  /**
   * Returns subscription nam
   */
  public get name(): string {
    return 'Subscription: ' + this.subscriptionId
  }

  /**
   * Gets get credentials
   */
  public get getCredentials(): UserCredentials | null {
    return this.credentials
  }

  /**
   * Gets resolve link tos
   */
  public getResolveLinkTos(): boolean {
    return this.resolveLinkTos
  }

  /**
   * Unsubscribe from stream
   */
  public async unsubscribe(): Promise<void> {
    this.log.debug({fn: 'unsubscribe'}, 'unsubscribe subscription')
    await this.tcpConnection.unsubscribeFromStream(this.id)
  }

  /**
   * Called when event from eventstore arrives
   */
  public eventAppeared(event: Event, position: Position): void {
    this.emit('event', event, position)
    this.emit(`event-${event.name.toLocaleLowerCase()}`, event, position)
  }

  /**
   * Called when subscription was dropped
   */
  protected onDropped(
    reason: model.eventstore.proto.SubscriptionDropped.SubscriptionDropReason
  ): void {
    this.log.debug({reason}, 'Subscription dropped')
  }

  /**
   * Determines whether event on
   */
  protected onEvent(event: Event, position: Position): void {
    this.position = position
    this.log.debug({eventName: event.name, eventId: event.id}, 'Event received')
  }

  /**
   * Called when subscription is established
   */
  protected onSubscribed(): void {
    this.log.debug(
      {subscriptionId: this.subscriptionId, stream: this.stream.id},
      'Subscription started'
    )
  }

  /**
   * Called when error appears
   */
  protected onError(err: Error): void {
    this.log.error({err, subscriptionId: this.subscriptionId}, 'Error on subscription')
  }
}
