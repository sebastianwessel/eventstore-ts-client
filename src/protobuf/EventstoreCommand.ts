/** List of possible eventstore command/response flags */
export enum EventstoreCommand {
  HeartbeatRequestCommand = 0x01,
  HeartbeatResponseCommand = 0x02,

  Ping = 0x03,
  Pong = 0x04,

  PrepareAck = 0x05,
  CommitAck = 0x06,

  SlaveAssignment = 0x07,
  CloneAssignment = 0x08,

  SubscribeReplica = 0x10,
  ReplicaLogPositionAck = 0x11,
  CreateChunk = 0x12,
  RawChunkBulk = 0x13,
  DataChunkBulk = 0x14,
  ReplicaSubscriptionRetry = 0x15,
  ReplicaSubscribed = 0x16,

  WriteEvents = 0x82,
  WriteEventsCompleted = 0x83,

  TransactionStart = 0x84,
  TransactionStartCompleted = 0x85,
  TransactionWrite = 0x86,
  TransactionWriteCompleted = 0x87,
  TransactionCommit = 0x88,
  TransactionCommitCompleted = 0x89,

  DeleteStream = 0x8a,
  DeleteStreamCompleted = 0x8b,

  ReadEvent = 0xb0,
  ReadEventCompleted = 0xb1,
  ReadStreamEventsForward = 0xb2,
  ReadStreamEventsForwardCompleted = 0xb3,
  ReadStreamEventsBackward = 0xb4,
  ReadStreamEventsBackwardCompleted = 0xb5,
  ReadAllEventsForward = 0xb6,
  ReadAllEventsForwardCompleted = 0xb7,
  ReadAllEventsBackward = 0xb8,
  ReadAllEventsBackwardCompleted = 0xb9,

  SubscribeToStream = 0xc0,
  SubscriptionConfirmation = 0xc1,
  StreamEventAppeared = 0xc2,
  UnsubscribeFromStream = 0xc3,
  SubscriptionDropped = 0xc4,
  ConnectToPersistentSubscription = 0xc5,
  PersistentSubscriptionConfirmation = 0xc6,
  PersistentSubscriptionStreamEventAppeared = 0xc7,
  CreatePersistentSubscription = 0xc8,
  CreatePersistentSubscriptionCompleted = 0xc9,
  DeletePersistentSubscription = 0xca,
  DeletePersistentSubscriptionCompleted = 0xcb,
  PersistentSubscriptionAckEvents = 0xcc,
  PersistentSubscriptionNakEvents = 0xcd,
  UpdatePersistentSubscription = 0xce,
  UpdatePersistentSubscriptionCompleted = 0xcf,

  ScavengeDatabase = 0xd0,
  ScavengeDatabaseCompleted = 0xd1,

  BadRequest = 0xf0,
  NotHandled = 0xf1,
  Authenticate = 0xf2,
  Authenticated = 0xf3,
  NotAuthenticated = 0xf4,
  IdentifyClient = 0xf5,
  ClientIdentified = 0xf6
}
