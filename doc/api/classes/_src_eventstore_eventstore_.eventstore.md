[eventstore-ts-client](../README.md) > ["src/eventstore/Eventstore"](../modules/_src_eventstore_eventstore_.md) > [Eventstore](../classes/_src_eventstore_eventstore_.eventstore.md)

# Class: Eventstore

Base class to communicate with eventstore

*__export__*: 

*__class__*: Eventstore

*__extends__*: {EventEmitter}

## Hierarchy

 `EventEmitter`

**↳ Eventstore**

## Index

### Constructors

* [constructor](_src_eventstore_eventstore_.eventstore.md#constructor)

### Properties

* [connection](_src_eventstore_eventstore_.eventstore.md#connection)
* [connectionConfig](_src_eventstore_eventstore_.eventstore.md#connectionconfig)
* [log](_src_eventstore_eventstore_.eventstore.md#log)
* [defaultMaxListeners](_src_eventstore_eventstore_.eventstore.md#defaultmaxlisteners)

### Accessors

* [isConnected](_src_eventstore_eventstore_.eventstore.md#isconnected)
* [logger](_src_eventstore_eventstore_.eventstore.md#logger)
* [name](_src_eventstore_eventstore_.eventstore.md#name)

### Methods

* [addListener](_src_eventstore_eventstore_.eventstore.md#addlistener)
* [connect](_src_eventstore_eventstore_.eventstore.md#connect)
* [disconnect](_src_eventstore_eventstore_.eventstore.md#disconnect)
* [emit](_src_eventstore_eventstore_.eventstore.md#emit)
* [eventNames](_src_eventstore_eventstore_.eventstore.md#eventnames)
* [getConnection](_src_eventstore_eventstore_.eventstore.md#getconnection)
* [getMaxListeners](_src_eventstore_eventstore_.eventstore.md#getmaxlisteners)
* [identifyClient](_src_eventstore_eventstore_.eventstore.md#identifyclient)
* [init](_src_eventstore_eventstore_.eventstore.md#init)
* [listenerCount](_src_eventstore_eventstore_.eventstore.md#listenercount)
* [listeners](_src_eventstore_eventstore_.eventstore.md#listeners)
* [off](_src_eventstore_eventstore_.eventstore.md#off)
* [on](_src_eventstore_eventstore_.eventstore.md#on)
* [once](_src_eventstore_eventstore_.eventstore.md#once)
* [ping](_src_eventstore_eventstore_.eventstore.md#ping)
* [prependListener](_src_eventstore_eventstore_.eventstore.md#prependlistener)
* [prependOnceListener](_src_eventstore_eventstore_.eventstore.md#prependoncelistener)
* [rawListeners](_src_eventstore_eventstore_.eventstore.md#rawlisteners)
* [removeAllListeners](_src_eventstore_eventstore_.eventstore.md#removealllisteners)
* [removeListener](_src_eventstore_eventstore_.eventstore.md#removelistener)
* [setMaxListeners](_src_eventstore_eventstore_.eventstore.md#setmaxlisteners)
* [stream](_src_eventstore_eventstore_.eventstore.md#stream)
* [listenerCount](_src_eventstore_eventstore_.eventstore.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Eventstore**(connectionConfiguration?: *[EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md) \| `object`*): [Eventstore](_src_eventstore_eventstore_.eventstore.md)

*Defined in [src/eventstore/Eventstore.ts:22](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L22)*

Creates an instance of Eventstore.

*__memberof__*: Eventstore

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` connectionConfiguration | [EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md) \| `object` |  {} |

**Returns:** [Eventstore](_src_eventstore_eventstore_.eventstore.md)

___

## Properties

<a id="connection"></a>

### `<Protected>` connection

**● connection**: *[TCPConnection](_src_eventstore_tcpconnection_.tcpconnection.md)*

*Defined in [src/eventstore/Eventstore.ts:22](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L22)*

___
<a id="connectionconfig"></a>

### `<Protected>` connectionConfig

**● connectionConfig**: *[EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md)*

*Defined in [src/eventstore/Eventstore.ts:20](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L20)*

___
<a id="log"></a>

### `<Protected>` log

**● log**: *`bunyan`*

*Defined in [src/eventstore/Eventstore.ts:21](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L21)*

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:8*

___

## Accessors

<a id="isconnected"></a>

###  isConnected

**get isConnected**(): `boolean`

*Defined in [src/eventstore/Eventstore.ts:93](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L93)*

Inidcates if connection to eventstore is available

*__readonly__*: 

*__type__*: {boolean}

*__memberof__*: Eventstore

**Returns:** `boolean`

___
<a id="logger"></a>

###  logger

**get logger**(): `bunyan`

**set logger**(newLogger: *`bunyan`*): `void`

*Defined in [src/eventstore/Eventstore.ts:110](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L110)*

Get current logger instance

*__type__*: {bunyan}

*__memberof__*: Eventstore

**Returns:** `bunyan`

*Defined in [src/eventstore/Eventstore.ts:119](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L119)*

Set logger instance

*__memberof__*: Eventstore

**Parameters:**

| Name | Type |
| ------ | ------ |
| newLogger | `bunyan` |

**Returns:** `void`

___
<a id="name"></a>

###  name

**get name**(): `string`

*Defined in [src/eventstore/Eventstore.ts:56](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L56)*

Returns client id - name of eventstore connection

*__readonly__*: 

*__type__*: {string}

*__memberof__*: Eventstore

**Returns:** `string`

___

## Methods

<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/events.d.ts:10*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="connect"></a>

###  connect

▸ **connect**(connectionConfiguration?: *[EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md) \| `object`*): `Promise`<`void`>

*Defined in [src/eventstore/Eventstore.ts:67](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L67)*

Connect to eventstore

*__memberof__*: Eventstore

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` connectionConfiguration | [EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md) \| `object` |  {} |

**Returns:** `Promise`<`void`>

___
<a id="disconnect"></a>

###  disconnect

▸ **disconnect**(): `Promise`<`void`>

*Defined in [src/eventstore/Eventstore.ts:79](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L79)*

Disconnect from eventstore and try to drain pending requests

*__memberof__*: Eventstore

**Returns:** `Promise`<`void`>

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *`string` \| `symbol`*, ...args: *`any`[]*): `boolean`

*Inherited from EventEmitter.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/events.d.ts:22*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| `Rest` args | `any`[] |

**Returns:** `boolean`

___
<a id="eventnames"></a>

###  eventNames

▸ **eventNames**(): `Array`<`string` \| `symbol`>

*Inherited from EventEmitter.eventNames*

*Overrides EventEmitter.eventNames*

*Defined in node_modules/@types/node/events.d.ts:23*

**Returns:** `Array`<`string` \| `symbol`>

___
<a id="getconnection"></a>

###  getConnection

▸ **getConnection**(): [TCPConnection](_src_eventstore_tcpconnection_.tcpconnection.md)

*Defined in [src/eventstore/Eventstore.ts:100](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L100)*

**Returns:** [TCPConnection](_src_eventstore_tcpconnection_.tcpconnection.md)

___
<a id="getmaxlisteners"></a>

###  getMaxListeners

▸ **getMaxListeners**(): `number`

*Inherited from EventEmitter.getMaxListeners*

*Overrides EventEmitter.getMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:19*

**Returns:** `number`

___
<a id="identifyclient"></a>

### `<Protected>` identifyClient

▸ **identifyClient**(): `Promise`<`void`>

*Defined in [src/eventstore/Eventstore.ts:170](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L170)*

Called direytly after connecting to eventstore Identifies connection against eventstore Identification can be set in connection settings field clientId

*__memberof__*: Eventstore

**Returns:** `Promise`<`void`>

___
<a id="init"></a>

### `<Protected>` init

▸ **init**(connectionConfiguration?: *[EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md) \| `object`*): `void`

*Defined in [src/eventstore/Eventstore.ts:43](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L43)*

Ensure to use up-to-date settings, logger and a fresh connection socket

*__memberof__*: Eventstore

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` connectionConfiguration | [EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md) \| `object` |  {} |

**Returns:** `void`

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(type: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Overrides EventEmitter.listenerCount*

*Defined in node_modules/@types/node/events.d.ts:24*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | `string` \| `symbol` |

**Returns:** `number`

___
<a id="listeners"></a>

###  listeners

▸ **listeners**(event: *`string` \| `symbol`*): `Function`[]

*Inherited from EventEmitter.listeners*

*Overrides EventEmitter.listeners*

*Defined in node_modules/@types/node/events.d.ts:20*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

___
<a id="off"></a>

###  off

▸ **off**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.off*

*Overrides EventEmitter.off*

*Defined in node_modules/@types/node/events.d.ts:16*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="on"></a>

###  on

▸ **on**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/events.d.ts:11*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/events.d.ts:12*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="ping"></a>

###  ping

▸ **ping**(): `Promise`<`void`>

*Defined in [src/eventstore/Eventstore.ts:146](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L146)*

Ping eventstore

*__memberof__*: Eventstore

**Returns:** `Promise`<`void`>

___
<a id="prependlistener"></a>

###  prependListener

▸ **prependListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/events.d.ts:13*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="prependoncelistener"></a>

###  prependOnceListener

▸ **prependOnceListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/events.d.ts:14*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="rawlisteners"></a>

###  rawListeners

▸ **rawListeners**(event: *`string` \| `symbol`*): `Function`[]

*Inherited from EventEmitter.rawListeners*

*Overrides EventEmitter.rawListeners*

*Defined in node_modules/@types/node/events.d.ts:21*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

___
<a id="removealllisteners"></a>

###  removeAllListeners

▸ **removeAllListeners**(event?: *`string` \| `symbol`*): `this`

*Inherited from EventEmitter.removeAllListeners*

*Overrides EventEmitter.removeAllListeners*

*Defined in node_modules/@types/node/events.d.ts:17*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | `string` \| `symbol` |

**Returns:** `this`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/events.d.ts:15*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="setmaxlisteners"></a>

###  setMaxListeners

▸ **setMaxListeners**(n: *`number`*): `this`

*Inherited from EventEmitter.setMaxListeners*

*Overrides EventEmitter.setMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:18*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `this`

___
<a id="stream"></a>

###  stream

▸ **stream**(streamName: *`string`*, streamOptions?: *[StreamOptions](../interfaces/_src_stream_stream_.streamoptions.md)*): `Promise`<[Stream](_src_stream_stream_.stream.md)>

*Defined in [src/eventstore/Eventstore.ts:131](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/Eventstore.ts#L131)*

Get a stream instance specified by streamName

*__memberof__*: Eventstore

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| streamName | `string` |  \- |
| `Optional` streamOptions | [StreamOptions](../interfaces/_src_stream_stream_.streamoptions.md) |

**Returns:** `Promise`<[Stream](_src_stream_stream_.stream.md)>

___
<a id="listenercount-1"></a>

### `<Static>` listenerCount

▸ **listenerCount**(emitter: *`EventEmitter`*, event: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Defined in node_modules/@types/node/events.d.ts:7*

*__deprecated__*: since v4.0.0

**Parameters:**

| Name | Type |
| ------ | ------ |
| emitter | `EventEmitter` |
| event | `string` \| `symbol` |

**Returns:** `number`

___

