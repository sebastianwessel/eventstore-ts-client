[eventstore-ts-client](../README.md) > ["src/subscription/index"](../modules/_src_subscription_index_.md) > [Subscription](../classes/_src_subscription_index_.subscription.md)

# Class: Subscription

## Hierarchy

 `EventEmitter`

**↳ Subscription**

## Index

### Constructors

* [constructor](_src_subscription_index_.subscription.md#constructor)

### Properties

* [defaultMaxListeners](_src_subscription_index_.subscription.md#defaultmaxlisteners)

### Methods

* [addListener](_src_subscription_index_.subscription.md#addlistener)
* [emit](_src_subscription_index_.subscription.md#emit)
* [eventNames](_src_subscription_index_.subscription.md#eventnames)
* [getMaxListeners](_src_subscription_index_.subscription.md#getmaxlisteners)
* [listenerCount](_src_subscription_index_.subscription.md#listenercount)
* [listeners](_src_subscription_index_.subscription.md#listeners)
* [off](_src_subscription_index_.subscription.md#off)
* [on](_src_subscription_index_.subscription.md#on)
* [once](_src_subscription_index_.subscription.md#once)
* [prependListener](_src_subscription_index_.subscription.md#prependlistener)
* [prependOnceListener](_src_subscription_index_.subscription.md#prependoncelistener)
* [rawListeners](_src_subscription_index_.subscription.md#rawlisteners)
* [removeAllListeners](_src_subscription_index_.subscription.md#removealllisteners)
* [removeListener](_src_subscription_index_.subscription.md#removelistener)
* [setMaxListeners](_src_subscription_index_.subscription.md#setmaxlisteners)
* [listenerCount](_src_subscription_index_.subscription.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Subscription**(subscriptionId: *`string`*): [Subscription](_src_subscription_index_.subscription.md)

*Defined in [src/subscription/index.ts:3](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/subscription/index.ts#L3)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| subscriptionId | `string` |

**Returns:** [Subscription](_src_subscription_index_.subscription.md)

___

## Properties

<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:8*

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

