import {setConnectionSettings, EventstoreSettings, UserCredentials} from './EventstoreSettings'
import {EventEmitter} from 'events'
import {Stream, StreamOptions} from '../stream'
import * as bunyan from 'bunyan'
import {TCPConnection} from './TCPConnection'
import uuid = require('uuid/v4')
import Long = require('long')
import {EventstoreCommand} from '../protobuf/EventstoreCommand'
import * as model from '../protobuf/model'
import {Position} from './Position'
import {StreamWalker} from '../StreamWalker'
import {Event} from '../event'

const protobuf = model.eventstore.proto

export interface WriteResult {
  firstEventNumber: Long | number
  lastEventNumber: Long | number
  position: Position
}

/**
 * Base class to communicate with eventstore
 *
 * @export
 * @class Eventstore
 * @extends {EventEmitter}
 */
export class Eventstore extends EventEmitter {
  /** connection config */
  protected connectionConfig: EventstoreSettings
  /** logger */
  public log: bunyan
  /** connection base */
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
  public disconnect(): Promise<void> {
    return this.connection.disconnect()
  }

  /**
   * Indicates if connection to eventstore is available
   *
   * @readonly
   * @type {boolean}
   * @memberof Eventstore
   */
  public get isConnected(): boolean {
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
   * Called directly after connecting to eventstore
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

  /**
   * Authenticate with credentials from settings
   *
   * @protected
   * @returns {Promise<void>}
   * @memberof Eventstore
   */
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

  /**
   * Called from event listener connected to 'error'
   *
   * @protected
   * @param {Error} err
   * @memberof Eventstore
   */
  protected onError(err: Error): void {
    this.log.error({err}, err.name)
  }

  /**
   * Reads a slice of events from current stream
   *
   * @protected
   * @param {EventstoreCommand} direction
   * @param {Position} position
   * @param {number} [maxCount=100]
   * @param {boolean} [resolveLinkTos=true]
   * @param {boolean} requireMaster
   * @param {(UserCredentials | null)} credentials
   * @returns {Promise<model.eventstore.proto.ReadAllEventsCompleted>}
   * @memberof Eventstore
   */
  protected async readSlice(
    direction: EventstoreCommand,
    position: Position,
    maxCount: number = 100,
    resolveLinkTos: boolean = true,
    requireMaster: boolean,
    credentials: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadAllEventsCompleted> {
    return await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.ReadAllEvents.fromObject({
          commitPosition: position.commitPosition,
          preparePosition: position.preparePosition,
          maxCount,
          resolveLinkTos,
          requireMaster
        })
        this.connection.sendCommand(
          uuid(),
          direction,
          Buffer.from(protobuf.ReadAllEvents.encode(raw).finish()),
          credentials,
          {
            resolve,
            reject
          }
        )
      }
    )
  }

