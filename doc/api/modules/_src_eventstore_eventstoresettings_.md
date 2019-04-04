[eventstore-ts-client](../README.md) > ["src/eventstore/EventstoreSettings"](../modules/_src_eventstore_eventstoresettings_.md)

# External module: "src/eventstore/EventstoreSettings"

## Index

### Interfaces

* [EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md)

### Functions

* [setConnectionSettings](_src_eventstore_eventstoresettings_.md#setconnectionsettings)

### Object literals

* [defaultConnectionSettings](_src_eventstore_eventstoresettings_.md#defaultconnectionsettings)

---

## Functions

<a id="setconnectionsettings"></a>

### `<Let>` setConnectionSettings

▸ **setConnectionSettings**(customSettings: *`object` \| [EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md)*): [EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md)

*Defined in [src/eventstore/EventstoreSettings.ts:64](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| customSettings | `object` \| [EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md) |

**Returns:** [EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md)

___

## Object literals

<a id="defaultconnectionsettings"></a>

### `<Const>` defaultConnectionSettings

**defaultConnectionSettings**: *`object`*

*Defined in [src/eventstore/EventstoreSettings.ts:33](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L33)*

<a id="defaultconnectionsettings.clientid"></a>

####  clientId

**● clientId**: *`string`* =  `ts-client-${uuid()}`

*Defined in [src/eventstore/EventstoreSettings.ts:61](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L61)*

___
<a id="defaultconnectionsettings.clusterdns"></a>

####  clusterDns

**● clusterDns**: *`string`* = ""

*Defined in [src/eventstore/EventstoreSettings.ts:56](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L56)*

___
<a id="defaultconnectionsettings.externalgossipport"></a>

####  externalGossipPort

**● externalGossipPort**: *`number`* = 0

*Defined in [src/eventstore/EventstoreSettings.ts:58](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L58)*

___
<a id="defaultconnectionsettings.gossipseeds"></a>

####  gossipSeeds

**● gossipSeeds**: *`never`[]* =  []

*Defined in [src/eventstore/EventstoreSettings.ts:60](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L60)*

___
<a id="defaultconnectionsettings.gossiptimeout"></a>

####  gossipTimeout

**● gossipTimeout**: *`number`* = 1000

*Defined in [src/eventstore/EventstoreSettings.ts:59](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L59)*

___
<a id="defaultconnectionsettings.heartbeatinterval"></a>

####  heartbeatInterval

**● heartbeatInterval**: *`number`* = 750

*Defined in [src/eventstore/EventstoreSettings.ts:54](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L54)*

___
<a id="defaultconnectionsettings.heartbeattimeout"></a>

####  heartbeatTimeout

**● heartbeatTimeout**: *`number`* = 1500

*Defined in [src/eventstore/EventstoreSettings.ts:55](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L55)*

___
<a id="defaultconnectionsettings.host"></a>

####  host

**● host**: *`string`* = "127.0.0.1"

*Defined in [src/eventstore/EventstoreSettings.ts:38](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L38)*

___
<a id="defaultconnectionsettings.logger"></a>

####  logger

**● logger**: *`Logger`* =  bunyan.createLogger({
    name: 'eventstore-ts-client'
  })

*Defined in [src/eventstore/EventstoreSettings.ts:41](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L41)*

___
<a id="defaultconnectionsettings.maxconcurrentitems"></a>

####  maxConcurrentItems

**● maxConcurrentItems**: *`number`* = 5000

*Defined in [src/eventstore/EventstoreSettings.ts:47](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L47)*

___
<a id="defaultconnectionsettings.maxdiscoverattempts"></a>

####  maxDiscoverAttempts

**● maxDiscoverAttempts**: *`number`* = 10

*Defined in [src/eventstore/EventstoreSettings.ts:57](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L57)*

___
<a id="defaultconnectionsettings.maxqueuesize"></a>

####  maxQueueSize

**● maxQueueSize**: *`number`* = 5000

*Defined in [src/eventstore/EventstoreSettings.ts:46](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L46)*

___
<a id="defaultconnectionsettings.maxreconnections"></a>

####  maxReconnections

**● maxReconnections**: *`number`* = 10

*Defined in [src/eventstore/EventstoreSettings.ts:49](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L49)*

___
<a id="defaultconnectionsettings.maxretries"></a>

####  maxRetries

**● maxRetries**: *`number`* = 10

*Defined in [src/eventstore/EventstoreSettings.ts:48](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L48)*

___
<a id="defaultconnectionsettings.operationtimeout"></a>

####  operationTimeout

**● operationTimeout**: *`number`* =  7 * 1000

*Defined in [src/eventstore/EventstoreSettings.ts:51](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L51)*

___
<a id="defaultconnectionsettings.operationtimeoutcheckperiod"></a>

####  operationTimeoutCheckPeriod

**● operationTimeoutCheckPeriod**: *`number`* = 1000

*Defined in [src/eventstore/EventstoreSettings.ts:52](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L52)*

___
<a id="defaultconnectionsettings.port"></a>

####  port

**● port**: *`number`* = 1113

*Defined in [src/eventstore/EventstoreSettings.ts:39](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L39)*

___
<a id="defaultconnectionsettings.reconnectiondelay"></a>

####  reconnectionDelay

**● reconnectionDelay**: *`number`* = 100

*Defined in [src/eventstore/EventstoreSettings.ts:50](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L50)*

___
<a id="defaultconnectionsettings.requiremaster"></a>

####  requireMaster

**● requireMaster**: *`true`* = true

*Defined in [src/eventstore/EventstoreSettings.ts:44](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L44)*

___
<a id="defaultconnectionsettings.usessl"></a>

####  useSSL

**● useSSL**: *`false`* = false

*Defined in [src/eventstore/EventstoreSettings.ts:40](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L40)*

___
<a id="defaultconnectionsettings.validateserver"></a>

####  validateServer

**● validateServer**: *`false`* = false

*Defined in [src/eventstore/EventstoreSettings.ts:53](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L53)*

___
<a id="defaultconnectionsettings.credentials"></a>

####  credentials

**credentials**: *`object`*

*Defined in [src/eventstore/EventstoreSettings.ts:34](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L34)*

<a id="defaultconnectionsettings.credentials.password"></a>

####  password

**● password**: *`string`* = "changeit"

*Defined in [src/eventstore/EventstoreSettings.ts:35](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L35)*

___
<a id="defaultconnectionsettings.credentials.username"></a>

####  username

**● username**: *`string`* = "admin"

*Defined in [src/eventstore/EventstoreSettings.ts:36](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L36)*

___

___

___

