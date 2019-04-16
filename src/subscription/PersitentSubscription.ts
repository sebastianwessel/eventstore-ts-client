import {Stream} from '../stream'
import {UserCredentials, Eventstore} from '../eventstore'
import {EventEmitter} from 'events'

/**
 * Represents a persistent subscription
 *
 * @export
 * @class PersitentSubscription
 * @extends {EventEmitter}
 */
export class PersitentSubscription extends EventEmitter {
  /** corresponding stream  */
  protected stream: Stream
  /** connection to use */
  protected esConnection: Eventstore
  /** name of subscription */
  protected subscriptionGroupName: string

  /**
   *Creates an instance of PersitentSubscription.
   * @param {Stream} stream
   * @param {Eventstore} esConnection
   * @param {string} subscriptionGroupName
   * @memberof PersitentSubscription
   */
  public constructor(stream: Stream, esConnection: Eventstore, subscriptionGroupName: string) {
    super()
    this.stream = stream
    this.esConnection = esConnection
    this.subscriptionGroupName = subscriptionGroupName
  }

  /**
   * Connects persitent subscription
   * @param [credentials]
   * @returns connect
   */
  public async connect(credentials?: UserCredentials): Promise<void> {}

  /**
   * Deletes persitent subscription
   * @param [credentials]
   * @returns delete
   */
  public async delete(credentials?: UserCredentials): Promise<void> {}

  /**
   * Updates persitent subscription
   * @param [credentials]
   * @returns update
   */
  public async update(credentials?: UserCredentials): Promise<void> {}
}
