import * as $protobuf from 'protobufjs'
/** Namespace eventstore. */
export namespace eventstore {
  /** Namespace proto. */
  namespace proto {
    /** OperationResult enum. */
    enum OperationResult {
      Success = 0,
      PrepareTimeout = 1,
      CommitTimeout = 2,
      ForwardTimeout = 3,
      WrongExpectedVersion = 4,
      StreamDeleted = 5,
      InvalidTransaction = 6,
      AccessDenied = 7
    }

    /** Properties of a NewEvent. */
    interface INewEvent {
      /** NewEvent eventId */
      eventId: Uint8Array

      /** NewEvent eventType */
      eventType: string

      /** NewEvent dataContentType */
      dataContentType: number

      /** NewEvent metadataContentType */
      metadataContentType: number

      /** NewEvent data */
      data: Uint8Array

      /** NewEvent metadata */
      metadata?: Uint8Array | null
    }

    /** Represents a NewEvent. */
    class NewEvent implements INewEvent {
      /**
       * Constructs a new NewEvent.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.INewEvent)

      /** NewEvent eventId. */
      public eventId: Uint8Array

      /** NewEvent eventType. */
      public eventType: string

      /** NewEvent dataContentType. */
      public dataContentType: number

      /** NewEvent metadataContentType. */
      public metadataContentType: number

      /** NewEvent data. */
      public data: Uint8Array

      /** NewEvent metadata. */
      public metadata: Uint8Array

      /**
       * Creates a new NewEvent instance using the specified properties.
       * @param [properties] Properties to set
       * @returns NewEvent instance
       */
      public static create(properties?: eventstore.proto.INewEvent): eventstore.proto.NewEvent

      /**
       * Encodes the specified NewEvent message. Does not implicitly {@link eventstore.proto.NewEvent.verify|verify} messages.
       * @param message NewEvent message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.INewEvent,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified NewEvent message, length delimited. Does not implicitly {@link eventstore.proto.NewEvent.verify|verify} messages.
       * @param message NewEvent message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.INewEvent,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a NewEvent message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns NewEvent
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.NewEvent

      /**
       * Decodes a NewEvent message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns NewEvent
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.NewEvent

      /**
       * Verifies a NewEvent message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a NewEvent message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns NewEvent
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.NewEvent

      /**
       * Creates a plain object from a NewEvent message. Also converts values to other types if specified.
       * @param message NewEvent
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.NewEvent,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this NewEvent to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of an EventRecord. */
    interface IEventRecord {
      /** EventRecord eventStreamId */
      eventStreamId: string

      /** EventRecord eventNumber */
      eventNumber: number | Long

      /** EventRecord eventId */
      eventId: Uint8Array

      /** EventRecord eventType */
      eventType: string

      /** EventRecord dataContentType */
      dataContentType: number

      /** EventRecord metadataContentType */
      metadataContentType: number

      /** EventRecord data */
      data: Uint8Array

      /** EventRecord metadata */
      metadata?: Uint8Array | null

      /** EventRecord created */
      created?: number | Long | null

      /** EventRecord createdEpoch */
      createdEpoch?: number | Long | null
    }

    /** Represents an EventRecord. */
    class EventRecord implements IEventRecord {
      /**
       * Constructs a new EventRecord.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IEventRecord)

      /** EventRecord eventStreamId. */
      public eventStreamId: string

      /** EventRecord eventNumber. */
      public eventNumber: number | Long

      /** EventRecord eventId. */
      public eventId: Uint8Array

      /** EventRecord eventType. */
      public eventType: string

      /** EventRecord dataContentType. */
      public dataContentType: number

      /** EventRecord metadataContentType. */
      public metadataContentType: number

      /** EventRecord data. */
      public data: Uint8Array

      /** EventRecord metadata. */
      public metadata: Uint8Array

      /** EventRecord created. */
      public created: number | Long

      /** EventRecord createdEpoch. */
      public createdEpoch: number | Long

      /**
       * Creates a new EventRecord instance using the specified properties.
       * @param [properties] Properties to set
       * @returns EventRecord instance
       */
      public static create(properties?: eventstore.proto.IEventRecord): eventstore.proto.EventRecord

      /**
       * Encodes the specified EventRecord message. Does not implicitly {@link eventstore.proto.EventRecord.verify|verify} messages.
       * @param message EventRecord message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IEventRecord,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified EventRecord message, length delimited. Does not implicitly {@link eventstore.proto.EventRecord.verify|verify} messages.
       * @param message EventRecord message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IEventRecord,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes an EventRecord message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns EventRecord
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.EventRecord

      /**
       * Decodes an EventRecord message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns EventRecord
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.EventRecord

      /**
       * Verifies an EventRecord message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates an EventRecord message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns EventRecord
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.EventRecord

      /**
       * Creates a plain object from an EventRecord message. Also converts values to other types if specified.
       * @param message EventRecord
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.EventRecord,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this EventRecord to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a ResolvedIndexedEvent. */
    interface IResolvedIndexedEvent {
      /** ResolvedIndexedEvent event */
      event?: eventstore.proto.IEventRecord | null

      /** ResolvedIndexedEvent link */
      link?: eventstore.proto.IEventRecord | null
    }

    /** Represents a ResolvedIndexedEvent. */
    class ResolvedIndexedEvent implements IResolvedIndexedEvent {
      /**
       * Constructs a new ResolvedIndexedEvent.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IResolvedIndexedEvent)

      /** ResolvedIndexedEvent event. */
      public event?: eventstore.proto.IEventRecord | null

      /** ResolvedIndexedEvent link. */
      public link?: eventstore.proto.IEventRecord | null

      /**
       * Creates a new ResolvedIndexedEvent instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ResolvedIndexedEvent instance
       */
      public static create(
        properties?: eventstore.proto.IResolvedIndexedEvent
      ): eventstore.proto.ResolvedIndexedEvent

      /**
       * Encodes the specified ResolvedIndexedEvent message. Does not implicitly {@link eventstore.proto.ResolvedIndexedEvent.verify|verify} messages.
       * @param message ResolvedIndexedEvent message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IResolvedIndexedEvent,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ResolvedIndexedEvent message, length delimited. Does not implicitly {@link eventstore.proto.ResolvedIndexedEvent.verify|verify} messages.
       * @param message ResolvedIndexedEvent message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IResolvedIndexedEvent,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ResolvedIndexedEvent message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ResolvedIndexedEvent
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ResolvedIndexedEvent

      /**
       * Decodes a ResolvedIndexedEvent message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ResolvedIndexedEvent
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ResolvedIndexedEvent

      /**
       * Verifies a ResolvedIndexedEvent message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ResolvedIndexedEvent message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ResolvedIndexedEvent
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.ResolvedIndexedEvent

      /**
       * Creates a plain object from a ResolvedIndexedEvent message. Also converts values to other types if specified.
       * @param message ResolvedIndexedEvent
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ResolvedIndexedEvent,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ResolvedIndexedEvent to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a ResolvedEvent. */
    interface IResolvedEvent {
      /** ResolvedEvent event */
      event?: eventstore.proto.IEventRecord | null

      /** ResolvedEvent link */
      link?: eventstore.proto.IEventRecord | null

      /** ResolvedEvent commitPosition */
      commitPosition: number | Long

      /** ResolvedEvent preparePosition */
      preparePosition: number | Long
    }

    /** Represents a ResolvedEvent. */
    class ResolvedEvent implements IResolvedEvent {
      /**
       * Constructs a new ResolvedEvent.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IResolvedEvent)

      /** ResolvedEvent event. */
      public event?: eventstore.proto.IEventRecord | null

      /** ResolvedEvent link. */
      public link?: eventstore.proto.IEventRecord | null

      /** ResolvedEvent commitPosition. */
      public commitPosition: number | Long

      /** ResolvedEvent preparePosition. */
      public preparePosition: number | Long

      /**
       * Creates a new ResolvedEvent instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ResolvedEvent instance
       */
      public static create(
        properties?: eventstore.proto.IResolvedEvent
      ): eventstore.proto.ResolvedEvent

      /**
       * Encodes the specified ResolvedEvent message. Does not implicitly {@link eventstore.proto.ResolvedEvent.verify|verify} messages.
       * @param message ResolvedEvent message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IResolvedEvent,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ResolvedEvent message, length delimited. Does not implicitly {@link eventstore.proto.ResolvedEvent.verify|verify} messages.
       * @param message ResolvedEvent message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IResolvedEvent,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ResolvedEvent message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ResolvedEvent
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ResolvedEvent

      /**
       * Decodes a ResolvedEvent message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ResolvedEvent
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ResolvedEvent

      /**
       * Verifies a ResolvedEvent message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ResolvedEvent message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ResolvedEvent
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.ResolvedEvent

      /**
       * Creates a plain object from a ResolvedEvent message. Also converts values to other types if specified.
       * @param message ResolvedEvent
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ResolvedEvent,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ResolvedEvent to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a WriteEvents. */
    interface IWriteEvents {
      /** WriteEvents eventStreamId */
      eventStreamId: string

      /** WriteEvents expectedVersion */
      expectedVersion: number | Long

      /** WriteEvents events */
      events?: eventstore.proto.INewEvent[] | null

      /** WriteEvents requireMaster */
      requireMaster: boolean
    }

    /** Represents a WriteEvents. */
    class WriteEvents implements IWriteEvents {
      /**
       * Constructs a new WriteEvents.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IWriteEvents)

      /** WriteEvents eventStreamId. */
      public eventStreamId: string

      /** WriteEvents expectedVersion. */
      public expectedVersion: number | Long

      /** WriteEvents events. */
      public events: eventstore.proto.INewEvent[]

      /** WriteEvents requireMaster. */
      public requireMaster: boolean

      /**
       * Creates a new WriteEvents instance using the specified properties.
       * @param [properties] Properties to set
       * @returns WriteEvents instance
       */
      public static create(properties?: eventstore.proto.IWriteEvents): eventstore.proto.WriteEvents

      /**
       * Encodes the specified WriteEvents message. Does not implicitly {@link eventstore.proto.WriteEvents.verify|verify} messages.
       * @param message WriteEvents message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IWriteEvents,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified WriteEvents message, length delimited. Does not implicitly {@link eventstore.proto.WriteEvents.verify|verify} messages.
       * @param message WriteEvents message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IWriteEvents,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a WriteEvents message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns WriteEvents
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.WriteEvents

      /**
       * Decodes a WriteEvents message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns WriteEvents
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.WriteEvents

      /**
       * Verifies a WriteEvents message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a WriteEvents message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns WriteEvents
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.WriteEvents

      /**
       * Creates a plain object from a WriteEvents message. Also converts values to other types if specified.
       * @param message WriteEvents
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.WriteEvents,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this WriteEvents to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a WriteEventsCompleted. */
    interface IWriteEventsCompleted {
      /** WriteEventsCompleted result */
      result: eventstore.proto.OperationResult

      /** WriteEventsCompleted message */
      message?: string | null

      /** WriteEventsCompleted firstEventNumber */
      firstEventNumber: number | Long

      /** WriteEventsCompleted lastEventNumber */
      lastEventNumber: number | Long

      /** WriteEventsCompleted preparePosition */
      preparePosition?: number | Long | null

      /** WriteEventsCompleted commitPosition */
      commitPosition?: number | Long | null
    }

    /** Represents a WriteEventsCompleted. */
    class WriteEventsCompleted implements IWriteEventsCompleted {
      /**
       * Constructs a new WriteEventsCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IWriteEventsCompleted)

      /** WriteEventsCompleted result. */
      public result: eventstore.proto.OperationResult

      /** WriteEventsCompleted message. */
      public message: string

      /** WriteEventsCompleted firstEventNumber. */
      public firstEventNumber: number | Long

      /** WriteEventsCompleted lastEventNumber. */
      public lastEventNumber: number | Long

      /** WriteEventsCompleted preparePosition. */
      public preparePosition: number | Long

      /** WriteEventsCompleted commitPosition. */
      public commitPosition: number | Long

      /**
       * Creates a new WriteEventsCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns WriteEventsCompleted instance
       */
      public static create(
        properties?: eventstore.proto.IWriteEventsCompleted
      ): eventstore.proto.WriteEventsCompleted

