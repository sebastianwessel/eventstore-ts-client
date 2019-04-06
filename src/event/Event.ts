import Long from 'long'
import uuid = require('uuid/v4')
import {uuidFromBuffer, uuidToBuffer} from '../protobuf/uuidBufferConvert'
import * as eventstoreError from '../errors'
import * as model from '../protobuf/model'

const protobuf = model.eventstore.proto

export class Event {
  protected eventStreamId: string | null = null
  protected eventNumber: Long | number | null = null
  protected eventId: string = uuid()
  protected eventType: string
  protected dataContentType: number | null = null
  protected metadataContentType: number | null = null
  protected data: object = {}
  protected metadata:
    | {
        $correlationId?: string
        $causationId?: string
      } & {[k: string]: string | number | boolean | object | Long | Date}
    | null = null
  protected created: number | Long | null = null
  protected createdEpoch: number | Long | null = null
  protected correlationId: string | null = null
  protected causationId: string | null = null

  public isNew: boolean = true

  public constructor(eventType: string, data: {} = {}, metadata?: {}) {
    this.eventType = eventType
    this.data = data
    this.metadata = metadata ? metadata : null
  }

  public getStreamId(): string | null {
    return this.eventStreamId
  }

  public getEventNumber(): Long | number | null {
    return this.eventNumber
  }

  public getEventId(): string {
    return this.eventId
  }

  public setEventId(newId: string): void {
    if (!this.isNew) {
      throw eventstoreError.newEventstoreOperationError(
        'Chaning of eventId is not allowed for stored events'
      )
    }
    this.eventId = newId
  }

  public getData(): {} {
    return this.data
  }

  public setData(newData: {}): void {
    if (!this.isNew) {
      throw eventstoreError.newEventstoreOperationError(
        'Chaning of event data is not allowed for stored events'
      )
    }
    this.data = newData
  }

  public getMetadata(): {} | null {
    return this.metadata
  }

  public setMetadata(newMetadata: {}): void {
    if (!this.isNew) {
      throw eventstoreError.newEventstoreOperationError(
        'Chaning of event metadata is not allowed for stored events'
      )
    }
    this.metadata = newMetadata
  }

  public getCreated(): number | Long | null {
    return this.created
  }

  public getCreatedEpoch(): number | Long | null {
    return this.createdEpoch
  }

  public getCorrelationId(): string | null {
    return this.correlationId
  }

  public setCorrelationId(correlationId: string): void {
    if (!this.isNew) {
      throw eventstoreError.newEventstoreOperationError(
        'Chaning of event correlationId is not allowed for stored events'
      )
    }
    this.correlationId = correlationId
  }

  public getCausationId(): string | null {
    return this.causationId
  }

  public setCausationId(causationId: string): void {
    if (!this.isNew) {
      throw eventstoreError.newEventstoreOperationError(
        'Chaning of event causationId is not allowed for stored events'
      )
    }
    this.causationId = causationId
  }

  public fromRaw(rawEvent: model.eventstore.proto.IEventRecord): void {
    this.isNew = false
    this.eventStreamId = rawEvent.eventStreamId
    this.eventNumber = rawEvent.eventNumber
    this.eventId = uuidFromBuffer(Buffer.from(rawEvent.eventId))
    this.eventType = rawEvent.eventType
    this.dataContentType = rawEvent.dataContentType
    this.data = JSON.parse(Buffer.from(rawEvent.data).toString())
    this.metadata = rawEvent.metadata ? JSON.parse(Buffer.from(rawEvent.metadata).toString()) : null
    this.created = rawEvent.created ? rawEvent.created : null
    this.createdEpoch = rawEvent.createdEpoch ? rawEvent.createdEpoch : null
    if (this.metadata) {
      this.correlationId = this.metadata.$correlationId ? this.metadata.$correlationId : null
    }
  }

  public toRaw(): model.eventstore.proto.NewEvent {
    if (this.correlationId) {
      this.metadata = this.metadata ? this.metadata : {}
      this.metadata.$correlationId = this.correlationId
      if (this.causationId) {
        this.metadata.$causationId = this.causationId
      }
    }

    const newEvent = {
      eventId: uuidToBuffer(this.eventId),
      eventType: this.eventType,
      data: this.data,
      metadata: this.metadata
    }

    return protobuf.NewEvent.fromObject(newEvent)
  }

  public get name(): string {
    return this.eventType
  }
}
