import Long from 'long'
import uuid = require('uuid/v4')
import {uuidFromBuffer, uuidToBuffer} from '../protobuf/uuidBufferConvert'
import * as eventstoreError from '../errors'
import * as model from '../protobuf/model'
import {JSONValue} from '../JSON'

const protobuf = model.eventstore.proto

/**
 * Represents a single event
 *
 * @export
 * @class Event
 */
export class Event {
  /** streamId */
  public streamId: string | null = null
  /** event number in stream */
  public eventNumber: Long | number | null = null
  /** unique event uuid4 */
  protected eventId: string = uuid()
  /** event type = name of event */
  protected eventType: string
  /** flag if data is type of json */
  protected dataContentType: number = 1
  /** flag if metadata is type of json */
  protected metadataContentType: number = 1
  /** raw buffer representation of data */
  protected rawData: Uint8Array | null = null
  /** raw buffer representation of metadata */
  protected rawMetadata: Uint8Array | null = null
  /** js object  representation of data */
  protected objectData: {[k: string]: JSONValue} | null = null
  /** js object  representation of metadata */
  protected objectMetadata:
    | {
        $correlationId?: string
        $causationId?: string
      } & {[k: string]: JSONValue}
    | null = null
  /** creation date as timestamp */
  protected objectCreated: number | Long | null = null
  /** creation date as timestamp */
  protected objectCreatedEpoch: number | Long | null = null
  /** events correlation uuid4 */
  protected objectCorrelationId: string | null = null
  /** events causation uuid4 */
  protected objectCausationId: string | null = null
  /** indicates if event was written to eventstore */
  protected frozen: boolean = false

  /**
   *Creates an instance of Event.
   * @param {string} eventType
   * @param {{}} [data]
   * @param {{}} [metadata]
   * @memberof Event
   */
  public constructor(eventType: string, data?: {}, metadata?: {}) {
    this.eventType = eventType
    this.objectData = data ? data : null
    this.objectMetadata = metadata ? metadata : null
  }

  /**
   * Freezes event instance.
   * Done when this event is already stored at eventstore.
   *
   * @memberof Event
   */
  public freeze(): void {
    this.frozen = true
    Object.freeze(this.objectData)
    Object.freeze(this.objectMetadata)
  }

  /**
   * Returns true if event is not stored at eventstore and false if event was written to eventstore
   *
   * @returns {boolean}
   * @memberof Event
   */
  public isNew(): boolean {
    return !this.frozen
  }

  /**
   * Helper function to throw while changing an event which is already stored in eventstore
   *
   * @protected
   * @memberof Event
   * @throws {EventstoreOperationError}
   */
  protected throwIfNotNewEvent(fieldName: string): void {
    if (this.frozen) {
      throw eventstoreError.newOperationError(
        `Chaning of ${fieldName} is not allowed for stored events`
      )
    }
  }

  /**
   * Setter for event id
   *
   * @param {string} newId - new id to be assigned to event
   * @memberof Event
   */
  public set id(newId: string) {
    this.throwIfNotNewEvent('eventId')
    this.eventId = newId
  }

  /**
   * Getter for event id
   *
   * @readonly
   * @type {string}
   * @memberof Event
   */
  public get id(): string {
    return this.eventId
  }

  /**
   * Getter for event data
   *
   * @type {object}
   * @memberof Event
   */
  public get data(): {[k: string]: JSONValue} {
    if (this.objectData) {
      return this.objectData
    }
    if (this.rawData) {
      this.objectData = JSON.parse(Buffer.from(this.rawData).toString())
    }
    return this.objectData || {}
  }

  /**
   * Sets data
   */
  public set data(newData: {[k: string]: JSONValue}) {
    this.throwIfNotNewEvent('eventData')
    //add as new object to prevent unwanted changes
    this.objectData = {...newData}
  }

  /**
   * Getter for event metadata
   *
   * @type {object|null)}
   * @memberof Event
   */
  public get metadata():
    | {$correlationId?: string; $causationId?: string} & {[k: string]: JSONValue}
    | null {
    if (this.objectMetadata) {
      return this.objectMetadata
    }
    if (this.rawMetadata) {
      this.objectMetadata = JSON.parse(Buffer.from(this.rawMetadata).toString())
    }
    return this.objectMetadata
  }