      /**
       * Encodes the specified WriteEventsCompleted message. Does not implicitly {@link eventstore.proto.WriteEventsCompleted.verify|verify} messages.
       * @param message WriteEventsCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IWriteEventsCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified WriteEventsCompleted message, length delimited. Does not implicitly {@link eventstore.proto.WriteEventsCompleted.verify|verify} messages.
       * @param message WriteEventsCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IWriteEventsCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a WriteEventsCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns WriteEventsCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.WriteEventsCompleted

      /**
       * Decodes a WriteEventsCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns WriteEventsCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.WriteEventsCompleted

      /**
       * Verifies a WriteEventsCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a WriteEventsCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns WriteEventsCompleted
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.WriteEventsCompleted

      /**
       * Creates a plain object from a WriteEventsCompleted message. Also converts values to other types if specified.
       * @param message WriteEventsCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.WriteEventsCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this WriteEventsCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a DeleteStream. */
    interface IDeleteStream {
      /** DeleteStream eventStreamId */
      eventStreamId: string

      /** DeleteStream expectedVersion */
      expectedVersion: number | Long

      /** DeleteStream requireMaster */
      requireMaster: boolean

      /** DeleteStream hardDelete */
      hardDelete?: boolean | null
    }

    /** Represents a DeleteStream. */
    class DeleteStream implements IDeleteStream {
      /**
       * Constructs a new DeleteStream.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IDeleteStream)

      /** DeleteStream eventStreamId. */
      public eventStreamId: string

      /** DeleteStream expectedVersion. */
      public expectedVersion: number | Long

      /** DeleteStream requireMaster. */
      public requireMaster: boolean

      /** DeleteStream hardDelete. */
      public hardDelete: boolean

      /**
       * Creates a new DeleteStream instance using the specified properties.
       * @param [properties] Properties to set
       * @returns DeleteStream instance
       */
      public static create(
        properties?: eventstore.proto.IDeleteStream
      ): eventstore.proto.DeleteStream

      /**
       * Encodes the specified DeleteStream message. Does not implicitly {@link eventstore.proto.DeleteStream.verify|verify} messages.
       * @param message DeleteStream message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IDeleteStream,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified DeleteStream message, length delimited. Does not implicitly {@link eventstore.proto.DeleteStream.verify|verify} messages.
       * @param message DeleteStream message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IDeleteStream,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a DeleteStream message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns DeleteStream
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.DeleteStream

      /**
       * Decodes a DeleteStream message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns DeleteStream
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.DeleteStream

      /**
       * Verifies a DeleteStream message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a DeleteStream message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns DeleteStream
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.DeleteStream

      /**
       * Creates a plain object from a DeleteStream message. Also converts values to other types if specified.
       * @param message DeleteStream
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.DeleteStream,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this DeleteStream to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a DeleteStreamCompleted. */
    interface IDeleteStreamCompleted {
      /** DeleteStreamCompleted result */
      result: eventstore.proto.OperationResult

      /** DeleteStreamCompleted message */
      message?: string | null

      /** DeleteStreamCompleted preparePosition */
      preparePosition?: number | Long | null

      /** DeleteStreamCompleted commitPosition */
      commitPosition?: number | Long | null
    }

    /** Represents a DeleteStreamCompleted. */
    class DeleteStreamCompleted implements IDeleteStreamCompleted {
      /**
       * Constructs a new DeleteStreamCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IDeleteStreamCompleted)

      /** DeleteStreamCompleted result. */
      public result: eventstore.proto.OperationResult

      /** DeleteStreamCompleted message. */
      public message: string

      /** DeleteStreamCompleted preparePosition. */
      public preparePosition: number | Long

      /** DeleteStreamCompleted commitPosition. */
      public commitPosition: number | Long

      /**
       * Creates a new DeleteStreamCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns DeleteStreamCompleted instance
       */
      public static create(
        properties?: eventstore.proto.IDeleteStreamCompleted
      ): eventstore.proto.DeleteStreamCompleted

      /**
       * Encodes the specified DeleteStreamCompleted message. Does not implicitly {@link eventstore.proto.DeleteStreamCompleted.verify|verify} messages.
       * @param message DeleteStreamCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IDeleteStreamCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified DeleteStreamCompleted message, length delimited. Does not implicitly {@link eventstore.proto.DeleteStreamCompleted.verify|verify} messages.
       * @param message DeleteStreamCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IDeleteStreamCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a DeleteStreamCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns DeleteStreamCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.DeleteStreamCompleted

      /**
       * Decodes a DeleteStreamCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns DeleteStreamCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.DeleteStreamCompleted

      /**
       * Verifies a DeleteStreamCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a DeleteStreamCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns DeleteStreamCompleted
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.DeleteStreamCompleted

      /**
       * Creates a plain object from a DeleteStreamCompleted message. Also converts values to other types if specified.
       * @param message DeleteStreamCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.DeleteStreamCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this DeleteStreamCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a TransactionStart. */
    interface ITransactionStart {
      /** TransactionStart eventStreamId */
      eventStreamId: string

      /** TransactionStart expectedVersion */
      expectedVersion: number | Long

      /** TransactionStart requireMaster */
      requireMaster: boolean
    }

    /** Represents a TransactionStart. */
    class TransactionStart implements ITransactionStart {
      /**
       * Constructs a new TransactionStart.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ITransactionStart)

      /** TransactionStart eventStreamId. */
      public eventStreamId: string

      /** TransactionStart expectedVersion. */
      public expectedVersion: number | Long

      /** TransactionStart requireMaster. */
      public requireMaster: boolean

      /**
       * Creates a new TransactionStart instance using the specified properties.
       * @param [properties] Properties to set
       * @returns TransactionStart instance
       */
      public static create(
        properties?: eventstore.proto.ITransactionStart
      ): eventstore.proto.TransactionStart

      /**
       * Encodes the specified TransactionStart message. Does not implicitly {@link eventstore.proto.TransactionStart.verify|verify} messages.
       * @param message TransactionStart message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ITransactionStart,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified TransactionStart message, length delimited. Does not implicitly {@link eventstore.proto.TransactionStart.verify|verify} messages.
       * @param message TransactionStart message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ITransactionStart,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a TransactionStart message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns TransactionStart
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.TransactionStart

      /**
       * Decodes a TransactionStart message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns TransactionStart
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.TransactionStart

      /**
       * Verifies a TransactionStart message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a TransactionStart message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns TransactionStart
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.TransactionStart

      /**
       * Creates a plain object from a TransactionStart message. Also converts values to other types if specified.
       * @param message TransactionStart
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.TransactionStart,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this TransactionStart to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a TransactionStartCompleted. */
    interface ITransactionStartCompleted {
      /** TransactionStartCompleted transactionId */
      transactionId: number | Long

      /** TransactionStartCompleted result */
      result: eventstore.proto.OperationResult

      /** TransactionStartCompleted message */
      message?: string | null
    }

    /** Represents a TransactionStartCompleted. */
    class TransactionStartCompleted implements ITransactionStartCompleted {
      /**
       * Constructs a new TransactionStartCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ITransactionStartCompleted)

      /** TransactionStartCompleted transactionId. */
      public transactionId: number | Long

      /** TransactionStartCompleted result. */
      public result: eventstore.proto.OperationResult

      /** TransactionStartCompleted message. */
      public message: string

      /**
       * Creates a new TransactionStartCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns TransactionStartCompleted instance
       */
      public static create(
        properties?: eventstore.proto.ITransactionStartCompleted
      ): eventstore.proto.TransactionStartCompleted

      /**
       * Encodes the specified TransactionStartCompleted message. Does not implicitly {@link eventstore.proto.TransactionStartCompleted.verify|verify} messages.
       * @param message TransactionStartCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ITransactionStartCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified TransactionStartCompleted message, length delimited. Does not implicitly {@link eventstore.proto.TransactionStartCompleted.verify|verify} messages.
       * @param message TransactionStartCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ITransactionStartCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a TransactionStartCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns TransactionStartCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.TransactionStartCompleted

      /**
       * Decodes a TransactionStartCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns TransactionStartCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.TransactionStartCompleted

      /**
       * Verifies a TransactionStartCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a TransactionStartCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns TransactionStartCompleted
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.TransactionStartCompleted

      /**
       * Creates a plain object from a TransactionStartCompleted message. Also converts values to other types if specified.
       * @param message TransactionStartCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.TransactionStartCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this TransactionStartCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a TransactionWrite. */
    interface ITransactionWrite {
      /** TransactionWrite transactionId */
      transactionId: number | Long

      /** TransactionWrite events */
      events?: eventstore.proto.INewEvent[] | null

      /** TransactionWrite requireMaster */
      requireMaster: boolean
    }

    /** Represents a TransactionWrite. */
    class TransactionWrite implements ITransactionWrite {
      /**
       * Constructs a new TransactionWrite.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ITransactionWrite)

      /** TransactionWrite transactionId. */
      public transactionId: number | Long

      /** TransactionWrite events. */
      public events: eventstore.proto.INewEvent[]

      /** TransactionWrite requireMaster. */
      public requireMaster: boolean

      /**
       * Creates a new TransactionWrite instance using the specified properties.
       * @param [properties] Properties to set
       * @returns TransactionWrite instance
       */
      public static create(
        properties?: eventstore.proto.ITransactionWrite
      ): eventstore.proto.TransactionWrite

      /**
       * Encodes the specified TransactionWrite message. Does not implicitly {@link eventstore.proto.TransactionWrite.verify|verify} messages.
       * @param message TransactionWrite message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ITransactionWrite,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified TransactionWrite message, length delimited. Does not implicitly {@link eventstore.proto.TransactionWrite.verify|verify} messages.
       * @param message TransactionWrite message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ITransactionWrite,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a TransactionWrite message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns TransactionWrite
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.TransactionWrite

      /**
       * Decodes a TransactionWrite message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns TransactionWrite
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.TransactionWrite

      /**
       * Verifies a TransactionWrite message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a TransactionWrite message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns TransactionWrite
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.TransactionWrite

      /**
       * Creates a plain object from a TransactionWrite message. Also converts values to other types if specified.
       * @param message TransactionWrite
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.TransactionWrite,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this TransactionWrite to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a TransactionWriteCompleted. */
    interface ITransactionWriteCompleted {
      /** TransactionWriteCompleted transactionId */
      transactionId: number | Long

      /** TransactionWriteCompleted result */
      result: eventstore.proto.OperationResult

      /** TransactionWriteCompleted message */
      message?: string | null
    }

    /** Represents a TransactionWriteCompleted. */
    class TransactionWriteCompleted implements ITransactionWriteCompleted {
      /**
       * Constructs a new TransactionWriteCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ITransactionWriteCompleted)

      /** TransactionWriteCompleted transactionId. */
      public transactionId: number | Long

      /** TransactionWriteCompleted result. */
      public result: eventstore.proto.OperationResult

      /** TransactionWriteCompleted message. */
      public message: string

      /**
       * Creates a new TransactionWriteCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns TransactionWriteCompleted instance
       */
      public static create(
        properties?: eventstore.proto.ITransactionWriteCompleted
      ): eventstore.proto.TransactionWriteCompleted

      /**
       * Encodes the specified TransactionWriteCompleted message. Does not implicitly {@link eventstore.proto.TransactionWriteCompleted.verify|verify} messages.
       * @param message TransactionWriteCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ITransactionWriteCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified TransactionWriteCompleted message, length delimited. Does not implicitly {@link eventstore.proto.TransactionWriteCompleted.verify|verify} messages.
       * @param message TransactionWriteCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ITransactionWriteCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a TransactionWriteCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns TransactionWriteCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.TransactionWriteCompleted

      /**
       * Decodes a TransactionWriteCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns TransactionWriteCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.TransactionWriteCompleted

      /**
       * Verifies a TransactionWriteCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a TransactionWriteCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns TransactionWriteCompleted
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.TransactionWriteCompleted

      /**
       * Creates a plain object from a TransactionWriteCompleted message. Also converts values to other types if specified.
       * @param message TransactionWriteCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.TransactionWriteCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this TransactionWriteCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a TransactionCommit. */
    interface ITransactionCommit {
      /** TransactionCommit transactionId */
      transactionId: number | Long

