[eventstore-ts-client](../README.md) > ["src/eventstore/TCPConnection"](../modules/_src_eventstore_tcpconnection_.md) > [TCPConnection](../classes/_src_eventstore_tcpconnection_.tcpconnection.md)

# Class: TCPConnection

Raw tcp communication to eventstore This class handles basic communication with eventstore

*__export__*: 

*__class__*: TCPConnection

*__extends__*: {EventEmitter}

*__emits__*: {Error}

## Hierarchy

 `EventEmitter`

**↳ TCPConnection**

## Index

### Constructors

* [constructor](_src_eventstore_tcpconnection_.tcpconnection.md#constructor)

### Properties

* [connectionConfig](_src_eventstore_tcpconnection_.tcpconnection.md#connectionconfig)
* [connectionId](_src_eventstore_tcpconnection_.tcpconnection.md#connectionid)
* [log](_src_eventstore_tcpconnection_.tcpconnection.md#log)
* [messageCurrentLength](_src_eventstore_tcpconnection_.tcpconnection.md#messagecurrentlength)
* [messageCurrentOffset](_src_eventstore_tcpconnection_.tcpconnection.md#messagecurrentoffset)
* [messageData](_src_eventstore_tcpconnection_.tcpconnection.md#messagedata)
* [pendingRequests](_src_eventstore_tcpconnection_.tcpconnection.md#pendingrequests)
* [socket](_src_eventstore_tcpconnection_.tcpconnection.md#socket)
* [state](_src_eventstore_tcpconnection_.tcpconnection.md#state)
* [subscriptionList](_src_eventstore_tcpconnection_.tcpconnection.md#subscriptionlist)
* [defaultMaxListeners](_src_eventstore_tcpconnection_.tcpconnection.md#defaultmaxlisteners)

### Accessors

* [isConnected](_src_eventstore_tcpconnection_.tcpconnection.md#isconnected)

### Methods

* [addListener](_src_eventstore_tcpconnection_.tcpconnection.md#addlistener)
* [checkOperationResult](_src_eventstore_tcpconnection_.tcpconnection.md#checkoperationresult)
* [connect](_src_eventstore_tcpconnection_.tcpconnection.md#connect)
* [disconnect](_src_eventstore_tcpconnection_.tcpconnection.md#disconnect)
* [emit](_src_eventstore_tcpconnection_.tcpconnection.md#emit)
* [eventNames](_src_eventstore_tcpconnection_.tcpconnection.md#eventnames)
* [getMaxListeners](_src_eventstore_tcpconnection_.tcpconnection.md#getmaxlisteners)
* [handleCreatePersistentSubscriptionCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handlecreatepersistentsubscriptioncompleted)
* [handleDeletePersistentSubscriptionCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handledeletepersistentsubscriptioncompleted)
* [handleDeleteStreamCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handledeletestreamcompleted)
* [handleMultiPacketResponseData](_src_eventstore_tcpconnection_.tcpconnection.md#handlemultipacketresponsedata)
* [handleNewResponseData](_src_eventstore_tcpconnection_.tcpconnection.md#handlenewresponsedata)
* [handlePersistentSubscriptionConfirmation](_src_eventstore_tcpconnection_.tcpconnection.md#handlepersistentsubscriptionconfirmation)
* [handlePersistentSubscriptionStreamEventAppeared](_src_eventstore_tcpconnection_.tcpconnection.md#handlepersistentsubscriptionstreameventappeared)
* [handleReadAllEventsCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handlereadalleventscompleted)
* [handleReadEventCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handlereadeventcompleted)
* [handleReadStreamEventsCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handlereadstreameventscompleted)
* [handleScavengeDatabaseResponse](_src_eventstore_tcpconnection_.tcpconnection.md#handlescavengedatabaseresponse)
* [handleSingleResponseData](_src_eventstore_tcpconnection_.tcpconnection.md#handlesingleresponsedata)
* [handleStreamEventAppeared](_src_eventstore_tcpconnection_.tcpconnection.md#handlestreameventappeared)
* [handleSubscriptionConfirmation](_src_eventstore_tcpconnection_.tcpconnection.md#handlesubscriptionconfirmation)
* [handleSubscriptionDropped](_src_eventstore_tcpconnection_.tcpconnection.md#handlesubscriptiondropped)
* [handleTransactionCommitCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handletransactioncommitcompleted)
* [handleTransactionStartCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handletransactionstartcompleted)
* [handleTransactionWriteCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handletransactionwritecompleted)
* [handleUpdatePersistentSubscriptionCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handleupdatepersistentsubscriptioncompleted)
* [handleWriteEventsCompleted](_src_eventstore_tcpconnection_.tcpconnection.md#handlewriteeventscompleted)
* [listenerCount](_src_eventstore_tcpconnection_.tcpconnection.md#listenercount)
* [listeners](_src_eventstore_tcpconnection_.tcpconnection.md#listeners)
* [off](_src_eventstore_tcpconnection_.tcpconnection.md#off)
* [on](_src_eventstore_tcpconnection_.tcpconnection.md#on)
* [onClose](_src_eventstore_tcpconnection_.tcpconnection.md#onclose)
* [onConnect](_src_eventstore_tcpconnection_.tcpconnection.md#onconnect)
* [onData](_src_eventstore_tcpconnection_.tcpconnection.md#ondata)
* [onDrain](_src_eventstore_tcpconnection_.tcpconnection.md#ondrain)
* [onError](_src_eventstore_tcpconnection_.tcpconnection.md#onerror)
* [once](_src_eventstore_tcpconnection_.tcpconnection.md#once)
* [prependListener](_src_eventstore_tcpconnection_.tcpconnection.md#prependlistener)
* [prependOnceListener](_src_eventstore_tcpconnection_.tcpconnection.md#prependoncelistener)
* [rawListeners](_src_eventstore_tcpconnection_.tcpconnection.md#rawlisteners)
* [rejectCommandPromise](_src_eventstore_tcpconnection_.tcpconnection.md#rejectcommandpromise)
* [removeAllListeners](_src_eventstore_tcpconnection_.tcpconnection.md#removealllisteners)
* [removeListener](_src_eventstore_tcpconnection_.tcpconnection.md#removelistener)
* [resolveCommandPromise](_src_eventstore_tcpconnection_.tcpconnection.md#resolvecommandpromise)
* [sendCommand](_src_eventstore_tcpconnection_.tcpconnection.md#sendcommand)
* [setMaxListeners](_src_eventstore_tcpconnection_.tcpconnection.md#setmaxlisteners)
* [listenerCount](_src_eventstore_tcpconnection_.tcpconnection.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TCPConnection**(connectionConfiguration: *[EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md)*): [TCPConnection](_src_eventstore_tcpconnection_.tcpconnection.md)

*Defined in [src/eventstore/TCPConnection.ts:53](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L53)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| connectionConfiguration | [EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md) |

**Returns:** [TCPConnection](_src_eventstore_tcpconnection_.tcpconnection.md)

___

## Properties

<a id="connectionconfig"></a>

### `<Protected>` connectionConfig

**● connectionConfig**: *[EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md)*

*Defined in [src/eventstore/TCPConnection.ts:44](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L44)*

___
<a id="connectionid"></a>

### `<Protected>` connectionId

**● connectionId**: *`string` \| `null`* =  null

*Defined in [src/eventstore/TCPConnection.ts:46](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L46)*

___
<a id="log"></a>

###  log

**● log**: *`bunyan`*

*Defined in [src/eventstore/TCPConnection.ts:48](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L48)*

___
<a id="messagecurrentlength"></a>

### `<Protected>` messageCurrentLength

**● messageCurrentLength**: *`number`* = 0

*Defined in [src/eventstore/TCPConnection.ts:51](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L51)*

___
<a id="messagecurrentoffset"></a>

### `<Protected>` messageCurrentOffset

**● messageCurrentOffset**: *`number`* = 0

*Defined in [src/eventstore/TCPConnection.ts:50](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L50)*

___
<a id="messagedata"></a>

### `<Protected>` messageData

**● messageData**: *`Buffer` \| `null`* =  null

*Defined in [src/eventstore/TCPConnection.ts:52](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L52)*

___
<a id="pendingrequests"></a>

### `<Protected>` pendingRequests

**● pendingRequests**: *`Map`<`string`, `object`>* =  new Map()

*Defined in [src/eventstore/TCPConnection.ts:47](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L47)*

___
<a id="socket"></a>

### `<Protected>` socket

**● socket**: *`Socket`*

*Defined in [src/eventstore/TCPConnection.ts:45](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L45)*

___
<a id="state"></a>

### `<Protected>` state

**● state**: *[connectionState](../enums/_src_eventstore_tcpconnection_.connectionstate.md)* =  connectionState.closed

*Defined in [src/eventstore/TCPConnection.ts:49](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L49)*

___
<a id="subscriptionlist"></a>

### `<Protected>` subscriptionList

**● subscriptionList**: *`Map`<`string`, [Subscription](_src_subscription_index_.subscription.md)>* =  new Map()

*Defined in [src/eventstore/TCPConnection.ts:53](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L53)*

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

*Defined in [src/eventstore/TCPConnection.ts:76](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L76)*

Returns true if connected to eventstore otherwise false

*__readonly__*: 

*__type__*: {boolean}

*__memberof__*: TCPConnection

**Returns:** `boolean`

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
<a id="checkoperationresult"></a>

### `<Protected>` checkOperationResult

▸ **checkOperationResult**(correlationId: *`string`*, result: *`number`*, message?: *`string`*): `boolean`

*Defined in [src/eventstore/TCPConnection.ts:694](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L694)*

CHecks if given result is an error code It returns true for successful result otherwise it returns false. If result is an error this function rejectes corresponding command promise and remove it from command queue

*__memberof__*: TCPConnection

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| correlationId | `string` | - |  \- |
| result | `number` | - |  \- |
| `Default value` message | `string` | &quot;&quot; |

**Returns:** `boolean`

___
<a id="connect"></a>

###  connect

▸ **connect**(): `Promise`<`void`>

*Defined in [src/eventstore/TCPConnection.ts:86](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L86)*

Connect to eventstore

*__memberof__*: TCPConnection

**Returns:** `Promise`<`void`>

___
<a id="disconnect"></a>

###  disconnect

▸ **disconnect**(): `Promise`<`void`>

*Defined in [src/eventstore/TCPConnection.ts:129](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L129)*

Disconnect from eventstore. It tries to drain pending queue to prevent data loose before connection gets closed If disconnect() is call no new outgoing requests accepted

*__memberof__*: TCPConnection

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
<a id="getmaxlisteners"></a>

###  getMaxListeners

▸ **getMaxListeners**(): `number`

*Inherited from EventEmitter.getMaxListeners*

*Overrides EventEmitter.getMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:19*

**Returns:** `number`

___
<a id="handlecreatepersistentsubscriptioncompleted"></a>

### `<Protected>` handleCreatePersistentSubscriptionCompleted

▸ **handleCreatePersistentSubscriptionCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:456](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L456)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handledeletepersistentsubscriptioncompleted"></a>

### `<Protected>` handleDeletePersistentSubscriptionCompleted

▸ **handleDeletePersistentSubscriptionCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:479](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L479)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handledeletestreamcompleted"></a>

### `<Protected>` handleDeleteStreamCompleted

▸ **handleDeleteStreamCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:502](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L502)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handlemultipacketresponsedata"></a>

### `<Protected>` handleMultiPacketResponseData

▸ **handleMultiPacketResponseData**(data: *`Buffer`*): `Buffer` \| `null`

*Defined in [src/eventstore/TCPConnection.ts:296](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L296)*

This function handles raw buffer responses received within multiple tcp data package

*__memberof__*: TCPConnection

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `Buffer` |  \- |

**Returns:** `Buffer` \| `null`

___
<a id="handlenewresponsedata"></a>

### `<Protected>` handleNewResponseData

▸ **handleNewResponseData**(data: *`Buffer`*): `Buffer` \| `null`

*Defined in [src/eventstore/TCPConnection.ts:255](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L255)*

Gets called as soon as new data over tcp connection arrives as raw buffer data Checks if

*   new received data is part of previously received data
*   new data contains multiple responses
*   new data is single response

*__memberof__*: TCPConnection

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `Buffer` |  \- |

**Returns:** `Buffer` \| `null`

___
<a id="handlepersistentsubscriptionconfirmation"></a>

### `<Protected>` handlePersistentSubscriptionConfirmation

▸ **handlePersistentSubscriptionConfirmation**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:670](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L670)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handlepersistentsubscriptionstreameventappeared"></a>

### `<Protected>` handlePersistentSubscriptionStreamEventAppeared

▸ **handlePersistentSubscriptionStreamEventAppeared**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:675](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L675)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handlereadalleventscompleted"></a>

### `<Protected>` handleReadAllEventsCompleted

▸ **handleReadAllEventsCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:509](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L509)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handlereadeventcompleted"></a>

### `<Protected>` handleReadEventCompleted

▸ **handleReadEventCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:558](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L558)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handlereadstreameventscompleted"></a>

### `<Protected>` handleReadStreamEventsCompleted

▸ **handleReadStreamEventsCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:530](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L530)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handlescavengedatabaseresponse"></a>

### `<Protected>` handleScavengeDatabaseResponse

▸ **handleScavengeDatabaseResponse**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:594](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L594)*

Handle scavenge database command response

*__memberof__*: TCPConnection

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| correlationId | `string` |  \- |
| payload | `Buffer` |  \- |

**Returns:** `void`

___
<a id="handlesingleresponsedata"></a>

### `<Protected>` handleSingleResponseData

▸ **handleSingleResponseData**(data: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:318](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L318)*

This function handles a single raw buffer response

*__memberof__*: TCPConnection

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `Buffer` |  \- |

**Returns:** `void`

___
<a id="handlestreameventappeared"></a>

### `<Protected>` handleStreamEventAppeared

▸ **handleStreamEventAppeared**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:605](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L605)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handlesubscriptionconfirmation"></a>

### `<Protected>` handleSubscriptionConfirmation

▸ **handleSubscriptionConfirmation**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:611](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L611)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handlesubscriptiondropped"></a>

### `<Protected>` handleSubscriptionDropped

▸ **handleSubscriptionDropped**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:616](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L616)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handletransactioncommitcompleted"></a>

### `<Protected>` handleTransactionCommitCompleted

▸ **handleTransactionCommitCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:621](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L621)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handletransactionstartcompleted"></a>

### `<Protected>` handleTransactionStartCompleted

▸ **handleTransactionStartCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:628](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L628)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handletransactionwritecompleted"></a>

### `<Protected>` handleTransactionWriteCompleted

▸ **handleTransactionWriteCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:635](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L635)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handleupdatepersistentsubscriptioncompleted"></a>

### `<Protected>` handleUpdatePersistentSubscriptionCompleted

▸ **handleUpdatePersistentSubscriptionCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:642](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L642)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

**Returns:** `void`

___
<a id="handlewriteeventscompleted"></a>

### `<Protected>` handleWriteEventsCompleted

▸ **handleWriteEventsCompleted**(correlationId: *`string`*, payload: *`Buffer`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:663](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L663)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| correlationId | `string` |
| payload | `Buffer` |

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
<a id="onclose"></a>

### `<Protected>` onClose

▸ **onClose**(): `void`

*Defined in [src/eventstore/TCPConnection.ts:815](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L815)*

Emit as soon as connection to eventstore is closed

*__memberof__*: TCPConnection

**Returns:** `void`

___
<a id="onconnect"></a>

### `<Protected>` onConnect

▸ **onConnect**(): `void`

*Defined in [src/eventstore/TCPConnection.ts:793](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L793)*

Emit as soon as connection to eventstore was established successfull

*__memberof__*: TCPConnection

**Returns:** `void`

___
<a id="ondata"></a>

### `<Protected>` onData

▸ **onData**(data: *`Buffer` \| `null`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:799](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L799)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Buffer` \| `null` |

**Returns:** `void`

___
<a id="ondrain"></a>

### `<Protected>` onDrain

▸ **onDrain**(): `void`

*Defined in [src/eventstore/TCPConnection.ts:824](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L824)*

Emit when connection starts draining

**Returns:** `void`

___
<a id="onerror"></a>

### `<Protected>` onError

▸ **onError**(err?: *[Error](_src_errors_eventstoreerror_.eventstoreerror.md#error)*): `void`

*Defined in [src/eventstore/TCPConnection.ts:782](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L782)*

Emit general low level connection errors (communication errors). Will not emit errors on business level

*__memberof__*: TCPConnection

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` err | [Error](_src_errors_eventstoreerror_.eventstoreerror.md#error) |

**Returns:** `void`

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
<a id="rejectcommandpromise"></a>

### `<Protected>` rejectCommandPromise

▸ **rejectCommandPromise**(correlationId: *`string`*, error: *[EventstoreError](_src_errors_eventstoreerror_.eventstoreerror.md)*): `void`

*Defined in [src/eventstore/TCPConnection.ts:742](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L742)*

Will be called if a command send to eventstore was replied with an error In this case corresponding promise will be rejected and removed from queue

*__memberof__*: TCPConnection

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| correlationId | `string` |  \- |
| error | [EventstoreError](_src_errors_eventstoreerror_.eventstoreerror.md) |  \- |

**Returns:** `void`

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
<a id="resolvecommandpromise"></a>

### `<Protected>` resolveCommandPromise

▸ **resolveCommandPromise**<`T`>(correlationId: *`string`*, result?: *`null` \| `T`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:764](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L764)*

Will be called if a command send to eventstore was replied with success response In this case corresponding promise will be resolved with result received from eventstore

*__memberof__*: TCPConnection

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| correlationId | `string` | - |  \- |
| `Default value` result | `null` \| `T` |  null |

**Returns:** `void`

___
<a id="sendcommand"></a>

###  sendCommand

▸ **sendCommand**(correlationId: *`string`*, command: *[EventstoreCommand](../enums/_src_protobuf_eventstorecommand_.eventstorecommand.md)*, data?: *`Buffer` \| `null`*, credentials?: *`object` \| `null`*, promise?: *`object` \| `null`*): `void`

*Defined in [src/eventstore/TCPConnection.ts:168](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L168)*

Creates and sends raw data message to eventstore and adds given promise to pending queue

*__memberof__*: TCPConnection

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| correlationId | `string` | - |  \- |
| command | [EventstoreCommand](../enums/_src_protobuf_eventstorecommand_.eventstorecommand.md) | - |  \- |
| `Default value` data | `Buffer` \| `null` |  null |
| `Default value` credentials | `object` \| `null` |  null |
| `Default value` promise | `object` \| `null` |  null |

**Returns:** `void`

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

