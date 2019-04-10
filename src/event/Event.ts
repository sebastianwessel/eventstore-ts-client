import Long from 'long'
import uuid = require('uuid/v4')
import {uuidFromBuffer, uuidToBuffer} from '../protobuf/uuidBufferConvert'
import * as eventstoreError from '../errors'
import * as model from '../protobuf/model'

const protobuf = model.eventstore.proto

export class Event {
  public streamId: string | null = null
  public eventNumber: Long | number | null = null
  protected eventId: string = uuid()
  protected eventType: string
  protected dataContentType: number | null = null
  protected metadataContentType: number | null = null
  protected rawData: Uint8Array | null = null
  protected rawMetadata: Uint8Array | null = null
  protected objectData: object | null = null
  protected objectMetadata:
    | {
        $correlationId?: string
        $causationId?: string
      } & {[k: string]: string | number | boolean | object | Long | Date}
    | null = null
  protected objectCreated: number | Long | null = null
  protected objectCreatedEpoch: number | Long | null = null
  protected objectCorrelationId: string | null = null
  protected objectCausationId: string | null = null

  protected frozen: boolean = false

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
   * Helper function to throw while changeing an event which is already stored in eventstore
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
  public get data(): {} {
    if (this.objectData) {
      return this.objectData
    }
    if (this.rawData) {
      this.objectData = JSON.parse(Buffer.from(this.rawData).toString())
    }
    return this.objectData || {}
  }

  /**
   * Setter for event data
   *
   * @memberof Event
   */
  public set data(newData: {}) {
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
    | {$correlationId?: string; $causationId?: string} & {
        [k: string]: string | number | boolean | object | Long | Date
      }
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
    newMetadata:
      | {$correlationId?: string; $causationId?: string} & {
          [k: string]: string | number | boolean | object | Long | Date
        }
      | null
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
  public static fromRaw(rawEvent: model.eventstore.proto.IEventRecord): Event {
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
      data: this.data,
      metadata: this.metadata
    }

    return protobuf.NewEvent.fromObject(newEvent)
  }

  /**
   * Setter for name
   *
   * @memberof Event
   */
  public set name(newName: string) {
    this.throwIfNotNewEvent('causationId')
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
