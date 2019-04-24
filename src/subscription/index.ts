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