  /**
   * Setter for event metadata
   *
   * @memberof Event
   */
  public set metadata(
    newMetadata: {$correlationId?: string; $causationId?: string} & {[k: string]: JSONValue} | null
  ) {
    this.throwIfNotNewEvent('eventMetadata')
    //add as new object to prevent unwanted changes
    this.objectMetadata = {...newMetadata}
  }

  /**
   * Setter for event correlationId
   *
   * @memberof Event
   */
  public set correlationId(newCorrelationId: string | null) {
    this.throwIfNotNewEvent('correlationId')
    if (!newCorrelationId) {
      this.objectCorrelationId = newCorrelationId
      if (this.objectMetadata && this.objectMetadata.$correlationId) {
        delete this.objectMetadata.$correlationId
      }
      return
    }
    this.objectCorrelationId = newCorrelationId
    if (this.metadata) {
      this.metadata.$correlationId = this.objectCorrelationId
    } else {
      this.metadata = {$correlationId: this.objectCorrelationId}
    }
  }

  /**
   * Getter for event correlationId
   *
   * @type {(string | null)}
   * @memberof Event
   */
  public get correlationId(): string | null {
    if (this.metadata) {
      this.objectCorrelationId = this.metadata.$correlationId || null
    }
    return this.objectCorrelationId
  }

  /**
   * Setter for event causationId
   *
   * @memberof Event
   */
  public set causationId(newCausationId: string | null) {
    this.throwIfNotNewEvent('causationId')
    if (!newCausationId) {
      this.objectCausationId = newCausationId
      if (this.objectMetadata && this.objectMetadata.$causationId) {
        delete this.objectMetadata.$causationId
      }
      return
    }
    this.objectCausationId = newCausationId
    if (this.metadata) {
      this.metadata.$causationId = this.objectCausationId
    } else {
      this.metadata = {$causationId: this.objectCausationId}
    }
  }

  /**
   * Getter for event causationId
   *
   * @type {(string | null)}
   * @memberof Event
   */
  public get causationId(): string | null {
    if (this.metadata) {
      this.objectCausationId = this.metadata.$causationId || null
    }
    return this.objectCausationId
  }

  /**
   * Returns a new instance of {Event} from protobuf result
   *
   * @static
   * @param {model.eventstore.proto.IEventRecord} rawEvent
   * @returns {Event}
   * @memberof Event
   */
  public static fromRaw(rawEvent: model.eventstore.proto.IEventRecord | null | undefined): Event {
    if (!rawEvent) {
      throw eventstoreError.newProtocolError('No event or link was given at Event.fromRaw')
    }
    const event = new Event(rawEvent.eventType)
    event.streamId = rawEvent.eventStreamId
    event.eventNumber = rawEvent.eventNumber
    event.eventId = uuidFromBuffer(Buffer.from(rawEvent.eventId))
    event.dataContentType = rawEvent.dataContentType
    event.rawData = rawEvent.data
    event.rawMetadata = rawEvent.metadata || null
    event.objectCreated = rawEvent.created ? rawEvent.created : null
    event.objectCreatedEpoch = rawEvent.createdEpoch ? rawEvent.createdEpoch : null
    event.freeze()
    return event
  }

  /**
   * Returns protobuf representation of this event
   *
   * @returns {model.eventstore.proto.NewEvent}
   * @memberof Event
   */
  public toRaw(): model.eventstore.proto.NewEvent {
    const newEvent = {
      eventId: uuidToBuffer(this.eventId),
      eventType: this.eventType,
      data: Buffer.from(JSON.stringify(this.data)),
      metadata: this.metadata ? Buffer.from(JSON.stringify(this.metadata)) : null
    }
    return protobuf.NewEvent.fromObject(newEvent)
  }

  /**
   * Setter for name
   *
   * @memberof Event
   */
  public set name(newName: string) {
    this.throwIfNotNewEvent('name')
    this.eventType = newName
  }

  /**
   * Getter for event name
   *
   * @readonly
   * @type {string}
   * @memberof Event
   */
  public get name(): string {
    return this.eventType
  }
}
