import {StreamPosition} from '../stream/StreamPosition'
import Long = require('long')

/** constant definition of consumer strategies */
export const SystemConsumerStrategies = {
  DispatchToSingle: 'DispatchToSingle',
  RoundRobin: 'RoundRobin',
  Pinned: 'Pinned'
}

/**
 * typescript interface for Persitent subscription config
 */
export interface PersitentSubscriptionConfig {
  resolveLinkTos: boolean
  startFrom: Long | number
  messageTimeout: number
  extraStatistic: boolean
  maxRetryCount: number
  liveBufferSize: number
  bufferSize: number
  readBatchSize: number
  checkPointAfter: number
  minCheckpointCount: number
  maxCheckPointCount: number
  maxSubscriberCount: number
  consumerStrategy: string
}

/** default persitent subscription config */
const defaultPersitentSubscriptionConfig: PersitentSubscriptionConfig = {
  resolveLinkTos: true,
  startFrom: StreamPosition.Start,
  messageTimeout: 10000,
  extraStatistic: false,
  maxRetryCount: 10,
  liveBufferSize: 500,
  bufferSize: 500,
  readBatchSize: 20,
  checkPointAfter: 1000,
  minCheckpointCount: 10,
  maxCheckPointCount: 500,
  maxSubscriberCount: 10,
  consumerStrategy: SystemConsumerStrategies.RoundRobin
}

/**
 * merges given settings with default settings
 * @param customSettings
 */
let setPersitentSubscriptionConfig = (
  customSettings: object | PersitentSubscriptionConfig
): PersitentSubscriptionConfig => {
  return {...defaultPersitentSubscriptionConfig, ...customSettings}
}

export {setPersitentSubscriptionConfig}
