import {EventEmitter} from 'events'
import * as model from '../protobuf/model'
import {UserCredentials, Position} from '../eventstore'
import {Stream} from '../stream'
import {TCPConnection} from '../eventstore/TCPConnection'
import * as bunyan from 'bunyan'
import {Event} from '../event'

/**
 * Base class for handling subscriptions
 *
 * @emits {subscribed} when subscription is established
 * @emits {event} when a new event receives
 * @emits {event-eventname} when event of name eventname is received
 * @emits {dropped} when subscription gets dropped
 * @emits {error} when some error occured
 * @export
 * @class Subscription
 * @extends {EventEmitter}
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
   * Creates an instance of Subscription.
   * @param {string} subscriptionId
   * @memberof Subscription
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
    this.log = stream.logger.child({module: 'Subscription', subscriptionId: this.id})
  }

  /**
   * Returns subscriptionId
   *
   * @readonly
   * @type {string}
   * @memberof Subscription
   */
  public get id(): string {
    return this.subscriptionId
  }

  /**
   * Returns subscription nam
   *
   * @readonly
   * @type {string}
   * @memberof Subscription
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
   * @returns true if resolve link tos
   */
  public getResolveLinkTos(): boolean {
    return this.resolveLinkTos
  }

  /**
   * Unsubscribe from stream
   *
   * @returns {Promise<void>}
   * @memberof Subscription
   */
  public async unsubscribe(): Promise<void> {
    this.log.debug('unsubscribe subscription')
    await this.tcpConnection.unsubscribeFromStream(this.id)
  }

  /**
   * Called when subscription was dropped
   *
   * @protected
   * @param {model.eventstore.proto.SubscriptionDropped.SubscriptionDropReason} reason
   * @memberof Subscription
   */
  protected onDropped(
    reason: model.eventstore.proto.SubscriptionDropped.SubscriptionDropReason
  ): void {
    this.log.debug({reason}, 'Subscription dropped')
  }

  /**
   * Determines whether event on
   * @param event
   * @param position
   */
  protected onEvent(event: Event, position: Position): void {
    this.position = position
    this.log.debug({eventName: event.name, eventId: event.id}, 'Event received')
  }

  /**
   * Called when subscription is established
   *
   * @protected
   * @memberof Subscription
   */
  protected onSubscribed(): void {
    this.log.debug(
      {subscriptionId: this.subscriptionId, stream: this.stream.id},
      'Subscription started'
    )
  }

  /**
   * Called when error appears
   *
   * @protected
   * @param {Error} err
   * @memberof Subscription
   */
  protected onError(err: Error): void {
    this.log.error({err, subscriptionId: this.subscriptionId}, 'Error on subscription')
  }
}
