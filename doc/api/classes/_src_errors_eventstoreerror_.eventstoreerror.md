[eventstore-ts-client](../README.md) > ["src/errors/EventstoreError"](../modules/_src_errors_eventstoreerror_.md) > [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

# Class: EventstoreError

Eventstore error base class

*__export__*: 

*__class__*: EventstoreError

*__extends__*: {Error}

## Hierarchy

 `Error`

**↳ EventstoreError**

## Index

### Constructors

* [constructor](_src_errors_eventstoreerror_.eventstoreerror.md#constructor)

### Properties

* [message](_src_errors_eventstoreerror_.eventstoreerror.md#message)
* [name](_src_errors_eventstoreerror_.eventstoreerror.md#name)
* [rootCause](_src_errors_eventstoreerror_.eventstoreerror.md#rootcause)
* [stack](_src_errors_eventstoreerror_.eventstoreerror.md#stack)
* [Error](_src_errors_eventstoreerror_.eventstoreerror.md#error)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new EventstoreError**(message: *`string`*, name?: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/EventstoreError.ts:9](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/EventstoreError.ts#L9)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` name | `string` | &quot;EventstoreError&quot; |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](_src_errors_eventstoreerror_.eventstoreerror.md)

___

## Properties

<a id="message"></a>

###  message

**● message**: *`string`*

*Inherited from Error.message*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:964*

___
<a id="name"></a>

###  name

**● name**: *`string`*

*Inherited from Error.name*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:963*

___
<a id="rootcause"></a>

###  rootCause

**● rootCause**: *`Error` \| `null`* =  null

*Defined in [src/errors/EventstoreError.ts:9](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/EventstoreError.ts#L9)*

___
<a id="stack"></a>

### `<Optional>` stack

**● stack**: *`undefined` \| `string`*

*Inherited from Error.stack*

*Overrides Error.stack*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:965*

___
<a id="error"></a>

### `<Static>` Error

**● Error**: *`ErrorConstructor`*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:974*

___