      /** TransactionCommit requireMaster */
      requireMaster: boolean
    }

    /** Represents a TransactionCommit. */
    class TransactionCommit implements ITransactionCommit {
      /**
       * Constructs a new TransactionCommit.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ITransactionCommit)

      /** TransactionCommit transactionId. */
      public transactionId: number | Long

      /** TransactionCommit requireMaster. */
      public requireMaster: boolean

      /**
       * Creates a new TransactionCommit instance using the specified properties.
       * @param [properties] Properties to set
       * @returns TransactionCommit instance
       */
      public static create(
        properties?: eventstore.proto.ITransactionCommit
      ): eventstore.proto.TransactionCommit

      /**
       * Encodes the specified TransactionCommit message. Does not implicitly {@link eventstore.proto.TransactionCommit.verify|verify} messages.
       * @param message TransactionCommit message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ITransactionCommit,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified TransactionCommit message, length delimited. Does not implicitly {@link eventstore.proto.TransactionCommit.verify|verify} messages.
       * @param message TransactionCommit message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ITransactionCommit,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a TransactionCommit message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns TransactionCommit
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.TransactionCommit

      /**
       * Decodes a TransactionCommit message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns TransactionCommit
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.TransactionCommit

      /**
       * Verifies a TransactionCommit message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a TransactionCommit message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns TransactionCommit
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.TransactionCommit

      /**
       * Creates a plain object from a TransactionCommit message. Also converts values to other types if specified.
       * @param message TransactionCommit
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.TransactionCommit,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this TransactionCommit to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a TransactionCommitCompleted. */
    interface ITransactionCommitCompleted {
      /** TransactionCommitCompleted transactionId */
      transactionId: number | Long

      /** TransactionCommitCompleted result */
      result: eventstore.proto.OperationResult

      /** TransactionCommitCompleted message */
      message?: string | null

      /** TransactionCommitCompleted firstEventNumber */
      firstEventNumber: number | Long

      /** TransactionCommitCompleted lastEventNumber */
      lastEventNumber: number | Long

      /** TransactionCommitCompleted preparePosition */
      preparePosition?: number | Long | null

      /** TransactionCommitCompleted commitPosition */
      commitPosition?: number | Long | null
    }

    /** Represents a TransactionCommitCompleted. */
    class TransactionCommitCompleted implements ITransactionCommitCompleted {
      /**
       * Constructs a new TransactionCommitCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ITransactionCommitCompleted)

      /** TransactionCommitCompleted transactionId. */
      public transactionId: number | Long

      /** TransactionCommitCompleted result. */
      public result: eventstore.proto.OperationResult

      /** TransactionCommitCompleted message. */
      public message: string

      /** TransactionCommitCompleted firstEventNumber. */
      public firstEventNumber: number | Long

      /** TransactionCommitCompleted lastEventNumber. */
      public lastEventNumber: number | Long

      /** TransactionCommitCompleted preparePosition. */
      public preparePosition: number | Long

      /** TransactionCommitCompleted commitPosition. */
      public commitPosition: number | Long

      /**
       * Creates a new TransactionCommitCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns TransactionCommitCompleted instance
       */
      public static create(
        properties?: eventstore.proto.ITransactionCommitCompleted
      ): eventstore.proto.TransactionCommitCompleted

      /**
       * Encodes the specified TransactionCommitCompleted message. Does not implicitly {@link eventstore.proto.TransactionCommitCompleted.verify|verify} messages.
       * @param message TransactionCommitCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ITransactionCommitCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified TransactionCommitCompleted message, length delimited. Does not implicitly {@link eventstore.proto.TransactionCommitCompleted.verify|verify} messages.
       * @param message TransactionCommitCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ITransactionCommitCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a TransactionCommitCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns TransactionCommitCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.TransactionCommitCompleted

      /**
       * Decodes a TransactionCommitCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns TransactionCommitCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.TransactionCommitCompleted

      /**
       * Verifies a TransactionCommitCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a TransactionCommitCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns TransactionCommitCompleted
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.TransactionCommitCompleted

      /**
       * Creates a plain object from a TransactionCommitCompleted message. Also converts values to other types if specified.
       * @param message TransactionCommitCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.TransactionCommitCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this TransactionCommitCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a ReadEvent. */
    interface IReadEvent {
      /** ReadEvent eventStreamId */
      eventStreamId: string

      /** ReadEvent eventNumber */
      eventNumber: number | Long

      /** ReadEvent resolveLinkTos */
      resolveLinkTos: boolean

      /** ReadEvent requireMaster */
      requireMaster: boolean
    }

    /** Represents a ReadEvent. */
    class ReadEvent implements IReadEvent {
      /**
       * Constructs a new ReadEvent.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IReadEvent)

      /** ReadEvent eventStreamId. */
      public eventStreamId: string

      /** ReadEvent eventNumber. */
      public eventNumber: number | Long

      /** ReadEvent resolveLinkTos. */
      public resolveLinkTos: boolean

      /** ReadEvent requireMaster. */
      public requireMaster: boolean

      /**
       * Creates a new ReadEvent instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ReadEvent instance
       */
      public static create(properties?: eventstore.proto.IReadEvent): eventstore.proto.ReadEvent

      /**
       * Encodes the specified ReadEvent message. Does not implicitly {@link eventstore.proto.ReadEvent.verify|verify} messages.
       * @param message ReadEvent message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IReadEvent,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ReadEvent message, length delimited. Does not implicitly {@link eventstore.proto.ReadEvent.verify|verify} messages.
       * @param message ReadEvent message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IReadEvent,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ReadEvent message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ReadEvent
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ReadEvent

      /**
       * Decodes a ReadEvent message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ReadEvent
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ReadEvent

      /**
       * Verifies a ReadEvent message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ReadEvent message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ReadEvent
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.ReadEvent

      /**
       * Creates a plain object from a ReadEvent message. Also converts values to other types if specified.
       * @param message ReadEvent
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ReadEvent,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ReadEvent to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a ReadEventCompleted. */
    interface IReadEventCompleted {
      /** ReadEventCompleted result */
      result: eventstore.proto.ReadEventCompleted.ReadEventResult

      /** ReadEventCompleted event */
      event: eventstore.proto.IResolvedIndexedEvent

      /** ReadEventCompleted error */
      error?: string | null
    }

    /** Represents a ReadEventCompleted. */
    class ReadEventCompleted implements IReadEventCompleted {
      /**
       * Constructs a new ReadEventCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IReadEventCompleted)

      /** ReadEventCompleted result. */
      public result: eventstore.proto.ReadEventCompleted.ReadEventResult

      /** ReadEventCompleted event. */
      public event: eventstore.proto.IResolvedIndexedEvent

      /** ReadEventCompleted error. */
      public error: string

      /**
       * Creates a new ReadEventCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ReadEventCompleted instance
       */
      public static create(
        properties?: eventstore.proto.IReadEventCompleted
      ): eventstore.proto.ReadEventCompleted

      /**
       * Encodes the specified ReadEventCompleted message. Does not implicitly {@link eventstore.proto.ReadEventCompleted.verify|verify} messages.
       * @param message ReadEventCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IReadEventCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ReadEventCompleted message, length delimited. Does not implicitly {@link eventstore.proto.ReadEventCompleted.verify|verify} messages.
       * @param message ReadEventCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IReadEventCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ReadEventCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ReadEventCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ReadEventCompleted

      /**
       * Decodes a ReadEventCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ReadEventCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ReadEventCompleted

      /**
       * Verifies a ReadEventCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ReadEventCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ReadEventCompleted
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.ReadEventCompleted

      /**
       * Creates a plain object from a ReadEventCompleted message. Also converts values to other types if specified.
       * @param message ReadEventCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ReadEventCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ReadEventCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    namespace ReadEventCompleted {
      /** ReadEventResult enum. */
      enum ReadEventResult {
        Success = 0,
        NotFound = 1,
        NoStream = 2,
        StreamDeleted = 3,
        Error = 4,
        AccessDenied = 5
      }
    }

    /** Properties of a ReadStreamEvents. */
    interface IReadStreamEvents {
      /** ReadStreamEvents eventStreamId */
      eventStreamId: string

      /** ReadStreamEvents fromEventNumber */
      fromEventNumber: number | Long

      /** ReadStreamEvents maxCount */
      maxCount: number

      /** ReadStreamEvents resolveLinkTos */
      resolveLinkTos: boolean

      /** ReadStreamEvents requireMaster */
      requireMaster: boolean
    }

    /** Represents a ReadStreamEvents. */
    class ReadStreamEvents implements IReadStreamEvents {
      /**
       * Constructs a new ReadStreamEvents.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IReadStreamEvents)

      /** ReadStreamEvents eventStreamId. */
      public eventStreamId: string

      /** ReadStreamEvents fromEventNumber. */
      public fromEventNumber: number | Long

      /** ReadStreamEvents maxCount. */
      public maxCount: number

      /** ReadStreamEvents resolveLinkTos. */
      public resolveLinkTos: boolean

      /** ReadStreamEvents requireMaster. */
      public requireMaster: boolean

      /**
       * Creates a new ReadStreamEvents instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ReadStreamEvents instance
       */
      public static create(
        properties?: eventstore.proto.IReadStreamEvents
      ): eventstore.proto.ReadStreamEvents

      /**
       * Encodes the specified ReadStreamEvents message. Does not implicitly {@link eventstore.proto.ReadStreamEvents.verify|verify} messages.
       * @param message ReadStreamEvents message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IReadStreamEvents,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ReadStreamEvents message, length delimited. Does not implicitly {@link eventstore.proto.ReadStreamEvents.verify|verify} messages.
       * @param message ReadStreamEvents message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IReadStreamEvents,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ReadStreamEvents message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ReadStreamEvents
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ReadStreamEvents

      /**
       * Decodes a ReadStreamEvents message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ReadStreamEvents
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ReadStreamEvents

      /**
       * Verifies a ReadStreamEvents message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ReadStreamEvents message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ReadStreamEvents
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.ReadStreamEvents

      /**
       * Creates a plain object from a ReadStreamEvents message. Also converts values to other types if specified.
       * @param message ReadStreamEvents
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ReadStreamEvents,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ReadStreamEvents to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a ReadStreamEventsCompleted. */
    interface IReadStreamEventsCompleted {
      /** ReadStreamEventsCompleted events */
      events?: eventstore.proto.IResolvedIndexedEvent[] | null

      /** ReadStreamEventsCompleted result */
      result: eventstore.proto.ReadStreamEventsCompleted.ReadStreamResult

      /** ReadStreamEventsCompleted nextEventNumber */
      nextEventNumber: number | Long

      /** ReadStreamEventsCompleted lastEventNumber */
      lastEventNumber: number | Long

      /** ReadStreamEventsCompleted isEndOfStream */
      isEndOfStream: boolean

      /** ReadStreamEventsCompleted lastCommitPosition */
      lastCommitPosition: number | Long

      /** ReadStreamEventsCompleted error */
      error?: string | null
    }

    /** Represents a ReadStreamEventsCompleted. */
    class ReadStreamEventsCompleted implements IReadStreamEventsCompleted {
      /**
       * Constructs a new ReadStreamEventsCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IReadStreamEventsCompleted)

      /** ReadStreamEventsCompleted events. */
      public events: eventstore.proto.IResolvedIndexedEvent[]

      /** ReadStreamEventsCompleted result. */
      public result: eventstore.proto.ReadStreamEventsCompleted.ReadStreamResult

      /** ReadStreamEventsCompleted nextEventNumber. */
      public nextEventNumber: number | Long

      /** ReadStreamEventsCompleted lastEventNumber. */
      public lastEventNumber: number | Long

      /** ReadStreamEventsCompleted isEndOfStream. */
      public isEndOfStream: boolean

      /** ReadStreamEventsCompleted lastCommitPosition. */
      public lastCommitPosition: number | Long

      /** ReadStreamEventsCompleted error. */
      public error: string

