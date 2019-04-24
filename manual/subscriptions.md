# Subscriptions

There are 3 different subscription types.  
Simple stream subscriptions, persitent subscriptions and catchUp subscriptions.

## subscribe to stream

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

// listen for "event-"+ lowercase eventname
subscription.on('event-specificeventa', (event) => {
  console.log('log only SpecificEventA')
})

```

With this approach you're able to add different listeners for different needs to one single stream subscription.

## persitent subscription

You can create persitent subscriptions (**needs admin rights**)

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const persitentSubscription = await eventstore
  .atStream('myStream')
  .withCredentials({username: 'admin', password: 'changeit'})
  .createPersistentSubscription('persitentsubscription')
```

You can update an existing persitent subscription (**needs admin rights**)

/** TODO documentation **/

You can delete an existing persitent subscription (**needs admin rights**)

/** TODO **/

You can connect to an existing persitent subscription

/** TODO documentation**/

## catchUp subscriptions

/** TODO **/  
not implemented yet