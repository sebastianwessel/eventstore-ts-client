import * as bunyan from 'bunyan'
import uuid = require('uuid/v4')
import * as tls from 'tls'

/**
 * @external {bunyan} https://github.com/trentm/node-bunyan
 */

/**
 * @external {Long} https://github.com/dcodeIO/long.js
 */

/**
 * @typedef {object} UserCredentials
 * @property {string} username username to use for authentication
 * @property {string} password password to use for authentication
 */
export interface UserCredentials {
  username: string
  password: string
}

/**
 * @typedef {Object} EventstoreSettings
 * @property {string} uri connection uri (default=tcp://admin@changeit@127.0.0.1:1113)
 * @property {boolean} useSSL indicates if to connect to secure tcp port (default=false)
 * @property {SecureContextOptions | null} secureContext node tls.SecureContextOptions (default=null)
 * @property {boolean} useHttps indicates if to use https for discovery (default=false)
 * @property {string} host connection host name (will be ignored if uri is set)
 * @property {number} port connection port (will be ignored if uri is set)
 * @property {UserCredentials} credentials user credentials
 * @property {boolean} requireMaster forces to connect to master node only if set to true (default=true)
 * @property {bunyan} logger bunyan logger instance
 * @property {number} maxQueueSize maximum pending requests (default=5000)
 * @property {number} connectTimeout connect timeout in ms (default=1000)
 * @property {number} maxReconnections maximum re-connection tries (default=10)
 * @property {number} reconnectionDelay delay between reconnects in ms (default=2000)
 * @property {number} operationTimeout time in ms until a request timed out if no response from eventstore arrives (default=7000)
 * @property {number} operationTimeoutCheckPeriod time period in ms to check for timed out requests (default=1000)
 * @property {string} clusterDns dns ip to use to discover eventstore cluster ip's (default=empty string)
 * @property {number} maxDiscoverAttempts maximum count of discover attempts before giving up
 * @property {number} externalGossipPort gossip ip port (default=2112)
 * @property {number} gossipTimeout timeout in ms (default=1000)
 * @property {string[]} gossipSeeds array list of eventstore cluster ip's
 * @property {boolean} validateServer validate server ssl certificate (default=false)
 * @property {string} clientId client id string to identify connection at eventstore (default=ts-client-uuid())
 *
 */
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
  connectTimeout: number
  maxReconnections: number
  reconnectionDelay: number
  operationTimeout: number
  operationTimeoutCheckPeriod: number
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
  reconnectionDelay: 2 * 1000,

  clientId: `ts-client-${uuid()}`,

  maxQueueSize: 5000,

  operationTimeout: 7 * 1000,
  operationTimeoutCheckPeriod: 1000,

  logger: bunyan.createLogger({
    name: 'eventstore-ts-client',
    level: 'debug'
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
 */
export function setConnectionSettings(
  customSettings: object | EventstoreSettings
): EventstoreSettings {
  return {...defaultConnectionSettings, ...customSettings}
}
