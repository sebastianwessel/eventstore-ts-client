# Subscriptions

There are 3 different subscription types.  
Simple stream subscriptions, persistent subscriptions and catchUp subscriptions.

## Subscribe to stream

You can use `subscribe()` at stream instances and simply adding listener(s) to returned subscription.  
There are two options.

Listen to all events:

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

subscription = await eventstore
      .stream('streamId')
      .subscribe()

subscription.on('event', (event) => {
  console.log(event.name)
})

```

Listen for specific event:

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

subscription = await eventstore
      .stream('streamId')
      .subscribe()

// listen for "event-"+ lowercase event name
subscription.on('event-specificeventa', (event) => {
  console.log('log only SpecificEventA')
})

```

With this approach you're able to add different listeners for different needs to one single stream subscription.

## Persistent subscription

You can create persistent subscriptions (**needs admin rights**)

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const persistentSubscription = await eventstore
  .atStream('myStream')
  .withCredentials({username: 'admin', password: 'changeit'})
  .createPersistentSubscription('persistentsubscription')
```

You can update an existing persistent subscription (**needs admin rights**)

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const newConfig = {
    messageTimeoutMilliseconds : 30000
  }

const persistentSubscription = await eventstore
  .atStream('myStream')
  .withCredentials({username: 'admin', password: 'changeit'})
  .getPersistentSubscription('persistentsubscription')
  .update(newConfig)
```

You can delete an existing persistent subscription (**needs admin rights**)

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const newConfig = {
    messageTimeoutMilliseconds : 30000
  }

const persistentSubscription = eventstore
  .atStream('myStream')
  .withCredentials({username: 'admin', password: 'changeit'})
  .getPersistentSubscription('persistentsubscription')
  
await persistentSubscription.delete()
```

You can connect to an existing persistent subscription

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const newConfig = {
    messageTimeoutMilliseconds : 30000
  }

const persistentSubscription = eventstore
  .atStream('myStream')
  .getPersistentSubscription('persistentsubscription')
  
await persistentSubscription.subscribe()
```

Unsubscribing an existing persistent subscription is also pretty easy

```javascript
await persistentSubscription.unsubscribe()
```

## CatchUp subscriptions

/** TODO **/  
not implemented yet

## Emitted events

- `subscribed` emitted after subscription is established
- `dropped` emitted when subscription is dropped
- `event` emitted when event appeared (param: Event)
- `event-eventnametolowercase` emitted when event appeared (param: Event)
- `error` emitted in error case (param: Error)