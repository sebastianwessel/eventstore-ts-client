import {Stream} from '../stream'
import {UserCredentials, Eventstore} from '../eventstore'
import {EventEmitter} from 'events'

export class PersitentSubscription extends EventEmitter {
  protected stream: Stream
  protected esConnection: Eventstore
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

  public async connect(credentials?: UserCredentials): Promise<void> {}

  public async delete(credentials?: UserCredentials): Promise<void> {}

  public async update(credentials?: UserCredentials): Promise<void> {}
}