      /**
       * Creates a new ReadStreamEventsCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ReadStreamEventsCompleted instance
       */
      public static create(
        properties?: eventstore.proto.IReadStreamEventsCompleted
      ): eventstore.proto.ReadStreamEventsCompleted

      /**
       * Encodes the specified ReadStreamEventsCompleted message. Does not implicitly {@link eventstore.proto.ReadStreamEventsCompleted.verify|verify} messages.
       * @param message ReadStreamEventsCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IReadStreamEventsCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ReadStreamEventsCompleted message, length delimited. Does not implicitly {@link eventstore.proto.ReadStreamEventsCompleted.verify|verify} messages.
       * @param message ReadStreamEventsCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IReadStreamEventsCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ReadStreamEventsCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ReadStreamEventsCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ReadStreamEventsCompleted

      /**
       * Decodes a ReadStreamEventsCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ReadStreamEventsCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ReadStreamEventsCompleted

      /**
       * Verifies a ReadStreamEventsCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ReadStreamEventsCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ReadStreamEventsCompleted
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.ReadStreamEventsCompleted

      /**
       * Creates a plain object from a ReadStreamEventsCompleted message. Also converts values to other types if specified.
       * @param message ReadStreamEventsCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ReadStreamEventsCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ReadStreamEventsCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    namespace ReadStreamEventsCompleted {
      /** ReadStreamResult enum. */
      enum ReadStreamResult {
        Success = 0,
        NoStream = 1,
        StreamDeleted = 2,
        NotModified = 3,
        Error = 4,
        AccessDenied = 5
      }
    }

    /** Properties of a ReadAllEvents. */
    interface IReadAllEvents {
      /** ReadAllEvents commitPosition */
      commitPosition: number | Long

      /** ReadAllEvents preparePosition */
      preparePosition: number | Long

      /** ReadAllEvents maxCount */
      maxCount: number

      /** ReadAllEvents resolveLinkTos */
      resolveLinkTos: boolean

      /** ReadAllEvents requireMaster */
      requireMaster: boolean
    }

    /** Represents a ReadAllEvents. */
    class ReadAllEvents implements IReadAllEvents {
      /**
       * Constructs a new ReadAllEvents.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IReadAllEvents)

      /** ReadAllEvents commitPosition. */
      public commitPosition: number | Long

      /** ReadAllEvents preparePosition. */
      public preparePosition: number | Long

      /** ReadAllEvents maxCount. */
      public maxCount: number

      /** ReadAllEvents resolveLinkTos. */
      public resolveLinkTos: boolean

      /** ReadAllEvents requireMaster. */
      public requireMaster: boolean

      /**
       * Creates a new ReadAllEvents instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ReadAllEvents instance
       */
      public static create(
        properties?: eventstore.proto.IReadAllEvents
      ): eventstore.proto.ReadAllEvents

      /**
       * Encodes the specified ReadAllEvents message. Does not implicitly {@link eventstore.proto.ReadAllEvents.verify|verify} messages.
       * @param message ReadAllEvents message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IReadAllEvents,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ReadAllEvents message, length delimited. Does not implicitly {@link eventstore.proto.ReadAllEvents.verify|verify} messages.
       * @param message ReadAllEvents message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IReadAllEvents,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ReadAllEvents message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ReadAllEvents
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ReadAllEvents

      /**
       * Decodes a ReadAllEvents message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ReadAllEvents
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ReadAllEvents

      /**
       * Verifies a ReadAllEvents message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ReadAllEvents message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ReadAllEvents
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.ReadAllEvents

      /**
       * Creates a plain object from a ReadAllEvents message. Also converts values to other types if specified.
       * @param message ReadAllEvents
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ReadAllEvents,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ReadAllEvents to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a ReadAllEventsCompleted. */
    interface IReadAllEventsCompleted {
      /** ReadAllEventsCompleted commitPosition */
      commitPosition: number | Long

      /** ReadAllEventsCompleted preparePosition */
      preparePosition: number | Long

      /** ReadAllEventsCompleted events */
      events?: eventstore.proto.IResolvedEvent[] | null

      /** ReadAllEventsCompleted nextCommitPosition */
      nextCommitPosition: number | Long

      /** ReadAllEventsCompleted nextPreparePosition */
      nextPreparePosition: number | Long

      /** ReadAllEventsCompleted result */
      result?: eventstore.proto.ReadAllEventsCompleted.ReadAllResult | null

      /** ReadAllEventsCompleted error */
      error?: string | null
    }

    /** Represents a ReadAllEventsCompleted. */
    class ReadAllEventsCompleted implements IReadAllEventsCompleted {
      /**
       * Constructs a new ReadAllEventsCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IReadAllEventsCompleted)

      /** ReadAllEventsCompleted commitPosition. */
      public commitPosition: number | Long

      /** ReadAllEventsCompleted preparePosition. */
      public preparePosition: number | Long

      /** ReadAllEventsCompleted events. */
      public events: eventstore.proto.IResolvedEvent[]

      /** ReadAllEventsCompleted nextCommitPosition. */
      public nextCommitPosition: number | Long

      /** ReadAllEventsCompleted nextPreparePosition. */
      public nextPreparePosition: number | Long

      /** ReadAllEventsCompleted result. */
      public result: eventstore.proto.ReadAllEventsCompleted.ReadAllResult

      /** ReadAllEventsCompleted error. */
      public error: string

      /**
       * Creates a new ReadAllEventsCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ReadAllEventsCompleted instance
       */
      public static create(
        properties?: eventstore.proto.IReadAllEventsCompleted
      ): eventstore.proto.ReadAllEventsCompleted

      /**
       * Encodes the specified ReadAllEventsCompleted message. Does not implicitly {@link eventstore.proto.ReadAllEventsCompleted.verify|verify} messages.
       * @param message ReadAllEventsCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IReadAllEventsCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ReadAllEventsCompleted message, length delimited. Does not implicitly {@link eventstore.proto.ReadAllEventsCompleted.verify|verify} messages.
       * @param message ReadAllEventsCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IReadAllEventsCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ReadAllEventsCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ReadAllEventsCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ReadAllEventsCompleted

      /**
       * Decodes a ReadAllEventsCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ReadAllEventsCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ReadAllEventsCompleted

      /**
       * Verifies a ReadAllEventsCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ReadAllEventsCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ReadAllEventsCompleted
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.ReadAllEventsCompleted

      /**
       * Creates a plain object from a ReadAllEventsCompleted message. Also converts values to other types if specified.
       * @param message ReadAllEventsCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ReadAllEventsCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ReadAllEventsCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    namespace ReadAllEventsCompleted {
      /** ReadAllResult enum. */
      enum ReadAllResult {
        Success = 0,
        NotModified = 1,
        Error = 2,
        AccessDenied = 3
      }
    }

    /** Properties of a CreatePersistentSubscription. */
    interface ICreatePersistentSubscription {
      /** CreatePersistentSubscription subscriptionGroupName */
      subscriptionGroupName: string

      /** CreatePersistentSubscription eventStreamId */
      eventStreamId: string

      /** CreatePersistentSubscription resolveLinkTos */
      resolveLinkTos: boolean

      /** CreatePersistentSubscription startFrom */
      startFrom: number | Long

      /** CreatePersistentSubscription messageTimeoutMilliseconds */
      messageTimeoutMilliseconds: number

      /** CreatePersistentSubscription recordStatistics */
      recordStatistics: boolean

      /** CreatePersistentSubscription liveBufferSize */
      liveBufferSize: number

      /** CreatePersistentSubscription readBatchSize */
      readBatchSize: number

      /** CreatePersistentSubscription bufferSize */
      bufferSize: number

      /** CreatePersistentSubscription maxRetryCount */
      maxRetryCount: number

      /** CreatePersistentSubscription preferRoundRobin */
      preferRoundRobin: boolean

      /** CreatePersistentSubscription checkpointAfterTime */
      checkpointAfterTime: number

      /** CreatePersistentSubscription checkpointMaxCount */
      checkpointMaxCount: number

      /** CreatePersistentSubscription checkpointMinCount */
      checkpointMinCount: number

      /** CreatePersistentSubscription subscriberMaxCount */
      subscriberMaxCount: number

      /** CreatePersistentSubscription namedConsumerStrategy */
      namedConsumerStrategy?: string | null
    }

    /** Represents a CreatePersistentSubscription. */
    class CreatePersistentSubscription implements ICreatePersistentSubscription {
      /**
       * Constructs a new CreatePersistentSubscription.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ICreatePersistentSubscription)

      /** CreatePersistentSubscription subscriptionGroupName. */
      public subscriptionGroupName: string

      /** CreatePersistentSubscription eventStreamId. */
      public eventStreamId: string

      /** CreatePersistentSubscription resolveLinkTos. */
      public resolveLinkTos: boolean

      /** CreatePersistentSubscription startFrom. */
      public startFrom: number | Long

      /** CreatePersistentSubscription messageTimeoutMilliseconds. */
      public messageTimeoutMilliseconds: number

      /** CreatePersistentSubscription recordStatistics. */
      public recordStatistics: boolean

      /** CreatePersistentSubscription liveBufferSize. */
      public liveBufferSize: number

      /** CreatePersistentSubscription readBatchSize. */
      public readBatchSize: number

      /** CreatePersistentSubscription bufferSize. */
      public bufferSize: number

      /** CreatePersistentSubscription maxRetryCount. */
      public maxRetryCount: number

      /** CreatePersistentSubscription preferRoundRobin. */
      public preferRoundRobin: boolean

      /** CreatePersistentSubscription checkpointAfterTime. */
      public checkpointAfterTime: number

      /** CreatePersistentSubscription checkpointMaxCount. */
      public checkpointMaxCount: number

      /** CreatePersistentSubscription checkpointMinCount. */
      public checkpointMinCount: number

      /** CreatePersistentSubscription subscriberMaxCount. */
      public subscriberMaxCount: number

      /** CreatePersistentSubscription namedConsumerStrategy. */
      public namedConsumerStrategy: string

      /**
       * Creates a new CreatePersistentSubscription instance using the specified properties.
       * @param [properties] Properties to set
       * @returns CreatePersistentSubscription instance
       */
      public static create(
        properties?: eventstore.proto.ICreatePersistentSubscription
      ): eventstore.proto.CreatePersistentSubscription

      /**
       * Encodes the specified CreatePersistentSubscription message. Does not implicitly {@link eventstore.proto.CreatePersistentSubscription.verify|verify} messages.
       * @param message CreatePersistentSubscription message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ICreatePersistentSubscription,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified CreatePersistentSubscription message, length delimited. Does not implicitly {@link eventstore.proto.CreatePersistentSubscription.verify|verify} messages.
       * @param message CreatePersistentSubscription message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ICreatePersistentSubscription,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a CreatePersistentSubscription message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns CreatePersistentSubscription
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.CreatePersistentSubscription

      /**
       * Decodes a CreatePersistentSubscription message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns CreatePersistentSubscription
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.CreatePersistentSubscription

      /**
       * Verifies a CreatePersistentSubscription message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a CreatePersistentSubscription message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns CreatePersistentSubscription
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.CreatePersistentSubscription

      /**
       * Creates a plain object from a CreatePersistentSubscription message. Also converts values to other types if specified.
       * @param message CreatePersistentSubscription
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.CreatePersistentSubscription,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this CreatePersistentSubscription to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a DeletePersistentSubscription. */
    interface IDeletePersistentSubscription {
      /** DeletePersistentSubscription subscriptionGroupName */
      subscriptionGroupName: string

      /** DeletePersistentSubscription eventStreamId */
      eventStreamId: string
    }

    /** Represents a DeletePersistentSubscription. */
    class DeletePersistentSubscription implements IDeletePersistentSubscription {
      /**
       * Constructs a new DeletePersistentSubscription.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IDeletePersistentSubscription)

      /** DeletePersistentSubscription subscriptionGroupName. */
      public subscriptionGroupName: string

      /** DeletePersistentSubscription eventStreamId. */
      public eventStreamId: string

      /**
       * Creates a new DeletePersistentSubscription instance using the specified properties.
       * @param [properties] Properties to set
       * @returns DeletePersistentSubscription instance
       */
      public static create(
        properties?: eventstore.proto.IDeletePersistentSubscription
      ): eventstore.proto.DeletePersistentSubscription

