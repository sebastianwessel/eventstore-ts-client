import * as bunyan from 'bunyan'
import uuid = require('uuid/v4')

interface EventstoreSettings {
  useSSL: boolean
  host: string
  port: number
  credentials: {
    username: string
    password: string
  }
  requireMaster: boolean
  logger: bunyan

  maxQueueSize: number
  maxConcurrentItems: number
  maxRetries: number
  maxReconnections: number
  reconnectionDelay: number
  operationTimeout: number
  operationTimeoutCheckPeriod: number
  heartbeatInterval: number
  heartbeatTimeout: number
  clusterDns: string
  maxDiscoverAttempts: number
  externalGossipPort: number
  gossipTimeout: number
  gossipSeeds: string[]
  validateServer: boolean
  clientId: string
}

const defaultConnectionSettings: EventstoreSettings = {
  credentials: {
    password: 'changeit',
    username: 'admin'
  },
  host: '127.0.0.1',
  port: 1113,
  useSSL: false,
  logger: bunyan.createLogger({
    name: 'eventstore-ts-client'
    //level: 'debug'
  }),
  requireMaster: true,

  maxQueueSize: 5000,
  maxConcurrentItems: 5000,
  maxRetries: 10,
  maxReconnections: 10,
  reconnectionDelay: 100,
  operationTimeout: 7 * 1000,
  operationTimeoutCheckPeriod: 1000,
  validateServer: false,
  heartbeatInterval: 750,
  heartbeatTimeout: 1500,
  clusterDns: '',
  maxDiscoverAttempts: 10,
  externalGossipPort: 0,
  gossipTimeout: 1000,
  gossipSeeds: [],
  clientId: `ts-client-${uuid()}`
}

/**
 * Generates settings for connecting to eventstore
 * It takes the default settings and overwrites fields which are given in parameter
 *
 * @param {EventstoreSettings|object} customSettings - custom settings
 * @return {EventstoreSettings} new combined settings
 */
let setConnectionSettings = (customSettings: object | EventstoreSettings): EventstoreSettings => {
  return {...defaultConnectionSettings, ...customSettings}
}

export {setConnectionSettings, EventstoreSettings}
