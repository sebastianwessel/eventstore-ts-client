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
   *Creates an instance of Eventstore.
   * @param {(EventstoreSettings | object)} [connectionConfiguration={}]
   * @memberof Eventstore
   */
  public constructor(connectionConfiguration: EventstoreSettings | object = {}) {
    super()
    this.connectionConfig = setConnectionSettings(connectionConfiguration)
    this.log = this.connectionConfig.logger
    this.connection = new TCPConnection(this.connectionConfig)
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
    await this.identifyClient()
  }

  /**
   * Disconnect from eventstore and try to drain pending requests
   *
   * @returns {Promise<void>}
   * @memberof Eventstore
   */
  public async disconnect(): Promise<void> {
    if (!this.connection) {
      return
    }
    return await this.connection.disconnect()
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
   *
   * @param {string} streamName
   * @param {StreamOptions} [streamOptions]
   * @returns {Promise<Stream>}
   * @memberof Eventstore
   */
  public async stream(streamName: string, streamOptions?: StreamOptions): Promise<Stream> {
    const defaultOptions: StreamOptions = {
      requireMaster: false,
      resolveLinks: true,
      credentials: this.connectionConfig.credentials
    }
    return new Stream(this, streamName, {...defaultOptions, ...streamOptions})
  }

  /**
   * Get a stream instance specified by streamName
   *
   * @param {string} streamName
   * @param {StreamOptions} [streamOptions]
   * @returns {Promise<Stream>}
   * @memberof Eventstore
   */
  public async fromStream(streamName: string, streamOptions?: StreamOptions): Promise<Stream> {
    return this.stream(streamName, streamOptions)
  }

  /**
   * Get a stream instance specified by streamName
   *
   * @param {string} streamName
   * @param {StreamOptions} [streamOptions]
   * @returns {Promise<Stream>}
   * @memberof Eventstore
   */
  public async atStream(streamName: string, streamOptions?: StreamOptions): Promise<Stream> {
    return this.stream(streamName, streamOptions)
  }

  /**
   * Ping eventstore
   *
   * @returns {Promise<void>}
   * @memberof Eventstore
   */
  public async ping(): Promise<void> {
    await new Promise((resolve, reject) => {
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
    })
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
    await new Promise((resolve, reject) => {
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
    })
  }
  /*

  public scavengeDatabase(): Promise<void> {}
  */
}
