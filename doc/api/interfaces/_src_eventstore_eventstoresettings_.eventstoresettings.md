[eventstore-ts-client](../README.md) > ["src/eventstore/EventstoreSettings"](../modules/_src_eventstore_eventstoresettings_.md) > [EventstoreSettings](../interfaces/_src_eventstore_eventstoresettings_.eventstoresettings.md)

# Interface: EventstoreSettings

## Hierarchy

**EventstoreSettings**

## Index

### Properties

* [clientId](_src_eventstore_eventstoresettings_.eventstoresettings.md#clientid)
* [clusterDns](_src_eventstore_eventstoresettings_.eventstoresettings.md#clusterdns)
* [credentials](_src_eventstore_eventstoresettings_.eventstoresettings.md#credentials)
* [externalGossipPort](_src_eventstore_eventstoresettings_.eventstoresettings.md#externalgossipport)
* [gossipSeeds](_src_eventstore_eventstoresettings_.eventstoresettings.md#gossipseeds)
* [gossipTimeout](_src_eventstore_eventstoresettings_.eventstoresettings.md#gossiptimeout)
* [heartbeatInterval](_src_eventstore_eventstoresettings_.eventstoresettings.md#heartbeatinterval)
* [heartbeatTimeout](_src_eventstore_eventstoresettings_.eventstoresettings.md#heartbeattimeout)
* [host](_src_eventstore_eventstoresettings_.eventstoresettings.md#host)
* [logger](_src_eventstore_eventstoresettings_.eventstoresettings.md#logger)
* [maxConcurrentItems](_src_eventstore_eventstoresettings_.eventstoresettings.md#maxconcurrentitems)
* [maxDiscoverAttempts](_src_eventstore_eventstoresettings_.eventstoresettings.md#maxdiscoverattempts)
* [maxQueueSize](_src_eventstore_eventstoresettings_.eventstoresettings.md#maxqueuesize)
* [maxReconnections](_src_eventstore_eventstoresettings_.eventstoresettings.md#maxreconnections)
* [maxRetries](_src_eventstore_eventstoresettings_.eventstoresettings.md#maxretries)
* [operationTimeout](_src_eventstore_eventstoresettings_.eventstoresettings.md#operationtimeout)
* [operationTimeoutCheckPeriod](_src_eventstore_eventstoresettings_.eventstoresettings.md#operationtimeoutcheckperiod)
* [port](_src_eventstore_eventstoresettings_.eventstoresettings.md#port)
* [reconnectionDelay](_src_eventstore_eventstoresettings_.eventstoresettings.md#reconnectiondelay)
* [requireMaster](_src_eventstore_eventstoresettings_.eventstoresettings.md#requiremaster)
* [useSSL](_src_eventstore_eventstoresettings_.eventstoresettings.md#usessl)
* [validateServer](_src_eventstore_eventstoresettings_.eventstoresettings.md#validateserver)

---

## Properties

<a id="clientid"></a>

###  clientId

**● clientId**: *`string`*

*Defined in [src/eventstore/EventstoreSettings.ts:30](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L30)*

___
<a id="clusterdns"></a>

###  clusterDns

**● clusterDns**: *`string`*

*Defined in [src/eventstore/EventstoreSettings.ts:24](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L24)*

___
<a id="credentials"></a>

###  credentials

**● credentials**: *`object`*

*Defined in [src/eventstore/EventstoreSettings.ts:8](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L8)*

#### Type declaration

 password: `string`

 username: `string`

___
<a id="externalgossipport"></a>

###  externalGossipPort

**● externalGossipPort**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:26](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L26)*

___
<a id="gossipseeds"></a>

###  gossipSeeds

**● gossipSeeds**: *`string`[]*

*Defined in [src/eventstore/EventstoreSettings.ts:28](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L28)*

___
<a id="gossiptimeout"></a>

###  gossipTimeout

**● gossipTimeout**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:27](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L27)*

___
<a id="heartbeatinterval"></a>

###  heartbeatInterval

**● heartbeatInterval**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:22](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L22)*

___
<a id="heartbeattimeout"></a>

###  heartbeatTimeout

**● heartbeatTimeout**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:23](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L23)*

___
<a id="host"></a>

###  host

**● host**: *`string`*

*Defined in [src/eventstore/EventstoreSettings.ts:6](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L6)*

___
<a id="logger"></a>

###  logger

**● logger**: *`bunyan`*

*Defined in [src/eventstore/EventstoreSettings.ts:13](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L13)*

___
<a id="maxconcurrentitems"></a>

###  maxConcurrentItems

**● maxConcurrentItems**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:16](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L16)*

___
<a id="maxdiscoverattempts"></a>

###  maxDiscoverAttempts

**● maxDiscoverAttempts**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:25](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L25)*

___
<a id="maxqueuesize"></a>

###  maxQueueSize

**● maxQueueSize**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:15](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L15)*

___
<a id="maxreconnections"></a>

###  maxReconnections

**● maxReconnections**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:18](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L18)*

___
<a id="maxretries"></a>

###  maxRetries

**● maxRetries**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:17](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L17)*

___
<a id="operationtimeout"></a>

###  operationTimeout

**● operationTimeout**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:20](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L20)*

___
<a id="operationtimeoutcheckperiod"></a>

###  operationTimeoutCheckPeriod

**● operationTimeoutCheckPeriod**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:21](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L21)*

___
<a id="port"></a>

###  port

**● port**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:7](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L7)*

___
<a id="reconnectiondelay"></a>

###  reconnectionDelay

**● reconnectionDelay**: *`number`*

*Defined in [src/eventstore/EventstoreSettings.ts:19](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L19)*

___
<a id="requiremaster"></a>

###  requireMaster

**● requireMaster**: *`boolean`*

*Defined in [src/eventstore/EventstoreSettings.ts:12](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L12)*

___
<a id="usessl"></a>

###  useSSL

**● useSSL**: *`boolean`*

*Defined in [src/eventstore/EventstoreSettings.ts:5](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L5)*

___
<a id="validateserver"></a>

###  validateServer

**● validateServer**: *`boolean`*

*Defined in [src/eventstore/EventstoreSettings.ts:29](https://github.com/sebastianwessel/eventstore-ts-client/blob/b09933f/src/eventstore/EventstoreSettings.ts#L29)*

___