      /**
       * Encodes the specified DeletePersistentSubscription message. Does not implicitly {@link eventstore.proto.DeletePersistentSubscription.verify|verify} messages.
       * @param message DeletePersistentSubscription message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IDeletePersistentSubscription,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified DeletePersistentSubscription message, length delimited. Does not implicitly {@link eventstore.proto.DeletePersistentSubscription.verify|verify} messages.
       * @param message DeletePersistentSubscription message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IDeletePersistentSubscription,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a DeletePersistentSubscription message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns DeletePersistentSubscription
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.DeletePersistentSubscription

      /**
       * Decodes a DeletePersistentSubscription message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns DeletePersistentSubscription
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.DeletePersistentSubscription

      /**
       * Verifies a DeletePersistentSubscription message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a DeletePersistentSubscription message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns DeletePersistentSubscription
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.DeletePersistentSubscription

      /**
       * Creates a plain object from a DeletePersistentSubscription message. Also converts values to other types if specified.
       * @param message DeletePersistentSubscription
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.DeletePersistentSubscription,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this DeletePersistentSubscription to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of an UpdatePersistentSubscription. */
    interface IUpdatePersistentSubscription {
      /** UpdatePersistentSubscription subscriptionGroupName */
      subscriptionGroupName: string

      /** UpdatePersistentSubscription eventStreamId */
      eventStreamId: string

      /** UpdatePersistentSubscription resolveLinkTos */
      resolveLinkTos: boolean

      /** UpdatePersistentSubscription startFrom */
      startFrom: number | Long

      /** UpdatePersistentSubscription messageTimeoutMilliseconds */
      messageTimeoutMilliseconds: number

      /** UpdatePersistentSubscription recordStatistics */
      recordStatistics: boolean

      /** UpdatePersistentSubscription liveBufferSize */
      liveBufferSize: number

      /** UpdatePersistentSubscription readBatchSize */
      readBatchSize: number

      /** UpdatePersistentSubscription bufferSize */
      bufferSize: number

      /** UpdatePersistentSubscription maxRetryCount */
      maxRetryCount: number

      /** UpdatePersistentSubscription preferRoundRobin */
      preferRoundRobin: boolean

      /** UpdatePersistentSubscription checkpointAfterTime */
      checkpointAfterTime: number

      /** UpdatePersistentSubscription checkpointMaxCount */
      checkpointMaxCount: number

      /** UpdatePersistentSubscription checkpointMinCount */
      checkpointMinCount: number

      /** UpdatePersistentSubscription subscriberMaxCount */
      subscriberMaxCount: number

      /** UpdatePersistentSubscription namedConsumerStrategy */
      namedConsumerStrategy?: string | null
    }

    /** Represents an UpdatePersistentSubscription. */
    class UpdatePersistentSubscription implements IUpdatePersistentSubscription {
      /**
       * Constructs a new UpdatePersistentSubscription.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IUpdatePersistentSubscription)

      /** UpdatePersistentSubscription subscriptionGroupName. */
      public subscriptionGroupName: string

      /** UpdatePersistentSubscription eventStreamId. */
      public eventStreamId: string

      /** UpdatePersistentSubscription resolveLinkTos. */
      public resolveLinkTos: boolean

      /** UpdatePersistentSubscription startFrom. */
      public startFrom: number | Long

      /** UpdatePersistentSubscription messageTimeoutMilliseconds. */
      public messageTimeoutMilliseconds: number

      /** UpdatePersistentSubscription recordStatistics. */
      public recordStatistics: boolean

      /** UpdatePersistentSubscription liveBufferSize. */
      public liveBufferSize: number

      /** UpdatePersistentSubscription readBatchSize. */
      public readBatchSize: number

      /** UpdatePersistentSubscription bufferSize. */
      public bufferSize: number

      /** UpdatePersistentSubscription maxRetryCount. */
      public maxRetryCount: number

      /** UpdatePersistentSubscription preferRoundRobin. */
      public preferRoundRobin: boolean

      /** UpdatePersistentSubscription checkpointAfterTime. */
      public checkpointAfterTime: number

      /** UpdatePersistentSubscription checkpointMaxCount. */
      public checkpointMaxCount: number

      /** UpdatePersistentSubscription checkpointMinCount. */
      public checkpointMinCount: number

      /** UpdatePersistentSubscription subscriberMaxCount. */
      public subscriberMaxCount: number

      /** UpdatePersistentSubscription namedConsumerStrategy. */
      public namedConsumerStrategy: string

      /**
       * Creates a new UpdatePersistentSubscription instance using the specified properties.
       * @param [properties] Properties to set
       * @returns UpdatePersistentSubscription instance
       */
      public static create(
        properties?: eventstore.proto.IUpdatePersistentSubscription
      ): eventstore.proto.UpdatePersistentSubscription

      /**
       * Encodes the specified UpdatePersistentSubscription message. Does not implicitly {@link eventstore.proto.UpdatePersistentSubscription.verify|verify} messages.
       * @param message UpdatePersistentSubscription message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IUpdatePersistentSubscription,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified UpdatePersistentSubscription message, length delimited. Does not implicitly {@link eventstore.proto.UpdatePersistentSubscription.verify|verify} messages.
       * @param message UpdatePersistentSubscription message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IUpdatePersistentSubscription,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes an UpdatePersistentSubscription message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns UpdatePersistentSubscription
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.UpdatePersistentSubscription

      /**
       * Decodes an UpdatePersistentSubscription message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns UpdatePersistentSubscription
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.UpdatePersistentSubscription

      /**
       * Verifies an UpdatePersistentSubscription message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates an UpdatePersistentSubscription message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns UpdatePersistentSubscription
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.UpdatePersistentSubscription

      /**
       * Creates a plain object from an UpdatePersistentSubscription message. Also converts values to other types if specified.
       * @param message UpdatePersistentSubscription
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.UpdatePersistentSubscription,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this UpdatePersistentSubscription to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of an UpdatePersistentSubscriptionCompleted. */
    interface IUpdatePersistentSubscriptionCompleted {
      /** UpdatePersistentSubscriptionCompleted result */
      result: eventstore.proto.UpdatePersistentSubscriptionCompleted.UpdatePersistentSubscriptionResult

      /** UpdatePersistentSubscriptionCompleted reason */
      reason?: string | null
    }

    /** Represents an UpdatePersistentSubscriptionCompleted. */
    class UpdatePersistentSubscriptionCompleted implements IUpdatePersistentSubscriptionCompleted {
      /**
       * Constructs a new UpdatePersistentSubscriptionCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IUpdatePersistentSubscriptionCompleted)

      /** UpdatePersistentSubscriptionCompleted result. */
      public result: eventstore.proto.UpdatePersistentSubscriptionCompleted.UpdatePersistentSubscriptionResult

      /** UpdatePersistentSubscriptionCompleted reason. */
      public reason: string

      /**
       * Creates a new UpdatePersistentSubscriptionCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns UpdatePersistentSubscriptionCompleted instance
       */
      public static create(
        properties?: eventstore.proto.IUpdatePersistentSubscriptionCompleted
      ): eventstore.proto.UpdatePersistentSubscriptionCompleted

      /**
       * Encodes the specified UpdatePersistentSubscriptionCompleted message. Does not implicitly {@link eventstore.proto.UpdatePersistentSubscriptionCompleted.verify|verify} messages.
       * @param message UpdatePersistentSubscriptionCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IUpdatePersistentSubscriptionCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified UpdatePersistentSubscriptionCompleted message, length delimited. Does not implicitly {@link eventstore.proto.UpdatePersistentSubscriptionCompleted.verify|verify} messages.
       * @param message UpdatePersistentSubscriptionCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IUpdatePersistentSubscriptionCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes an UpdatePersistentSubscriptionCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns UpdatePersistentSubscriptionCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.UpdatePersistentSubscriptionCompleted

      /**
       * Decodes an UpdatePersistentSubscriptionCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns UpdatePersistentSubscriptionCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.UpdatePersistentSubscriptionCompleted

      /**
       * Verifies an UpdatePersistentSubscriptionCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates an UpdatePersistentSubscriptionCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns UpdatePersistentSubscriptionCompleted
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.UpdatePersistentSubscriptionCompleted

      /**
       * Creates a plain object from an UpdatePersistentSubscriptionCompleted message. Also converts values to other types if specified.
       * @param message UpdatePersistentSubscriptionCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.UpdatePersistentSubscriptionCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this UpdatePersistentSubscriptionCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    namespace UpdatePersistentSubscriptionCompleted {
      /** UpdatePersistentSubscriptionResult enum. */
      enum UpdatePersistentSubscriptionResult {
        Success = 0,
        DoesNotExist = 1,
        Fail = 2,
        AccessDenied = 3
      }
    }

    /** Properties of a CreatePersistentSubscriptionCompleted. */
    interface ICreatePersistentSubscriptionCompleted {
      /** CreatePersistentSubscriptionCompleted result */
      result: eventstore.proto.CreatePersistentSubscriptionCompleted.CreatePersistentSubscriptionResult

      /** CreatePersistentSubscriptionCompleted reason */
      reason?: string | null
    }

    /** Represents a CreatePersistentSubscriptionCompleted. */
    class CreatePersistentSubscriptionCompleted implements ICreatePersistentSubscriptionCompleted {
      /**
       * Constructs a new CreatePersistentSubscriptionCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ICreatePersistentSubscriptionCompleted)

      /** CreatePersistentSubscriptionCompleted result. */
      public result: eventstore.proto.CreatePersistentSubscriptionCompleted.CreatePersistentSubscriptionResult

      /** CreatePersistentSubscriptionCompleted reason. */
      public reason: string

      /**
       * Creates a new CreatePersistentSubscriptionCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns CreatePersistentSubscriptionCompleted instance
       */
      public static create(
        properties?: eventstore.proto.ICreatePersistentSubscriptionCompleted
      ): eventstore.proto.CreatePersistentSubscriptionCompleted

      /**
       * Encodes the specified CreatePersistentSubscriptionCompleted message. Does not implicitly {@link eventstore.proto.CreatePersistentSubscriptionCompleted.verify|verify} messages.
       * @param message CreatePersistentSubscriptionCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ICreatePersistentSubscriptionCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified CreatePersistentSubscriptionCompleted message, length delimited. Does not implicitly {@link eventstore.proto.CreatePersistentSubscriptionCompleted.verify|verify} messages.
       * @param message CreatePersistentSubscriptionCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ICreatePersistentSubscriptionCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a CreatePersistentSubscriptionCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns CreatePersistentSubscriptionCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.CreatePersistentSubscriptionCompleted

      /**
       * Decodes a CreatePersistentSubscriptionCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns CreatePersistentSubscriptionCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.CreatePersistentSubscriptionCompleted

      /**
       * Verifies a CreatePersistentSubscriptionCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a CreatePersistentSubscriptionCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns CreatePersistentSubscriptionCompleted
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.CreatePersistentSubscriptionCompleted

      /**
       * Creates a plain object from a CreatePersistentSubscriptionCompleted message. Also converts values to other types if specified.
       * @param message CreatePersistentSubscriptionCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.CreatePersistentSubscriptionCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this CreatePersistentSubscriptionCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    namespace CreatePersistentSubscriptionCompleted {
      /** CreatePersistentSubscriptionResult enum. */
      enum CreatePersistentSubscriptionResult {
        Success = 0,
        AlreadyExists = 1,
        Fail = 2,
        AccessDenied = 3
      }
    }

    /** Properties of a DeletePersistentSubscriptionCompleted. */
    interface IDeletePersistentSubscriptionCompleted {
      /** DeletePersistentSubscriptionCompleted result */
      result: eventstore.proto.DeletePersistentSubscriptionCompleted.DeletePersistentSubscriptionResult

      /** DeletePersistentSubscriptionCompleted reason */
      reason?: string | null
    }

    /** Represents a DeletePersistentSubscriptionCompleted. */
    class DeletePersistentSubscriptionCompleted implements IDeletePersistentSubscriptionCompleted {
      /**
       * Constructs a new DeletePersistentSubscriptionCompleted.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IDeletePersistentSubscriptionCompleted)

      /** DeletePersistentSubscriptionCompleted result. */
      public result: eventstore.proto.DeletePersistentSubscriptionCompleted.DeletePersistentSubscriptionResult

