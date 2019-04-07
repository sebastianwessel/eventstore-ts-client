import {EventEmitter} from 'events'

export class Subscription extends EventEmitter {
  public constructor(subscriptionId: string) {
    super()
  }
}
