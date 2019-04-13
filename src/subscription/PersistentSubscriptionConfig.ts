import {StreamPosition} from '../stream/StreamPosition'
import Long = require('long')

export const SystemConsumerStrategies = {
  DispatchToSingle: 'DispatchToSingle',
  RoundRobin: 'RoundRobin',
  Pinned: 'Pinned'
}

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

let setPersitentSubscriptionConfig = (
  customSettings: object | PersitentSubscriptionConfig
): PersitentSubscriptionConfig => {
  return {...defaultPersitentSubscriptionConfig, ...customSettings}
}

export {setPersitentSubscriptionConfig}
