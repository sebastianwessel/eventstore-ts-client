import {StreamPosition} from '../stream/StreamPosition'
import Long = require('long')

/** constant definition of consumer strategies */
export const SystemConsumerStrategies = {
  DispatchToSingle: 'DispatchToSingle',
  RoundRobin: 'RoundRobin',
  Pinned: 'Pinned'
}

/**
 * typescript interface for Persistent subscription config
 */
export interface PersistentSubscriptionConfig {
  resolveLinkTos: boolean
  startFrom: Long | number
  messageTimeoutMilliseconds: number
  recordStatistics: boolean
  maxRetryCount: number
  liveBufferSize: number
  bufferSize: number
  readBatchSize: number
  checkPointAfterTime: number
  checkpointMinCount: number
  checkpointMaxCount: number
  subscriberMaxCount: number
  namedConsumerStrategy: string
  preferRoundRobin: boolean
}

/** default persistent subscription config */
const defaultPersistentSubscriptionConfig: PersistentSubscriptionConfig = {
  resolveLinkTos: true,
  startFrom: StreamPosition.Start,
  messageTimeoutMilliseconds: 30000,
  recordStatistics: false,
  maxRetryCount: 10,
  liveBufferSize: 10,
  bufferSize: 10,
  readBatchSize: 10,
  checkPointAfterTime: 1000,
  checkpointMinCount: 10,
  checkpointMaxCount: 500,
  subscriberMaxCount: 10,
  namedConsumerStrategy: SystemConsumerStrategies.RoundRobin,
  preferRoundRobin: true
}

/**
 * merges given settings with default settings
 * @param customSettings
 */
let setPersistentSubscriptionConfig = (
  customSettings: object | PersistentSubscriptionConfig
): PersistentSubscriptionConfig => {
  return {...defaultPersistentSubscriptionConfig, ...customSettings}
}

export {setPersistentSubscriptionConfig}
