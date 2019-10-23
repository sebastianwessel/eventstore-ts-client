import Long from 'long'
import uuid = require('uuid/v4')
import {uuidFromBuffer, uuidToBuffer} from '../protobuf/uuidBufferConvert'
import * as eventstoreError from '../errors'
import * as model from '../protobuf/model'
import {JSONValue} from '../JSON'

/** protobuf shorthand */
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
  public rawData: Uint8Array | null = null
  /** raw buffer representation of metadata */
  public rawMetadata: Uint8Array | null = null
  /** js object  representation of data */
  protected objectData: {[k: string]: JSONValue} | null = null
  /** js object  representation of metadata */
  protected objectMetadata:
    | {
        $correlationId?: string
      } & {[k: string]: JSONValue}
    | null = null
  /** creation date as timestamp */
  protected objectCreated: number | Long | null = null
  /** creation date as timestamp */
  protected objectCreatedEpoch: number | Long | null = null
  /** events correlation uuid4 */
  protected objectCorrelationId: string | null = null

  /** indicates if event was written to eventstore */
  protected frozen: boolean = false
  /** indicates if its an event or a link which must be resolved */
  protected isResolved = true

  /**
   * Creates an instance of Event.
   */
  public constructor(eventType: string, data?: {}, metadata?: {}) {
    this.eventType = eventType
    this.objectData = data ? data : null
    this.objectMetadata = metadata ? metadata : null
  }

  /**
   * Freezes event instance.
   * Done when this event is already stored at eventstore.
   */
  public freeze(): void {
    this.frozen = true
    Object.freeze(this.objectData)
    Object.freeze(this.objectMetadata)
  }

  /**
   * Returns true if event is not stored at eventstore and false if event was written to eventstore
   */
  public isNew(): boolean {
    return !this.frozen
  }

  /**
   * Helper function to throw while changing an event which is already stored in eventstore
   */
  protected throwIfNotNewEvent(fieldName: string): void {
    if (this.frozen) {
      throw eventstoreError.newOperationError(
        `Changing of ${fieldName} is not allowed for stored events`
      )
    }
  }

  /**
   * Setter for event id
   */
  public set id(newId: string) {
    this.throwIfNotNewEvent('eventId')
    this.eventId = newId
  }

  /**
   * Getter for event id
   */
  public get id(): string {
    return this.eventId
  }

  /**
   * Returns true if event is a link and not a full resolved event
   */
  public isLink(): boolean {
    return !this.isResolved
  }

  /**
   * Getter for event data
   */
  public get data(): {[k: string]: JSONValue} | string {
    if (this.objectData) {
      return this.objectData
    }
    if (this.rawData && !this.isLink()) {
      this.objectData = JSON.parse(Buffer.from(this.rawData).toString())
    } else if (this.rawData && this.isLink()) {
      return Buffer.from(this.rawData).toString()
    }
    return this.objectData || {}
  }

  /**
   * Sets data
   */
  public set data(newData: {[k: string]: JSONValue} | string) {
    this.throwIfNotNewEvent('eventData')
    //add as new object to prevent unwanted changes
    this.objectData = typeof newData === 'string' ? JSON.parse(newData) : {...newData}
  }

  /**
   * Getter for event metadata
   */
  public get metadata(): {$correlationId?: string} & {[k: string]: JSONValue} | null | string {
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
   */
  public set metadata(
    newMetadata: {$correlationId?: string} & {[k: string]: JSONValue} | null | string
  ) {
    this.throwIfNotNewEvent('eventMetadata')
    //add as new object to prevent unwanted changes
    this.objectMetadata =
      typeof newMetadata === 'string' ? JSON.parse(newMetadata) : {...newMetadata}

    if (this.objectCorrelationId && typeof this.metadata === 'object') {
      this.metadata = {...this.metadata, $correlationId: this.objectCorrelationId}
    }
  }

  /**
   * Setter for event correlationId
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
    if (this.metadata && typeof this.metadata !== 'string' && this.metadata.$correlationId) {
      this.metadata.$correlationId = this.objectCorrelationId
    } else {
      this.metadata = {$correlationId: this.objectCorrelationId}
    }
  }

  /**
   * Getter for event correlationId
   */
  public get correlationId(): string | null {
    if (this.metadata && typeof this.metadata !== 'string') {
      this.objectCorrelationId = this.metadata.$correlationId || null
    }
    return this.objectCorrelationId
  }

  /**
   * Returns a new new instance of Event with correlation id set to currents events correlation id or id
   */
  public causesEvent(eventType: string, data?: {}, metadata?: {}): Event {
    const childEvent = new Event(eventType, data, metadata)
    childEvent.correlationId = this.correlationId || this.id
    return childEvent
  }

  /**
   * Returns a new instance of Event from protobuf result
   */
  public static fromRaw(rawEvent: model.eventstore.proto.IEventRecord | null | undefined): Event {
    if (!rawEvent) {
      throw eventstoreError.newProtocolError('No event or link was given at Event.fromRaw')
    }
    const event = new Event(rawEvent.eventType)
    if (rawEvent.eventType === '$>' || rawEvent.eventType === '$@') {
      //is linked event
      event.isResolved = false
    }
    event.streamId = rawEvent.eventStreamId
    event.eventNumber = rawEvent.eventNumber
    event.eventId = uuidFromBuffer(Buffer.from(rawEvent.eventId))
    event.dataContentType = rawEvent.dataContentType
    event.rawData = rawEvent.data
    event.rawMetadata = rawEvent.metadata || null
    event.metadataContentType = rawEvent.metadataContentType
    event.objectCreated = rawEvent.created ? rawEvent.created : null
    event.objectCreatedEpoch = rawEvent.createdEpoch ? rawEvent.createdEpoch : null
    event.freeze()
    return event
  }

  /**
   * Returns protobuf representation of this event
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
   */
  public set name(newName: string) {
    this.throwIfNotNewEvent('name')
    this.eventType = newName
  }

  /**
   * Getter for event name
   */
  public get name(): string {
    return this.eventType
  }
}
