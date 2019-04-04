[eventstore-ts-client](../README.md) > ["src/eventstore/TCPConnection"](../modules/_src_eventstore_tcpconnection_.md)

# External module: "src/eventstore/TCPConnection"

## Index

### Enumerations

* [connectionState](../enums/_src_eventstore_tcpconnection_.connectionstate.md)

### Classes

* [TCPConnection](../classes/_src_eventstore_tcpconnection_.tcpconnection.md)

### Variables

* [COMMAND_OFFSET](_src_eventstore_tcpconnection_.md#command_offset)
* [CORRELATION_ID_OFFSET](_src_eventstore_tcpconnection_.md#correlation_id_offset)
* [DATA_OFFSET](_src_eventstore_tcpconnection_.md#data_offset)
* [FLAGS_AUTH](_src_eventstore_tcpconnection_.md#flags_auth)
* [FLAGS_NONE](_src_eventstore_tcpconnection_.md#flags_none)
* [FLAGS_OFFSET](_src_eventstore_tcpconnection_.md#flags_offset)
* [GUID_LENGTH](_src_eventstore_tcpconnection_.md#guid_length)
* [HEADER_LENGTH](_src_eventstore_tcpconnection_.md#header_length)
* [UINT32_LENGTH](_src_eventstore_tcpconnection_.md#uint32_length)
* [protobuf](_src_eventstore_tcpconnection_.md#protobuf)

---

## Variables

<a id="command_offset"></a>

### `<Const>` COMMAND_OFFSET

**● COMMAND_OFFSET**: *`4`* =  UINT32_LENGTH

*Defined in [src/eventstore/TCPConnection.ts:29](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L29)*

___
<a id="correlation_id_offset"></a>

### `<Const>` CORRELATION_ID_OFFSET

**● CORRELATION_ID_OFFSET**: *`number`* =  FLAGS_OFFSET + 1

*Defined in [src/eventstore/TCPConnection.ts:31](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L31)*

___
<a id="data_offset"></a>

### `<Const>` DATA_OFFSET

**● DATA_OFFSET**: *`number`* =  CORRELATION_ID_OFFSET + GUID_LENGTH

*Defined in [src/eventstore/TCPConnection.ts:32](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L32)*

___
<a id="flags_auth"></a>

### `<Const>` FLAGS_AUTH

**● FLAGS_AUTH**: *`1`* = 1

*Defined in [src/eventstore/TCPConnection.ts:23](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L23)*

___
<a id="flags_none"></a>

### `<Const>` FLAGS_NONE

**● FLAGS_NONE**: *`0`* = 0

*Defined in [src/eventstore/TCPConnection.ts:22](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L22)*

___
<a id="flags_offset"></a>

### `<Const>` FLAGS_OFFSET

**● FLAGS_OFFSET**: *`number`* =  COMMAND_OFFSET + 1

*Defined in [src/eventstore/TCPConnection.ts:30](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L30)*

___
<a id="guid_length"></a>

### `<Const>` GUID_LENGTH

**● GUID_LENGTH**: *`16`* = 16

*Defined in [src/eventstore/TCPConnection.ts:26](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L26)*

___
<a id="header_length"></a>

### `<Const>` HEADER_LENGTH

**● HEADER_LENGTH**: *`number`* =  1 + 1 + GUID_LENGTH

*Defined in [src/eventstore/TCPConnection.ts:27](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L27)*

___
<a id="uint32_length"></a>

### `<Const>` UINT32_LENGTH

**● UINT32_LENGTH**: *`4`* = 4

*Defined in [src/eventstore/TCPConnection.ts:25](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L25)*

___
<a id="protobuf"></a>

### `<Const>` protobuf

**● protobuf**: *`proto`* =  model.eventstore.proto

*Defined in [src/eventstore/TCPConnection.ts:13](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/TCPConnection.ts#L13)*

___

