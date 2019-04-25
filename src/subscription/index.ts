export {Subscription} from './Subscription'
export {PersistentSubscription} from './PersistentSubscription'
export {
  setPersistentSubscriptionConfig,
  PersistentSubscriptionConfig,
  SystemConsumerStrategies
} from './PersistentSubscriptionConfig'

export enum SubscriptionStatus {
  disconnected,
  connected,
  catchup,
  live,
  paused
}

export enum SubscriptionDropReason {
  Unsubscribed = 0,
  AccessDenied = 1,
  NotFound = 2,
  PersistentSubscriptionDeleted = 3,
  SubscriberMaxCountReached = 4
}

export enum NakAction {
  Unknown = 0,
  Park = 1,
  Retry = 2,
  Skip = 3,
  Stop = 4
}