      /** DeletePersistentSubscriptionCompleted reason. */
      public reason: string

      /**
       * Creates a new DeletePersistentSubscriptionCompleted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns DeletePersistentSubscriptionCompleted instance
       */
      public static create(
        properties?: eventstore.proto.IDeletePersistentSubscriptionCompleted
      ): eventstore.proto.DeletePersistentSubscriptionCompleted

      /**
       * Encodes the specified DeletePersistentSubscriptionCompleted message. Does not implicitly {@link eventstore.proto.DeletePersistentSubscriptionCompleted.verify|verify} messages.
       * @param message DeletePersistentSubscriptionCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IDeletePersistentSubscriptionCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified DeletePersistentSubscriptionCompleted message, length delimited. Does not implicitly {@link eventstore.proto.DeletePersistentSubscriptionCompleted.verify|verify} messages.
       * @param message DeletePersistentSubscriptionCompleted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IDeletePersistentSubscriptionCompleted,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a DeletePersistentSubscriptionCompleted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns DeletePersistentSubscriptionCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.DeletePersistentSubscriptionCompleted

      /**
       * Decodes a DeletePersistentSubscriptionCompleted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns DeletePersistentSubscriptionCompleted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.DeletePersistentSubscriptionCompleted

      /**
       * Verifies a DeletePersistentSubscriptionCompleted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a DeletePersistentSubscriptionCompleted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns DeletePersistentSubscriptionCompleted
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.DeletePersistentSubscriptionCompleted

      /**
       * Creates a plain object from a DeletePersistentSubscriptionCompleted message. Also converts values to other types if specified.
       * @param message DeletePersistentSubscriptionCompleted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.DeletePersistentSubscriptionCompleted,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this DeletePersistentSubscriptionCompleted to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    namespace DeletePersistentSubscriptionCompleted {
      /** DeletePersistentSubscriptionResult enum. */
      enum DeletePersistentSubscriptionResult {
        Success = 0,
        DoesNotExist = 1,
        Fail = 2,
        AccessDenied = 3
      }
    }

    /** Properties of a ConnectToPersistentSubscription. */
    interface IConnectToPersistentSubscription {
      /** ConnectToPersistentSubscription subscriptionId */
      subscriptionId: string

      /** ConnectToPersistentSubscription eventStreamId */
      eventStreamId: string

      /** ConnectToPersistentSubscription allowedInFlightMessages */
      allowedInFlightMessages: number
    }

    /** Represents a ConnectToPersistentSubscription. */
    class ConnectToPersistentSubscription implements IConnectToPersistentSubscription {
      /**
       * Constructs a new ConnectToPersistentSubscription.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IConnectToPersistentSubscription)

      /** ConnectToPersistentSubscription subscriptionId. */
      public subscriptionId: string

      /** ConnectToPersistentSubscription eventStreamId. */
      public eventStreamId: string

      /** ConnectToPersistentSubscription allowedInFlightMessages. */
      public allowedInFlightMessages: number

      /**
       * Creates a new ConnectToPersistentSubscription instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ConnectToPersistentSubscription instance
       */
      public static create(
        properties?: eventstore.proto.IConnectToPersistentSubscription
      ): eventstore.proto.ConnectToPersistentSubscription

      /**
       * Encodes the specified ConnectToPersistentSubscription message. Does not implicitly {@link eventstore.proto.ConnectToPersistentSubscription.verify|verify} messages.
       * @param message ConnectToPersistentSubscription message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IConnectToPersistentSubscription,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ConnectToPersistentSubscription message, length delimited. Does not implicitly {@link eventstore.proto.ConnectToPersistentSubscription.verify|verify} messages.
       * @param message ConnectToPersistentSubscription message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IConnectToPersistentSubscription,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ConnectToPersistentSubscription message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ConnectToPersistentSubscription
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ConnectToPersistentSubscription

      /**
       * Decodes a ConnectToPersistentSubscription message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ConnectToPersistentSubscription
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ConnectToPersistentSubscription

      /**
       * Verifies a ConnectToPersistentSubscription message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ConnectToPersistentSubscription message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ConnectToPersistentSubscription
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.ConnectToPersistentSubscription

      /**
       * Creates a plain object from a ConnectToPersistentSubscription message. Also converts values to other types if specified.
       * @param message ConnectToPersistentSubscription
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ConnectToPersistentSubscription,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ConnectToPersistentSubscription to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a PersistentSubscriptionAckEvents. */
    interface IPersistentSubscriptionAckEvents {
      /** PersistentSubscriptionAckEvents subscriptionId */
      subscriptionId: string

      /** PersistentSubscriptionAckEvents processedEventIds */
      processedEventIds?: Uint8Array[] | null
    }

    /** Represents a PersistentSubscriptionAckEvents. */
    class PersistentSubscriptionAckEvents implements IPersistentSubscriptionAckEvents {
      /**
       * Constructs a new PersistentSubscriptionAckEvents.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IPersistentSubscriptionAckEvents)

      /** PersistentSubscriptionAckEvents subscriptionId. */
      public subscriptionId: string

      /** PersistentSubscriptionAckEvents processedEventIds. */
      public processedEventIds: Uint8Array[]

      /**
       * Creates a new PersistentSubscriptionAckEvents instance using the specified properties.
       * @param [properties] Properties to set
       * @returns PersistentSubscriptionAckEvents instance
       */
      public static create(
        properties?: eventstore.proto.IPersistentSubscriptionAckEvents
      ): eventstore.proto.PersistentSubscriptionAckEvents

      /**
       * Encodes the specified PersistentSubscriptionAckEvents message. Does not implicitly {@link eventstore.proto.PersistentSubscriptionAckEvents.verify|verify} messages.
       * @param message PersistentSubscriptionAckEvents message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IPersistentSubscriptionAckEvents,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified PersistentSubscriptionAckEvents message, length delimited. Does not implicitly {@link eventstore.proto.PersistentSubscriptionAckEvents.verify|verify} messages.
       * @param message PersistentSubscriptionAckEvents message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IPersistentSubscriptionAckEvents,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a PersistentSubscriptionAckEvents message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns PersistentSubscriptionAckEvents
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.PersistentSubscriptionAckEvents

      /**
       * Decodes a PersistentSubscriptionAckEvents message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns PersistentSubscriptionAckEvents
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.PersistentSubscriptionAckEvents

      /**
       * Verifies a PersistentSubscriptionAckEvents message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a PersistentSubscriptionAckEvents message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns PersistentSubscriptionAckEvents
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.PersistentSubscriptionAckEvents

      /**
       * Creates a plain object from a PersistentSubscriptionAckEvents message. Also converts values to other types if specified.
       * @param message PersistentSubscriptionAckEvents
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.PersistentSubscriptionAckEvents,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this PersistentSubscriptionAckEvents to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a PersistentSubscriptionNakEvents. */
    interface IPersistentSubscriptionNakEvents {
      /** PersistentSubscriptionNakEvents subscriptionId */
      subscriptionId: string

      /** PersistentSubscriptionNakEvents processedEventIds */
      processedEventIds?: Uint8Array[] | null

      /** PersistentSubscriptionNakEvents message */
      message?: string | null

      /** PersistentSubscriptionNakEvents action */
      action: eventstore.proto.PersistentSubscriptionNakEvents.NakAction
    }

    /** Represents a PersistentSubscriptionNakEvents. */
    class PersistentSubscriptionNakEvents implements IPersistentSubscriptionNakEvents {
      /**
       * Constructs a new PersistentSubscriptionNakEvents.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IPersistentSubscriptionNakEvents)

      /** PersistentSubscriptionNakEvents subscriptionId. */
      public subscriptionId: string

      /** PersistentSubscriptionNakEvents processedEventIds. */
      public processedEventIds: Uint8Array[]

      /** PersistentSubscriptionNakEvents message. */
      public message: string

      /** PersistentSubscriptionNakEvents action. */
      public action: eventstore.proto.PersistentSubscriptionNakEvents.NakAction

      /**
       * Creates a new PersistentSubscriptionNakEvents instance using the specified properties.
       * @param [properties] Properties to set
       * @returns PersistentSubscriptionNakEvents instance
       */
      public static create(
        properties?: eventstore.proto.IPersistentSubscriptionNakEvents
      ): eventstore.proto.PersistentSubscriptionNakEvents

      /**
       * Encodes the specified PersistentSubscriptionNakEvents message. Does not implicitly {@link eventstore.proto.PersistentSubscriptionNakEvents.verify|verify} messages.
       * @param message PersistentSubscriptionNakEvents message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IPersistentSubscriptionNakEvents,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified PersistentSubscriptionNakEvents message, length delimited. Does not implicitly {@link eventstore.proto.PersistentSubscriptionNakEvents.verify|verify} messages.
       * @param message PersistentSubscriptionNakEvents message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IPersistentSubscriptionNakEvents,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a PersistentSubscriptionNakEvents message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns PersistentSubscriptionNakEvents
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.PersistentSubscriptionNakEvents

      /**
       * Decodes a PersistentSubscriptionNakEvents message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns PersistentSubscriptionNakEvents
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.PersistentSubscriptionNakEvents

      /**
       * Verifies a PersistentSubscriptionNakEvents message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a PersistentSubscriptionNakEvents message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns PersistentSubscriptionNakEvents
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.PersistentSubscriptionNakEvents

      /**
       * Creates a plain object from a PersistentSubscriptionNakEvents message. Also converts values to other types if specified.
       * @param message PersistentSubscriptionNakEvents
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.PersistentSubscriptionNakEvents,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this PersistentSubscriptionNakEvents to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    namespace PersistentSubscriptionNakEvents {
      /** NakAction enum. */
      enum NakAction {
        Unknown = 0,
        Park = 1,
        Retry = 2,
        Skip = 3,
        Stop = 4
      }
    }

    /** Properties of a PersistentSubscriptionConfirmation. */
    interface IPersistentSubscriptionConfirmation {
      /** PersistentSubscriptionConfirmation lastCommitPosition */
      lastCommitPosition: number | Long

      /** PersistentSubscriptionConfirmation subscriptionId */
      subscriptionId: string

      /** PersistentSubscriptionConfirmation lastEventNumber */
      lastEventNumber?: number | Long | null
    }

    /** Represents a PersistentSubscriptionConfirmation. */
    class PersistentSubscriptionConfirmation implements IPersistentSubscriptionConfirmation {
      /**
       * Constructs a new PersistentSubscriptionConfirmation.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IPersistentSubscriptionConfirmation)

      /** PersistentSubscriptionConfirmation lastCommitPosition. */
      public lastCommitPosition: number | Long

      /** PersistentSubscriptionConfirmation subscriptionId. */
      public subscriptionId: string

      /** PersistentSubscriptionConfirmation lastEventNumber. */
      public lastEventNumber: number | Long

      /**
       * Creates a new PersistentSubscriptionConfirmation instance using the specified properties.
       * @param [properties] Properties to set
       * @returns PersistentSubscriptionConfirmation instance
       */
      public static create(
        properties?: eventstore.proto.IPersistentSubscriptionConfirmation
      ): eventstore.proto.PersistentSubscriptionConfirmation

      /**
       * Encodes the specified PersistentSubscriptionConfirmation message. Does not implicitly {@link eventstore.proto.PersistentSubscriptionConfirmation.verify|verify} messages.
       * @param message PersistentSubscriptionConfirmation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IPersistentSubscriptionConfirmation,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified PersistentSubscriptionConfirmation message, length delimited. Does not implicitly {@link eventstore.proto.PersistentSubscriptionConfirmation.verify|verify} messages.
       * @param message PersistentSubscriptionConfirmation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IPersistentSubscriptionConfirmation,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a PersistentSubscriptionConfirmation message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns PersistentSubscriptionConfirmation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.PersistentSubscriptionConfirmation

      /**
       * Decodes a PersistentSubscriptionConfirmation message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns PersistentSubscriptionConfirmation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.PersistentSubscriptionConfirmation

      /**
       * Verifies a PersistentSubscriptionConfirmation message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a PersistentSubscriptionConfirmation message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns PersistentSubscriptionConfirmation
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.PersistentSubscriptionConfirmation

      /**
       * Creates a plain object from a PersistentSubscriptionConfirmation message. Also converts values to other types if specified.
       * @param message PersistentSubscriptionConfirmation
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.PersistentSubscriptionConfirmation,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this PersistentSubscriptionConfirmation to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a PersistentSubscriptionStreamEventAppeared. */
    interface IPersistentSubscriptionStreamEventAppeared {
      /** PersistentSubscriptionStreamEventAppeared event */
      event: eventstore.proto.IResolvedIndexedEvent
    }

