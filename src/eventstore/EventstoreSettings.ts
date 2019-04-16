import * as bunyan from 'bunyan'
import uuid = require('uuid/v4')
import * as tls from 'tls'

/** typescript interface for user credentials */
export interface UserCredentials {
  username: string
  password: string
}
/** typescript interface for settings */
export interface EventstoreSettings {
  uri: string
  useSSL: boolean
  secureContext: null | tls.SecureContextOptions
  useHttps: boolean
  host: string
  port: number
  credentials: UserCredentials
  requireMaster: boolean
  logger: bunyan

  maxQueueSize: number
  maxConcurrentItems: number
  maxRetries: number
  connectTimeout: number
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

/** default eventstore connection settings */
const defaultConnectionSettings: EventstoreSettings = {
  uri: 'tcp://admin@changeit@127.0.0.1:1113',
  requireMaster: true,

  maxDiscoverAttempts: 10,
  clusterDns: '',
  externalGossipPort: 2112,
  gossipTimeout: 1000,
  gossipSeeds: [],

  useSSL: false, //use tcp encrypted?
  secureContext: null,
  useHttps: false, //fetch gossip info over https?
  validateServer: false,

  connectTimeout: 1000,
  maxReconnections: 10,
  reconnectionDelay: 100,

  clientId: `ts-client-${uuid()}`,

  maxQueueSize: 5000,
  maxConcurrentItems: 5000,
  maxRetries: 10,

  operationTimeout: 7 * 1000,
  operationTimeoutCheckPeriod: 1000,

  heartbeatInterval: 750,
  heartbeatTimeout: 1500,

  logger: bunyan.createLogger({
    name: 'eventstore-ts-client'
    //level: 'debug'
  }),

  host: '', //dummy entry will be overwritten by internal functions
  port: 0, //dummy entry will be overwritten by internal functions
  credentials: {
    password: '', //dummy entry will be overwritten by internal functions
    username: '' //dummy entry will be overwritten by internal functions
  }
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

export {setConnectionSettings}
