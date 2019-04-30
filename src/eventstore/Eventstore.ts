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
import * as eventstoreErrors from '../errors'

const protobuf = model.eventstore.proto

export interface WriteResult {
  firstEventNumber: Long | number
  lastEventNumber: Long | number
  position: Position
}

/**
 * Base class to communicate with eventstore
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
   */
  public constructor(connectionConfiguration: EventstoreSettings | object = {}) {
    super()
    this.connectionConfig = setConnectionSettings(connectionConfiguration)
    this.log = this.connectionConfig.logger
    this.connection = new TCPConnection({...this.connectionConfig})
  }

  /**
   * Ensure to use up-to-date settings, logger and a fresh connection socket
   */
  protected init(connectionConfiguration: EventstoreSettings | object = {}): void {
    this.connectionConfig = {...this.connectionConfig, ...connectionConfiguration}
    this.log = this.connectionConfig.logger
    this.connection = new TCPConnection(this.connectionConfig)

    this.connection.on('error', this.onError)
  }

  /**
   * Returns client id - name of eventstore connection
   */
  public get name(): string {
    return this.connectionConfig.clientId
  }

  /**
   * Connect to eventstore
   */
  public async connect(connectionConfiguration: EventstoreSettings | object = {}): Promise<void> {
    this.init(connectionConfiguration)
    await this.connection.connect()

    try {
      await this.authenticate()
      await this.identifyClient()
    } catch (err) {
      await this.disconnect()
      throw err
    }
  }

  /**
   * Disconnect from eventstore and try to drain pending requests
   */
  public disconnect(): Promise<void> {
    return this.connection.disconnect()
  }

  /**
   * Indicates if connection to eventstore is available
   */
  public get isConnected(): boolean {
    return this.connection.isConnected
  }

  public getConnection(): TCPConnection {
    return this.connection
  }

  /**
   * Get current logger instance
   */
  public get logger(): bunyan {
    return this.log
  }

  /**
   * Set logger instance
   */
  public set logger(newLogger: bunyan) {
    this.connectionConfig.logger = newLogger
  }

  /**
   * Get a stream instance specified by streamName
   * You can also use one of the alias functions fromStream or atStream
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
   * Alias for method stream
   */
  public fromStream(streamName: string, streamOptions?: StreamOptions): Stream {
    return this.stream(streamName, streamOptions)
  }

  /**
   * Get a stream instance specified by streamName
   * Alias for method stream
   */
  public atStream(streamName: string, streamOptions?: StreamOptions): Stream {
    return this.stream(streamName, streamOptions)
  }

  /**
   * Ping eventstore
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
   */
  protected async authenticate(): Promise<void> {
    await new Promise(
      (resolve, reject): void => {
        this.log.debug(`Authenticate`)
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
   */
  protected onError(err: Error): void {
    this.log.error({err}, err.name)
  }

  /**
   * Reads a slice of events from current stream
   */
  protected async readSlice(
    direction: EventstoreCommand,
    position: Position,
    maxCount: number = 100,
    resolveLinks: boolean = true,
    requireMaster: boolean,
    credentials: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadAllEventsCompleted> {
    return await new Promise(
      (resolve, reject): void => {
        const raw = protobuf.ReadAllEvents.fromObject({
          commitPosition: position.commitPosition,
          preparePosition: position.preparePosition,
          maxCount,
          resolveLinks,
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
   */
  public async readSliceForward(
    position: Position,
    maxCount: number = 100,
    resolveLinks: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadAllEventsCompleted> {
    return await this.readSlice(
      EventstoreCommand.ReadAllEventsForward,
      position,
      maxCount,
      resolveLinks,
      requireMaster || this.connectionConfig.requireMaster,
      credentials || this.connectionConfig.credentials
    )
  }

  /**
   * Reads a slice from current stream in backward direction
   */
  public async readSliceBackward(
    position: Position,
    maxCount: number = 100,
    resolveLinks: boolean = true,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<model.eventstore.proto.ReadAllEventsCompleted> {
    return await this.readSlice(
      EventstoreCommand.ReadAllEventsBackward,
      position,
      maxCount,
      resolveLinks,
      requireMaster || this.connectionConfig.requireMaster,
      credentials || this.connectionConfig.credentials
    )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  /**
   * Walks all events forward
   */
  public async walkAllForward(
    start: Position = Position.Start,
    maxCount: number = 100,
    resolveLinks: boolean = true,
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
        resolveLinks,
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
          resolveLinks,
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
              resolveLinks,
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
   */
  public async walkAllBackward(
    start: Position = Position.End,
    maxCount: number = 100,
    resolveLinks: boolean = true,
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
        resolveLinks,
        requireMaster,
        credentials
      )
      let result = await readResult

      let maxSlicePosition = new Position(result.commitPosition, result.preparePosition)
      begin = new Position(result.nextCommitPosition, result.nextPreparePosition)
      if (begin.compareTo(maxSlicePosition) < 0) {
        //we have more so start fetching in background
        readResult = that.readSliceBackward(
          begin,
          maxCount,
          resolveLinks,
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
              resolveLinks,
              requireMaster,
              credentials
            )
          }
        }
      }
    }

    return new StreamWalker(asyncGenerator(start))
  }

  /** Resolves a link  */
  public async resolveLink(
    link: Event,
    requireMaster?: boolean,
    credentials?: UserCredentials | null
  ): Promise<Event | null> {
    if (!link.isLink()) {
      return link
    }

    if (requireMaster === undefined) {
      requireMaster = this.connectionConfig.requireMaster
    }

    if (typeof link.data !== 'string') {
      throw eventstoreErrors.newProtocolError('Invalid link data')
    }

    const linkInfo = link.data.split('@')
    let streamName = linkInfo[1]
    let eventNumber = Long.fromValue(linkInfo[0])

    const stream = this.stream(streamName)
    if (stream.isMetaStream()) {
      this.log.debug({streamName}, 'Getting specific event from meta is not supported')
      return null
    }
    if (requireMaster) {
      stream.requiresMaster()
    }
    if (credentials) {
      stream.withCredentials(credentials)
    }
    const event = await stream.getEventByNumber(eventNumber)
    if (!event) {
      throw eventstoreErrors.newNotFoundError('Event could not be found')
    }
    return event
  }
}