    /** Represents a PersistentSubscriptionStreamEventAppeared. */
    class PersistentSubscriptionStreamEventAppeared
      implements IPersistentSubscriptionStreamEventAppeared {
      /**
       * Constructs a new PersistentSubscriptionStreamEventAppeared.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IPersistentSubscriptionStreamEventAppeared)

      /** PersistentSubscriptionStreamEventAppeared event. */
      public event: eventstore.proto.IResolvedIndexedEvent

      /**
       * Creates a new PersistentSubscriptionStreamEventAppeared instance using the specified properties.
       * @param [properties] Properties to set
       * @returns PersistentSubscriptionStreamEventAppeared instance
       */
      public static create(
        properties?: eventstore.proto.IPersistentSubscriptionStreamEventAppeared
      ): eventstore.proto.PersistentSubscriptionStreamEventAppeared

      /**
       * Encodes the specified PersistentSubscriptionStreamEventAppeared message. Does not implicitly {@link eventstore.proto.PersistentSubscriptionStreamEventAppeared.verify|verify} messages.
       * @param message PersistentSubscriptionStreamEventAppeared message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IPersistentSubscriptionStreamEventAppeared,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified PersistentSubscriptionStreamEventAppeared message, length delimited. Does not implicitly {@link eventstore.proto.PersistentSubscriptionStreamEventAppeared.verify|verify} messages.
       * @param message PersistentSubscriptionStreamEventAppeared message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IPersistentSubscriptionStreamEventAppeared,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a PersistentSubscriptionStreamEventAppeared message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns PersistentSubscriptionStreamEventAppeared
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.PersistentSubscriptionStreamEventAppeared

      /**
       * Decodes a PersistentSubscriptionStreamEventAppeared message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns PersistentSubscriptionStreamEventAppeared
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.PersistentSubscriptionStreamEventAppeared

      /**
       * Verifies a PersistentSubscriptionStreamEventAppeared message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a PersistentSubscriptionStreamEventAppeared message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns PersistentSubscriptionStreamEventAppeared
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.PersistentSubscriptionStreamEventAppeared

      /**
       * Creates a plain object from a PersistentSubscriptionStreamEventAppeared message. Also converts values to other types if specified.
       * @param message PersistentSubscriptionStreamEventAppeared
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.PersistentSubscriptionStreamEventAppeared,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this PersistentSubscriptionStreamEventAppeared to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a SubscribeToStream. */
    interface ISubscribeToStream {
      /** SubscribeToStream eventStreamId */
      eventStreamId: string

      /** SubscribeToStream resolveLinkTos */
      resolveLinkTos: boolean
    }

    /** Represents a SubscribeToStream. */
    class SubscribeToStream implements ISubscribeToStream {
      /**
       * Constructs a new SubscribeToStream.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ISubscribeToStream)

      /** SubscribeToStream eventStreamId. */
      public eventStreamId: string

      /** SubscribeToStream resolveLinkTos. */
      public resolveLinkTos: boolean

      /**
       * Creates a new SubscribeToStream instance using the specified properties.
       * @param [properties] Properties to set
       * @returns SubscribeToStream instance
       */
      public static create(
        properties?: eventstore.proto.ISubscribeToStream
      ): eventstore.proto.SubscribeToStream

      /**
       * Encodes the specified SubscribeToStream message. Does not implicitly {@link eventstore.proto.SubscribeToStream.verify|verify} messages.
       * @param message SubscribeToStream message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ISubscribeToStream,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified SubscribeToStream message, length delimited. Does not implicitly {@link eventstore.proto.SubscribeToStream.verify|verify} messages.
       * @param message SubscribeToStream message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ISubscribeToStream,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a SubscribeToStream message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns SubscribeToStream
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.SubscribeToStream

      /**
       * Decodes a SubscribeToStream message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns SubscribeToStream
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.SubscribeToStream

      /**
       * Verifies a SubscribeToStream message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a SubscribeToStream message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns SubscribeToStream
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.SubscribeToStream

      /**
       * Creates a plain object from a SubscribeToStream message. Also converts values to other types if specified.
       * @param message SubscribeToStream
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.SubscribeToStream,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this SubscribeToStream to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a SubscriptionConfirmation. */
    interface ISubscriptionConfirmation {
      /** SubscriptionConfirmation lastCommitPosition */
      lastCommitPosition: number | Long

      /** SubscriptionConfirmation lastEventNumber */
      lastEventNumber?: number | Long | null
    }

    /** Represents a SubscriptionConfirmation. */
    class SubscriptionConfirmation implements ISubscriptionConfirmation {
      /**
       * Constructs a new SubscriptionConfirmation.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ISubscriptionConfirmation)

      /** SubscriptionConfirmation lastCommitPosition. */
      public lastCommitPosition: number | Long

      /** SubscriptionConfirmation lastEventNumber. */
      public lastEventNumber: number | Long

      /**
       * Creates a new SubscriptionConfirmation instance using the specified properties.
       * @param [properties] Properties to set
       * @returns SubscriptionConfirmation instance
       */
      public static create(
        properties?: eventstore.proto.ISubscriptionConfirmation
      ): eventstore.proto.SubscriptionConfirmation

      /**
       * Encodes the specified SubscriptionConfirmation message. Does not implicitly {@link eventstore.proto.SubscriptionConfirmation.verify|verify} messages.
       * @param message SubscriptionConfirmation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ISubscriptionConfirmation,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified SubscriptionConfirmation message, length delimited. Does not implicitly {@link eventstore.proto.SubscriptionConfirmation.verify|verify} messages.
       * @param message SubscriptionConfirmation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ISubscriptionConfirmation,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a SubscriptionConfirmation message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns SubscriptionConfirmation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.SubscriptionConfirmation

      /**
       * Decodes a SubscriptionConfirmation message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns SubscriptionConfirmation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.SubscriptionConfirmation

      /**
       * Verifies a SubscriptionConfirmation message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a SubscriptionConfirmation message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns SubscriptionConfirmation
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.SubscriptionConfirmation

      /**
       * Creates a plain object from a SubscriptionConfirmation message. Also converts values to other types if specified.
       * @param message SubscriptionConfirmation
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.SubscriptionConfirmation,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this SubscriptionConfirmation to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a StreamEventAppeared. */
    interface IStreamEventAppeared {
      /** StreamEventAppeared event */
      event: eventstore.proto.IResolvedEvent
    }

    /** Represents a StreamEventAppeared. */
    class StreamEventAppeared implements IStreamEventAppeared {
      /**
       * Constructs a new StreamEventAppeared.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IStreamEventAppeared)

      /** StreamEventAppeared event. */
      public event: eventstore.proto.IResolvedEvent

      /**
       * Creates a new StreamEventAppeared instance using the specified properties.
       * @param [properties] Properties to set
       * @returns StreamEventAppeared instance
       */
      public static create(
        properties?: eventstore.proto.IStreamEventAppeared
      ): eventstore.proto.StreamEventAppeared

      /**
       * Encodes the specified StreamEventAppeared message. Does not implicitly {@link eventstore.proto.StreamEventAppeared.verify|verify} messages.
       * @param message StreamEventAppeared message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IStreamEventAppeared,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified StreamEventAppeared message, length delimited. Does not implicitly {@link eventstore.proto.StreamEventAppeared.verify|verify} messages.
       * @param message StreamEventAppeared message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IStreamEventAppeared,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a StreamEventAppeared message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns StreamEventAppeared
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.StreamEventAppeared

      /**
       * Decodes a StreamEventAppeared message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns StreamEventAppeared
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.StreamEventAppeared

      /**
       * Verifies a StreamEventAppeared message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a StreamEventAppeared message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns StreamEventAppeared
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.StreamEventAppeared

      /**
       * Creates a plain object from a StreamEventAppeared message. Also converts values to other types if specified.
       * @param message StreamEventAppeared
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.StreamEventAppeared,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this StreamEventAppeared to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of an UnsubscribeFromStream. */
    interface IUnsubscribeFromStream {}

    /** Represents an UnsubscribeFromStream. */
    class UnsubscribeFromStream implements IUnsubscribeFromStream {
      /**
       * Constructs a new UnsubscribeFromStream.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IUnsubscribeFromStream)

      /**
       * Creates a new UnsubscribeFromStream instance using the specified properties.
       * @param [properties] Properties to set
       * @returns UnsubscribeFromStream instance
       */
      public static create(
        properties?: eventstore.proto.IUnsubscribeFromStream
      ): eventstore.proto.UnsubscribeFromStream

      /**
       * Encodes the specified UnsubscribeFromStream message. Does not implicitly {@link eventstore.proto.UnsubscribeFromStream.verify|verify} messages.
       * @param message UnsubscribeFromStream message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IUnsubscribeFromStream,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified UnsubscribeFromStream message, length delimited. Does not implicitly {@link eventstore.proto.UnsubscribeFromStream.verify|verify} messages.
       * @param message UnsubscribeFromStream message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IUnsubscribeFromStream,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes an UnsubscribeFromStream message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns UnsubscribeFromStream
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.UnsubscribeFromStream

      /**
       * Decodes an UnsubscribeFromStream message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns UnsubscribeFromStream
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.UnsubscribeFromStream

      /**
       * Verifies an UnsubscribeFromStream message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates an UnsubscribeFromStream message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns UnsubscribeFromStream
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.UnsubscribeFromStream

      /**
       * Creates a plain object from an UnsubscribeFromStream message. Also converts values to other types if specified.
       * @param message UnsubscribeFromStream
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.UnsubscribeFromStream,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this UnsubscribeFromStream to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a SubscriptionDropped. */
    interface ISubscriptionDropped {
      /** SubscriptionDropped reason */
      reason?: eventstore.proto.SubscriptionDropped.SubscriptionDropReason | null
    }

    /** Represents a SubscriptionDropped. */
    class SubscriptionDropped implements ISubscriptionDropped {
      /**
       * Constructs a new SubscriptionDropped.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.ISubscriptionDropped)

      /** SubscriptionDropped reason. */
      public reason: eventstore.proto.SubscriptionDropped.SubscriptionDropReason

      /**
       * Creates a new SubscriptionDropped instance using the specified properties.
       * @param [properties] Properties to set
       * @returns SubscriptionDropped instance
       */
      public static create(
        properties?: eventstore.proto.ISubscriptionDropped
      ): eventstore.proto.SubscriptionDropped

      /**
       * Encodes the specified SubscriptionDropped message. Does not implicitly {@link eventstore.proto.SubscriptionDropped.verify|verify} messages.
       * @param message SubscriptionDropped message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.ISubscriptionDropped,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified SubscriptionDropped message, length delimited. Does not implicitly {@link eventstore.proto.SubscriptionDropped.verify|verify} messages.
       * @param message SubscriptionDropped message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.ISubscriptionDropped,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a SubscriptionDropped message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns SubscriptionDropped
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.SubscriptionDropped

      /**
       * Decodes a SubscriptionDropped message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns SubscriptionDropped
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.SubscriptionDropped

      /**
       * Verifies a SubscriptionDropped message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a SubscriptionDropped message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns SubscriptionDropped
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.SubscriptionDropped

      /**
       * Creates a plain object from a SubscriptionDropped message. Also converts values to other types if specified.
       * @param message SubscriptionDropped
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.SubscriptionDropped,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this SubscriptionDropped to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    namespace SubscriptionDropped {
      /** SubscriptionDropReason enum. */
      enum SubscriptionDropReason {
        Unsubscribed = 0,
        AccessDenied = 1,
        NotFound = 2,
        PersistentSubscriptionDeleted = 3,
        SubscriberMaxCountReached = 4
      }
    }

    /** Properties of a NotHandled. */
    interface INotHandled {
      /** NotHandled reason */
      reason: eventstore.proto.NotHandled.NotHandledReason

      /** NotHandled additionalInfo */
      additionalInfo?: eventstore.proto.NotHandled.IMasterInfo | null
    }

    /** Represents a NotHandled. */
    class NotHandled implements INotHandled {
      /**
       * Constructs a new NotHandled.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.INotHandled)

      /** NotHandled reason. */
      public reason: eventstore.proto.NotHandled.NotHandledReason

      /** NotHandled additionalInfo. */
      public additionalInfo?: eventstore.proto.NotHandled.IMasterInfo | null

      /**
       * Creates a new NotHandled instance using the specified properties.
       * @param [properties] Properties to set
       * @returns NotHandled instance
       */
      public static create(properties?: eventstore.proto.INotHandled): eventstore.proto.NotHandled

      /**
       * Encodes the specified NotHandled message. Does not implicitly {@link eventstore.proto.NotHandled.verify|verify} messages.
       * @param message NotHandled message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.INotHandled,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified NotHandled message, length delimited. Does not implicitly {@link eventstore.proto.NotHandled.verify|verify} messages.
       * @param message NotHandled message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.INotHandled,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a NotHandled message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns NotHandled
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.NotHandled

      /**
       * Decodes a NotHandled message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns NotHandled
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.NotHandled

      /**
       * Verifies a NotHandled message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a NotHandled message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns NotHandled
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.NotHandled

      /**
       * Creates a plain object from a NotHandled message. Also converts values to other types if specified.
       * @param message NotHandled
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.NotHandled,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this NotHandled to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    namespace NotHandled {
      /** NotHandledReason enum. */
      enum NotHandledReason {
        NotReady = 0,
        TooBusy = 1,
        NotMaster = 2
      }

      /** Properties of a MasterInfo. */
      interface IMasterInfo {
        /** MasterInfo externalTcpAddress */
        externalTcpAddress: string

        /** MasterInfo externalTcpPort */
        externalTcpPort: number

        /** MasterInfo externalHttpAddress */
        externalHttpAddress: string

        /** MasterInfo externalHttpPort */
        externalHttpPort: number

        /** MasterInfo externalSecureTcpAddress */
        externalSecureTcpAddress?: string | null

        /** MasterInfo externalSecureTcpPort */
        externalSecureTcpPort?: number | null
      }

      /** Represents a MasterInfo. */
      class MasterInfo implements IMasterInfo {
        /**
         * Constructs a new MasterInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: eventstore.proto.NotHandled.IMasterInfo)

        /** MasterInfo externalTcpAddress. */
        public externalTcpAddress: string

        /** MasterInfo externalTcpPort. */
        public externalTcpPort: number

        /** MasterInfo externalHttpAddress. */
        public externalHttpAddress: string

        /** MasterInfo externalHttpPort. */
        public externalHttpPort: number

        /** MasterInfo externalSecureTcpAddress. */
        public externalSecureTcpAddress: string

        /** MasterInfo externalSecureTcpPort. */
        public externalSecureTcpPort: number

        /**
         * Creates a new MasterInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MasterInfo instance
         */
        public static create(
          properties?: eventstore.proto.NotHandled.IMasterInfo
        ): eventstore.proto.NotHandled.MasterInfo

        /**
         * Encodes the specified MasterInfo message. Does not implicitly {@link eventstore.proto.NotHandled.MasterInfo.verify|verify} messages.
         * @param message MasterInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: eventstore.proto.NotHandled.IMasterInfo,
          writer?: $protobuf.Writer
        ): $protobuf.Writer

        /**
         * Encodes the specified MasterInfo message, length delimited. Does not implicitly {@link eventstore.proto.NotHandled.MasterInfo.verify|verify} messages.
         * @param message MasterInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: eventstore.proto.NotHandled.IMasterInfo,
          writer?: $protobuf.Writer
        ): $protobuf.Writer

        /**
         * Decodes a MasterInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MasterInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): eventstore.proto.NotHandled.MasterInfo

        /**
         * Decodes a MasterInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MasterInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): eventstore.proto.NotHandled.MasterInfo

        /**
         * Verifies a MasterInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: {[k: string]: any}): string | null

        /**
         * Creates a MasterInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MasterInfo
         */
        public static fromObject(object: {[k: string]: any}): eventstore.proto.NotHandled.MasterInfo

        /**
         * Creates a plain object from a MasterInfo message. Also converts values to other types if specified.
         * @param message MasterInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: eventstore.proto.NotHandled.MasterInfo,
          options?: $protobuf.IConversionOptions
        ): {[k: string]: any}

        /**
         * Converts this MasterInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): {[k: string]: any}
      }
    }

    /** Properties of a ScavengeDatabase. */
    interface IScavengeDatabase {}

    /** Represents a ScavengeDatabase. */
    class ScavengeDatabase implements IScavengeDatabase {
      /**
       * Constructs a new ScavengeDatabase.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IScavengeDatabase)

      /**
       * Creates a new ScavengeDatabase instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ScavengeDatabase instance
       */
      public static create(
        properties?: eventstore.proto.IScavengeDatabase
      ): eventstore.proto.ScavengeDatabase

      /**
       * Encodes the specified ScavengeDatabase message. Does not implicitly {@link eventstore.proto.ScavengeDatabase.verify|verify} messages.
       * @param message ScavengeDatabase message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IScavengeDatabase,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ScavengeDatabase message, length delimited. Does not implicitly {@link eventstore.proto.ScavengeDatabase.verify|verify} messages.
       * @param message ScavengeDatabase message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IScavengeDatabase,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ScavengeDatabase message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ScavengeDatabase
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ScavengeDatabase

      /**
       * Decodes a ScavengeDatabase message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ScavengeDatabase
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ScavengeDatabase

      /**
       * Verifies a ScavengeDatabase message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ScavengeDatabase message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ScavengeDatabase
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.ScavengeDatabase

      /**
       * Creates a plain object from a ScavengeDatabase message. Also converts values to other types if specified.
       * @param message ScavengeDatabase
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ScavengeDatabase,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ScavengeDatabase to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a ScavengeDatabaseResponse. */
    interface IScavengeDatabaseResponse {
      /** ScavengeDatabaseResponse result */
      result: eventstore.proto.ScavengeDatabaseResponse.ScavengeResult

      /** ScavengeDatabaseResponse scavengeId */
      scavengeId?: string | null
    }

    /** Represents a ScavengeDatabaseResponse. */
    class ScavengeDatabaseResponse implements IScavengeDatabaseResponse {
      /**
       * Constructs a new ScavengeDatabaseResponse.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IScavengeDatabaseResponse)

      /** ScavengeDatabaseResponse result. */
      public result: eventstore.proto.ScavengeDatabaseResponse.ScavengeResult

      /** ScavengeDatabaseResponse scavengeId. */
      public scavengeId: string

      /**
       * Creates a new ScavengeDatabaseResponse instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ScavengeDatabaseResponse instance
       */
      public static create(
        properties?: eventstore.proto.IScavengeDatabaseResponse
      ): eventstore.proto.ScavengeDatabaseResponse

      /**
       * Encodes the specified ScavengeDatabaseResponse message. Does not implicitly {@link eventstore.proto.ScavengeDatabaseResponse.verify|verify} messages.
       * @param message ScavengeDatabaseResponse message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IScavengeDatabaseResponse,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ScavengeDatabaseResponse message, length delimited. Does not implicitly {@link eventstore.proto.ScavengeDatabaseResponse.verify|verify} messages.
       * @param message ScavengeDatabaseResponse message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IScavengeDatabaseResponse,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ScavengeDatabaseResponse message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ScavengeDatabaseResponse
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ScavengeDatabaseResponse

      /**
       * Decodes a ScavengeDatabaseResponse message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ScavengeDatabaseResponse
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ScavengeDatabaseResponse

      /**
       * Verifies a ScavengeDatabaseResponse message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ScavengeDatabaseResponse message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ScavengeDatabaseResponse
       */
      public static fromObject(object: {
        [k: string]: any
      }): eventstore.proto.ScavengeDatabaseResponse

      /**
       * Creates a plain object from a ScavengeDatabaseResponse message. Also converts values to other types if specified.
       * @param message ScavengeDatabaseResponse
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ScavengeDatabaseResponse,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ScavengeDatabaseResponse to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    namespace ScavengeDatabaseResponse {
      /** ScavengeResult enum. */
      enum ScavengeResult {
        Started = 0,
        InProgress = 1,
        Unauthorized = 2
      }
    }

    /** Properties of an IdentifyClient. */
    interface IIdentifyClient {
      /** IdentifyClient version */
      version: number

      /** IdentifyClient connectionName */
      connectionName?: string | null
    }

    /** Represents an IdentifyClient. */
    class IdentifyClient implements IIdentifyClient {
      /**
       * Constructs a new IdentifyClient.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IIdentifyClient)

      /** IdentifyClient version. */
      public version: number

      /** IdentifyClient connectionName. */
      public connectionName: string

      /**
       * Creates a new IdentifyClient instance using the specified properties.
       * @param [properties] Properties to set
       * @returns IdentifyClient instance
       */
      public static create(
        properties?: eventstore.proto.IIdentifyClient
      ): eventstore.proto.IdentifyClient

      /**
       * Encodes the specified IdentifyClient message. Does not implicitly {@link eventstore.proto.IdentifyClient.verify|verify} messages.
       * @param message IdentifyClient message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IIdentifyClient,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified IdentifyClient message, length delimited. Does not implicitly {@link eventstore.proto.IdentifyClient.verify|verify} messages.
       * @param message IdentifyClient message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IIdentifyClient,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes an IdentifyClient message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns IdentifyClient
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.IdentifyClient

      /**
       * Decodes an IdentifyClient message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns IdentifyClient
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.IdentifyClient

      /**
       * Verifies an IdentifyClient message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates an IdentifyClient message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns IdentifyClient
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.IdentifyClient

      /**
       * Creates a plain object from an IdentifyClient message. Also converts values to other types if specified.
       * @param message IdentifyClient
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.IdentifyClient,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this IdentifyClient to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }

    /** Properties of a ClientIdentified. */
    interface IClientIdentified {}

    /** Represents a ClientIdentified. */
    class ClientIdentified implements IClientIdentified {
      /**
       * Constructs a new ClientIdentified.
       * @param [properties] Properties to set
       */
      constructor(properties?: eventstore.proto.IClientIdentified)

      /**
       * Creates a new ClientIdentified instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ClientIdentified instance
       */
      public static create(
        properties?: eventstore.proto.IClientIdentified
      ): eventstore.proto.ClientIdentified

      /**
       * Encodes the specified ClientIdentified message. Does not implicitly {@link eventstore.proto.ClientIdentified.verify|verify} messages.
       * @param message ClientIdentified message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: eventstore.proto.IClientIdentified,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified ClientIdentified message, length delimited. Does not implicitly {@link eventstore.proto.ClientIdentified.verify|verify} messages.
       * @param message ClientIdentified message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: eventstore.proto.IClientIdentified,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes a ClientIdentified message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ClientIdentified
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): eventstore.proto.ClientIdentified

      /**
       * Decodes a ClientIdentified message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ClientIdentified
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): eventstore.proto.ClientIdentified

      /**
       * Verifies a ClientIdentified message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: {[k: string]: any}): string | null

      /**
       * Creates a ClientIdentified message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ClientIdentified
       */
      public static fromObject(object: {[k: string]: any}): eventstore.proto.ClientIdentified

      /**
       * Creates a plain object from a ClientIdentified message. Also converts values to other types if specified.
       * @param message ClientIdentified
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: eventstore.proto.ClientIdentified,
        options?: $protobuf.IConversionOptions
      ): {[k: string]: any}

      /**
       * Converts this ClientIdentified to JSON.
       * @returns JSON object
       */
      public toJSON(): {[k: string]: any}
    }
  }
}
