[eventstore-ts-client](../README.md) > ["src/eventstore/uuidBufferConvert"](../modules/_src_eventstore_uuidbufferconvert_.md)

# External module: "src/eventstore/uuidBufferConvert"

## Index

### Functions

* [uuidFromBuffer](_src_eventstore_uuidbufferconvert_.md#uuidfrombuffer)
* [uuidToBuffer](_src_eventstore_uuidbufferconvert_.md#uuidtobuffer)

---

## Functions

<a id="uuidfrombuffer"></a>

###  uuidFromBuffer

▸ **uuidFromBuffer**(buffer: *`Buffer`*): `string`

*Defined in [src/eventstore/uuidBufferConvert.ts:12](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/uuidBufferConvert.ts#L12)*

Converts a uuid as string from buffer It returns an empty string for uuid set to null or throws {EventstoreProtocolError} for invalid buffer length

*__export__*: 

*__throws__*: {EventstoreProtocolError}

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| buffer | `Buffer` |  \- |

**Returns:** `string`

___
<a id="uuidtobuffer"></a>

###  uuidToBuffer

▸ **uuidToBuffer**(uuid: *`string` \| `null`*): `Buffer`

*Defined in [src/eventstore/uuidBufferConvert.ts:37](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/uuidBufferConvert.ts#L37)*

Converts a uuid string to buffer representattion throws {EventstoreProtocolError} for invalid input string length

*__export__*: 

*__throws__*: {EventstoreProtocolError}

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| uuid | `string` \| `null` |  \- |

**Returns:** `Buffer`

___

