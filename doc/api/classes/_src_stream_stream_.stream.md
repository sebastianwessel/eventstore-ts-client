[eventstore-ts-client](../README.md) > ["src/stream/Stream"](../modules/_src_stream_stream_.md) > [Stream](../classes/_src_stream_stream_.stream.md)

# Class: Stream

## Hierarchy

**Stream**

## Index

### Constructors

* [constructor](_src_stream_stream_.stream.md#constructor)

### Properties

* [esConnection](_src_stream_stream_.stream.md#esconnection)
* [log](_src_stream_stream_.stream.md#log)
* [options](_src_stream_stream_.stream.md#options)
* [streamName](_src_stream_stream_.stream.md#streamname)

### Accessors

* [logger](_src_stream_stream_.stream.md#logger)

### Methods

* [aggregate](_src_stream_stream_.stream.md#aggregate)
* [catchupSubscribe](_src_stream_stream_.stream.md#catchupsubscribe)
* [delete](_src_stream_stream_.stream.md#delete)
* [emit](_src_stream_stream_.stream.md#emit)
* [emitEvent](_src_stream_stream_.stream.md#emitevent)
* [emitEvents](_src_stream_stream_.stream.md#emitevents)
* [getFirstEvent](_src_stream_stream_.stream.md#getfirstevent)
* [getFirstEventOf](_src_stream_stream_.stream.md#getfirsteventof)
* [getLastEvent](_src_stream_stream_.stream.md#getlastevent)
* [getLastEventOf](_src_stream_stream_.stream.md#getlasteventof)
* [getMetadata](_src_stream_stream_.stream.md#getmetadata)
* [hardDelete](_src_stream_stream_.stream.md#harddelete)
* [setMetadata](_src_stream_stream_.stream.md#setmetadata)
* [softDelete](_src_stream_stream_.stream.md#softdelete)
* [startTransaction](_src_stream_stream_.stream.md#starttransaction)
* [subscribe](_src_stream_stream_.stream.md#subscribe)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Stream**(eventstore: *[Eventstore](_src_eventstore_eventstore_.eventstore.md)*, streamName: *`string`*, options: *[StreamOptions](../interfaces/_src_stream_stream_.streamoptions.md)*): [Stream](_src_stream_stream_.stream.md)

*Defined in [src/stream/Stream.ts:23](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventstore | [Eventstore](_src_eventstore_eventstore_.eventstore.md) |
| streamName | `string` |
| options | [StreamOptions](../interfaces/_src_stream_stream_.streamoptions.md) |

**Returns:** [Stream](_src_stream_stream_.stream.md)

___

## Properties

<a id="esconnection"></a>

### `<Protected>` esConnection

**● esConnection**: *[Eventstore](_src_eventstore_eventstore_.eventstore.md)*

*Defined in [src/stream/Stream.ts:20](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L20)*

___
<a id="log"></a>

###  log

**● log**: *`bunyan`*

*Defined in [src/stream/Stream.ts:21](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L21)*

___
<a id="options"></a>

### `<Protected>` options

**● options**: *[StreamOptions](../interfaces/_src_stream_stream_.streamoptions.md)*

*Defined in [src/stream/Stream.ts:23](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L23)*

___
<a id="streamname"></a>

### `<Protected>` streamName

**● streamName**: *`string`*

*Defined in [src/stream/Stream.ts:22](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L22)*

___

## Accessors

<a id="logger"></a>

###  logger

**get logger**(): `bunyan`

*Defined in [src/stream/Stream.ts:35](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L35)*

**Returns:** `bunyan`

___

## Methods

<a id="aggregate"></a>

###  aggregate

▸ **aggregate**<`T`>(initState: *`T`*): `Promise`<`T`>

*Defined in [src/stream/Stream.ts:148](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L148)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| initState | `T` |

**Returns:** `Promise`<`T`>

___
<a id="catchupsubscribe"></a>

###  catchupSubscribe

▸ **catchupSubscribe**(): `Promise`<`void`>

*Defined in [src/stream/Stream.ts:59](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L59)*

**Returns:** `Promise`<`void`>

___
<a id="delete"></a>

### `<Protected>` delete

▸ **delete**(hardDelete: *`boolean`*, expectedVersion?: *[ExpectedVersion](../enums/_src_protobuf_expectedversion_.expectedversion.md)*, requireMaster?: *`undefined` \| `false` \| `true`*): `Promise`<`void`>

*Defined in [src/stream/Stream.ts:106](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L106)*

Delete a stream - can't be called directly Use softDelete() or hardDelete() instead

*__memberof__*: Stream

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| hardDelete | `boolean` | - |  \- |
| `Default value` expectedVersion | [ExpectedVersion](../enums/_src_protobuf_expectedversion_.expectedversion.md) |  ExpectedVersion.Any |
| `Optional` requireMaster | `undefined` \| `false` \| `true` | - |

**Returns:** `Promise`<`void`>

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *[Event](_src_event_event_.event.md) \| [Event](_src_event_event_.event.md)[]*): `Promise`<`void`>

*Defined in [src/stream/Stream.ts:39](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L39)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | [Event](_src_event_event_.event.md) \| [Event](_src_event_event_.event.md)[] |

**Returns:** `Promise`<`void`>

___
<a id="emitevent"></a>

###  emitEvent

▸ **emitEvent**(event: *[Event](_src_event_event_.event.md)*): `Promise`<`void`>

*Defined in [src/stream/Stream.ts:47](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | [Event](_src_event_event_.event.md) |

**Returns:** `Promise`<`void`>

___
<a id="emitevents"></a>

###  emitEvents

▸ **emitEvents**(events: *[Event](_src_event_event_.event.md)[]*): `Promise`<`void`>

*Defined in [src/stream/Stream.ts:51](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L51)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| events | [Event](_src_event_event_.event.md)[] |

**Returns:** `Promise`<`void`>

___
<a id="getfirstevent"></a>

###  getFirstEvent

▸ **getFirstEvent**(): `Promise`<[Event](_src_event_event_.event.md) \| `null`>

*Defined in [src/stream/Stream.ts:152](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L152)*

**Returns:** `Promise`<[Event](_src_event_event_.event.md) \| `null`>

___
<a id="getfirsteventof"></a>

###  getFirstEventOf

▸ **getFirstEventOf**(): `Promise`<[Event](_src_event_event_.event.md) \| `null`>

*Defined in [src/stream/Stream.ts:160](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L160)*

**Returns:** `Promise`<[Event](_src_event_event_.event.md) \| `null`>

___
<a id="getlastevent"></a>

###  getLastEvent

▸ **getLastEvent**(): `Promise`<[Event](_src_event_event_.event.md) \| `null`>

*Defined in [src/stream/Stream.ts:156](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L156)*

**Returns:** `Promise`<[Event](_src_event_event_.event.md) \| `null`>

___
<a id="getlasteventof"></a>

###  getLastEventOf

▸ **getLastEventOf**(): `Promise`<[Event](_src_event_event_.event.md) \| `null`>

*Defined in [src/stream/Stream.ts:164](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L164)*

**Returns:** `Promise`<[Event](_src_event_event_.event.md) \| `null`>

___
<a id="getmetadata"></a>

###  getMetadata

▸ **getMetadata**(): `Promise`<`object`>

*Defined in [src/stream/Stream.ts:140](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L140)*

**Returns:** `Promise`<`object`>

___
<a id="harddelete"></a>

###  hardDelete

▸ **hardDelete**(expectedVersion?: *[ExpectedVersion](../enums/_src_protobuf_expectedversion_.expectedversion.md)*, requireMaster?: *`undefined` \| `false` \| `true`*): `Promise`<`void`>

*Defined in [src/stream/Stream.ts:71](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L71)*

Hard deletes a stream - stream with same name can not be used in future

*__memberof__*: Stream

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` expectedVersion | [ExpectedVersion](../enums/_src_protobuf_expectedversion_.expectedversion.md) |  ExpectedVersion.Any |
| `Optional` requireMaster | `undefined` \| `false` \| `true` | - |

**Returns:** `Promise`<`void`>

___
<a id="setmetadata"></a>

###  setMetadata

▸ **setMetadata**(newMetadata: *`object`*): `Promise`<`object`>

*Defined in [src/stream/Stream.ts:144](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L144)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| newMetadata | `object` |

**Returns:** `Promise`<`object`>

___
<a id="softdelete"></a>

###  softDelete

▸ **softDelete**(expectedVersion?: *[ExpectedVersion](../enums/_src_protobuf_expectedversion_.expectedversion.md)*, requireMaster?: *`undefined` \| `false` \| `true`*): `Promise`<`void`>

*Defined in [src/stream/Stream.ts:87](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L87)*

Soft deletes a stream - stream with same name can be used in future and indexes are preserved

*__memberof__*: Stream

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` expectedVersion | [ExpectedVersion](../enums/_src_protobuf_expectedversion_.expectedversion.md) |  ExpectedVersion.Any |
| `Optional` requireMaster | `undefined` \| `false` \| `true` | - |

**Returns:** `Promise`<`void`>

___
<a id="starttransaction"></a>

###  startTransaction

▸ **startTransaction**(): `Promise`<`void`>

*Defined in [src/stream/Stream.ts:136](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L136)*

**Returns:** `Promise`<`void`>

___
<a id="subscribe"></a>

###  subscribe

▸ **subscribe**(): `Promise`<`void`>

*Defined in [src/stream/Stream.ts:55](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/stream/Stream.ts#L55)*

**Returns:** `Promise`<`void`>

___

