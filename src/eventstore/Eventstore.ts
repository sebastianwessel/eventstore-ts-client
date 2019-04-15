import {setConnectionSettings, EventstoreSettings} from './EventstoreSettings'
import {EventEmitter} from 'events'
import {Stream, StreamOptions} from '../stream'
import * as bunyan from 'bunyan'
import {TCPConnection} from './TCPConnection'
import uuid = require('uuid/v4')
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import * as model from '../protobuf/model'

const protobuf = model.eventstore.proto

/**
 * Base class to communicate with eventstore
 *
 * @export
 * @class Eventstore
 * @extends {EventEmitter}
 */
export class Eventstore extends EventEmitter {
  protected connectionConfig: EventstoreSettings
  protected log: bunyan
  protected connection: TCPConnection

  /**
   * Creates an instance of Eventstore.
   * @param {(EventstoreSettings | object)} [connectionConfiguration={}]
   * @memberof Eventstore
   */
  public constructor(connectionConfiguration: EventstoreSettings | object = {}) {
    super()
    this.connectionConfig = setConnectionSettings(connectionConfiguration)
    this.log = this.connectionConfig.logger
    this.connection = new TCPConnection({...this.connectionConfig})
  }

  /**
   * Ensure to use up-to-date settings, logger and a fresh connection socket
   *
   * @protected
   * @param {(EventstoreSettings | object)} [connectionConfiguration={}]
   * @memberof Eventstore
   */
  protected init(connectionConfiguration: EventstoreSettings | object = {}): void {
    this.connectionConfig = {...this.connectionConfig, ...connectionConfiguration}
    this.log = this.connectionConfig.logger
    this.connection = new TCPConnection(this.connectionConfig)

    this.connection.on('error', this.onError)
  }

  /**
   * Returns client id - name of eventstore connection
   *
   * @readonly
   * @type {string}
   * @memberof Eventstore
   */
  public get name(): string {
    return this.connectionConfig.clientId
  }

  /**
   * Connect to eventstore
   *
   * @param {(EventstoreSettings | object)} [connectionConfiguration={}]
   * @returns {Promise<void>}
   * @memberof Eventstore
   */
  public async connect(connectionConfiguration: EventstoreSettings | object = {}): Promise<void> {
    this.init(connectionConfiguration)
    await this.connection.connect()

    try {
      await this.authenticate()
    } catch (err) {
      await this.disconnect()
      throw err
    }
    await this.identifyClient()
  }

  /**
   * Disconnect from eventstore and try to drain pending requests
   *
   * @returns {Promise<void>}
   * @memberof Eventstore
   */
  public async disconnect(): Promise<void> {
    if (!this.connection || !this.isConnected) {
      return
    }
    await this.connection.disconnect()
  }

  /**
   * Inidcates if connection to eventstore is available
   *
   * @readonly
   * @type {boolean}
   * @memberof Eventstore
   */
  public get isConnected(): boolean {
    if (!this.connection) {
      return false
    }
    return this.connection.isConnected
  }

  public getConnection(): TCPConnection {
    return this.connection
  }

  /**
   * Get current logger instance
   *
   * @type {bunyan}
   * @memberof Eventstore
   */
  public get logger(): bunyan {
    return this.log
  }

  /**
   * Set logger instance
   *
   * @memberof Eventstore
   */
  public set logger(newLogger: bunyan) {
    this.connectionConfig.logger = newLogger
  }

  /**
   * Get a stream instance specified by streamName
   * You can also use one of the alias functions {@see <fromStream>}, {@see <atStream>}
   *
   * @param {string} streamName
   * @param {StreamOptions} [streamOptions]
   * @returns {Stream}
   * @memberof Eventstore
   */
  public stream(streamName: string, streamOptions?: StreamOptions): Stream {
    const defaultOptions: StreamOptions = {
      requireMaster: false,
      resolveLinks: true,
      credentials: null
    }
    return new Stream(this, streamName, {...defaultOptions, ...streamOptions})
  }

  /**
   * Get a stream instance specified by streamName
   * Alias for {@see <stream>}
   *
   * @param {string} streamName
   * @param {StreamOptions} [streamOptions]
   * @returns {Stream}
   * @memberof Eventstore
   */
  public fromStream(streamName: string, streamOptions?: StreamOptions): Stream {
    return this.stream(streamName, streamOptions)
  }

  /**
   * Get a stream instance specified by streamName
   * Alias for {@see <stream>}
   *
   * @param {string} streamName
   * @param {StreamOptions} [streamOptions]
   * @returns {Stream}
   * @memberof Eventstore
   */
  public atStream(streamName: string, streamOptions?: StreamOptions): Stream {
    return this.stream(streamName, streamOptions)
  }

  /**
   * Ping eventstore
   *
   * @returns {Promise<void>}
   * @memberof Eventstore
   */
  public async ping(): Promise<void> {
    await new Promise(
      (resolve, reject): void => {
        this.connection.sendCommand(
          uuid(),
          EventstoreCommand.Ping,
          null,
          this.connectionConfig.credentials,
          {
            resolve,
            reject
          }
        )
      }
    )
  }

  /**
   * Called direytly after connecting to eventstore
   * Identifies connection against eventstore
   * Identification can be set in connection settings field clientId
   *
   * @protected
   * @returns {Promise<void>}
   * @memberof Eventstore
   */
  protected async identifyClient(): Promise<void> {
    await new Promise(
      (resolve, reject): void => {
        this.log.debug(`Identify as ${this.connectionConfig.clientId}`)
        const raw = protobuf.IdentifyClient.fromObject({
          version: 1,
          connectionName: this.connectionConfig.clientId
        })
        this.connection.sendCommand(
          uuid(),
          EventstoreCommand.IdentifyClient,
          Buffer.from(protobuf.IdentifyClient.encode(raw).finish()),
          this.connectionConfig.credentials,
          {
            resolve,
            reject
          }
        )
      }
    )
  }

  protected async authenticate(): Promise<void> {
    await new Promise(
      (resolve, reject): void => {
        this.log.debug(`Identify as ${this.connectionConfig.clientId}`)
        this.connection.sendCommand(
          uuid(),
          EventstoreCommand.Authenticate,
          null,
          this.connectionConfig.credentials,
          {
            resolve,
            reject
          }
        )
      }
    )
  }

  protected onError(err: Error): void {
    this.log.error({err}, err.name)
  }
  /*

  public scavengeDatabase(): Promise<void> {}
  */
}
