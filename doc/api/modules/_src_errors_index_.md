[eventstore-ts-client](../README.md) > ["src/errors/index"](../modules/_src_errors_index_.md)

# External module: "src/errors/index"

## Index

### Functions

* [newAccessDeniedError](_src_errors_index_.md#newaccessdeniederror)
* [newBadRequestError](_src_errors_index_.md#newbadrequesterror)
* [newCommitTimeoutError](_src_errors_index_.md#newcommittimeouterror)
* [newConnectionError](_src_errors_index_.md#newconnectionerror)
* [newDoesNotExistError](_src_errors_index_.md#newdoesnotexisterror)
* [newForwardTimeoutError](_src_errors_index_.md#newforwardtimeouterror)
* [newInvalidTransactionError](_src_errors_index_.md#newinvalidtransactionerror)
* [newNoStreamError](_src_errors_index_.md#newnostreamerror)
* [newNotAuthenticatedError](_src_errors_index_.md#newnotauthenticatederror)
* [newNotFoundError](_src_errors_index_.md#newnotfounderror)
* [newNotHandledError](_src_errors_index_.md#newnothandlederror)
* [newNotModifiedError](_src_errors_index_.md#newnotmodifiederror)
* [newPrepareTimeoutError](_src_errors_index_.md#newpreparetimeouterror)
* [newProtocolError](_src_errors_index_.md#newprotocolerror)
* [newStreamDeletedError](_src_errors_index_.md#newstreamdeletederror)
* [newUnspecificError](_src_errors_index_.md#newunspecificerror)
* [newWrongExpectedVersionError](_src_errors_index_.md#newwrongexpectedversionerror)

---

## Functions

<a id="newaccessdeniederror"></a>

###  newAccessDeniedError

▸ **newAccessDeniedError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:75](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L75)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newbadrequesterror"></a>

###  newBadRequestError

▸ **newBadRequestError**(message?: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:11](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L11)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` message | `string` | &quot;Bad Request&quot; |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newcommittimeouterror"></a>

###  newCommitTimeoutError

▸ **newCommitTimeoutError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:37](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L37)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newconnectionerror"></a>

###  newConnectionError

▸ **newConnectionError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:3](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L3)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newdoesnotexisterror"></a>

###  newDoesNotExistError

▸ **newDoesNotExistError**(message?: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:99](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L99)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` message | `string` | &quot;&quot; |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newforwardtimeouterror"></a>

###  newForwardTimeoutError

▸ **newForwardTimeoutError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:41](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L41)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newinvalidtransactionerror"></a>

###  newInvalidTransactionError

▸ **newInvalidTransactionError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:64](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L64)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newnostreamerror"></a>

###  newNoStreamError

▸ **newNoStreamError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:83](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L83)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newnotauthenticatederror"></a>

###  newNotAuthenticatedError

▸ **newNotAuthenticatedError**(message?: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:18](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L18)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` message | `string` | &quot;Not Authenticated&quot; |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newnotfounderror"></a>

###  newNotFoundError

▸ **newNotFoundError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:79](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L79)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newnothandlederror"></a>

###  newNotHandledError

▸ **newNotHandledError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:25](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L25)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newnotmodifiederror"></a>

###  newNotModifiedError

▸ **newNotModifiedError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:87](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L87)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newpreparetimeouterror"></a>

###  newPrepareTimeoutError

▸ **newPrepareTimeoutError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:29](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L29)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newprotocolerror"></a>

###  newProtocolError

▸ **newProtocolError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:7](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L7)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newstreamdeletederror"></a>

###  newStreamDeletedError

▸ **newStreamDeletedError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:60](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L60)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newunspecificerror"></a>

###  newUnspecificError

▸ **newUnspecificError**(message?: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:91](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L91)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` message | `string` | &quot;&quot; |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___
<a id="newwrongexpectedversionerror"></a>

###  newWrongExpectedVersionError

▸ **newWrongExpectedVersionError**(message: *`string`*, rootCause?: *`Error` \| `null`*): [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

*Defined in [src/errors/index.ts:49](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/errors/index.ts#L49)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` rootCause | `Error` \| `null` |  null |

**Returns:** [EventstoreError](../classes/_src_errors_eventstoreerror_.eventstoreerror.md)

___