  /**
   * Reads a slice from current stream in forward direction
   *
   * @param {Position} position
   * @param {number} [maxCount=100]
   * @param {boolean} [resolveLinkTos=true]
   * @param {boolean} [requireMaster]
   * @param {(UserCredentials | null)} [credentials]
   * @returns {Promise<model.eventstore.proto.ReadAllEventsCompleted>}
   * @memberof Eventstore
   */
  public async readSliceForward(
    position: Position,
    maxCount: number = 100,
    resolveLinkTos: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadAllEventsCompleted> {
    return await this.readSlice(
      EventstoreCommand.ReadAllEventsForward,
      position,
      maxCount,
      resolveLinkTos,
      requireMaster || this.connectionConfig.requireMaster,
      credentials || this.connectionConfig.credentials
    )
  }

  /**
   * Reads a slice from current stream in backward direction
   *
   * @param {Position} position
   * @param {number} [maxCount=100]
   * @param {boolean} [resolveLinkTos=true]
   * @param {boolean} [requireMaster]
   * @param {(UserCredentials | null)} [credentials]
   * @returns {Promise<model.eventstore.proto.ReadAllEventsCompleted>}
   * @memberof Eventstore
   */
  public async readSliceBackward(
    position: Position,
    maxCount: number = 100,
    resolveLinkTos: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadAllEventsCompleted> {
    return await this.readSlice(
      EventstoreCommand.ReadAllEventsBackward,
      position,
      maxCount,
      resolveLinkTos,
      requireMaster || this.connectionConfig.requireMaster,
      credentials || this.connectionConfig.credentials
    )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  /**
   * Walks all events forward
   * @param [start]
   * @param [maxCount]
   * @param [resolveLinkTos]
   * @param [requireMaster]
   * @param [credentials]
   * @returns
   */
  public async walkAllForward(
    start: Position = Position.Start,
    maxCount: number = 100,
    resolveLinkTos: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<StreamWalker> {
    const that = this
    if (requireMaster === undefined) {
      requireMaster = this.connectionConfig.requireMaster
    }
    if (credentials === undefined) {
      credentials = this.connectionConfig.credentials
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const asyncGenerator = async function*(begin: Position) {
      let index = 0
      //fetch first slice
      let readResult = that.readSliceForward(
        begin,
        maxCount,
        resolveLinkTos,
        requireMaster,
        credentials
      )
      let result = await readResult

      let maxSlicePosition = new Position(result.commitPosition, result.preparePosition)
      begin = new Position(result.nextCommitPosition, result.nextPreparePosition)
      if (begin.compareTo(maxSlicePosition) >= 0) {
        //we have more so start fetching in background
        readResult = that.readSliceForward(
          begin,
          maxCount,
          resolveLinkTos,
          requireMaster,
          credentials
        )
      }
      while (true) {
        if (index < result.events.length) {
          const entry = result.events[index++]
          yield Event.fromRaw(entry.event || entry.link)
        } else if (begin.compareTo(maxSlicePosition) <= 0) {
          return null
        } else {
          index = 0
          //wait for background fetch and grab result
          result = await readResult
          maxSlicePosition = new Position(result.commitPosition, result.preparePosition)
          begin = new Position(result.nextCommitPosition, result.nextPreparePosition)
          if (begin.compareTo(maxSlicePosition) > 0) {
            //if there are more events start fetching in background

            readResult = that.readSliceForward(
              begin,
              maxCount,
              resolveLinkTos,
              requireMaster,
              credentials
            )
          }
        }
      }
    }

    return new StreamWalker(asyncGenerator(start))
  }

  /**
   * Walks all events backward
   * @param [start]
   * @param [maxCount]
   * @param [resolveLinkTos]
   * @param [requireMaster]
   * @param [credentials]
   * @returns all backward
   */
  public async walkAllBackward(
    start: Position = Position.End,
    maxCount: number = 100,
    resolveLinkTos: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<StreamWalker> {
    const that = this
    if (requireMaster === undefined) {
      requireMaster = this.connectionConfig.requireMaster
    }
    if (credentials === undefined) {
      credentials = this.connectionConfig.credentials
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const asyncGenerator = async function*(begin: Position) {
      let index = 0
      //fetch first slice
      let readResult = that.readSliceBackward(
        begin,
        maxCount,
        resolveLinkTos,
        requireMaster,
        credentials
      )
      let result = await readResult

      let maxSlicePosition = new Position(result.commitPosition, result.preparePosition)
      begin = new Position(result.nextCommitPosition, result.nextPreparePosition)
      if (begin.compareTo(maxSlicePosition) >= 0) {
        //we have more so start fetching in background
        readResult = that.readSliceBackward(
          begin,
          maxCount,
          resolveLinkTos,
          requireMaster,
          credentials
        )
      }
      while (true) {
        if (index < result.events.length) {
          const entry = result.events[index++]
          yield Event.fromRaw(entry.event || entry.link)
        } else if (begin.compareTo(maxSlicePosition) >= 0) {
          return null
        } else {
          index = 0
          //wait for background fetch and grab result
          result = await readResult
          maxSlicePosition = new Position(result.commitPosition, result.preparePosition)
          begin = new Position(result.nextCommitPosition, result.nextPreparePosition)
          if (begin.compareTo(maxSlicePosition) < 0) {
            //if there are more events start fetching in background

            readResult = that.readSliceBackward(
              begin,
              maxCount,
              resolveLinkTos,
              requireMaster,
              credentials
            )
          }
        }
      }
    }

    return new StreamWalker(asyncGenerator(start))
  }
}
