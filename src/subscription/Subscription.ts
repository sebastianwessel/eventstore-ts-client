import {EventEmitter} from 'events'
import {Event} from '../event'
import * as model from '../protobuf/model'
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import * as eventstoreError from '../errors'
import {Eventstore, UserCredentials} from '../eventstore'
import {Stream} from '../stream'
import {TCPConnection} from '../eventstore/TCPConnection'

const protobuf = model.eventstore.proto

/**
 * Base class for handling subscriptions
 *
 * @export
 * @class Subscription
 * @extends {EventEmitter}
 */
export class Subscription extends EventEmitter {
  protected subscriptionId: string
  public isSubscribed: boolean = false
  protected tcpConnection: TCPConnection
  protected credentials: UserCredentials | null = null
  protected stream: Stream
  protected resolveLinkTos: boolean
  protected log: bunyan

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
    this.on('dropped', this.onDropped)
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

  public get getCredentials(): UserCredentials | null {
    return this.credentials
  }

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

  protected onDropped(
    reason: model.eventstore.proto.SubscriptionDropped.SubscriptionDropReason
  ): void {
    this.log.debug({reason}, 'Subscription dropped')
  }
}
