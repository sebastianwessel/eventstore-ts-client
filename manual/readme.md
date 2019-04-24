# General

This library tries to help you to communicate with eventstore in a smooth way.

There are a couple of things like error handling or function naming which should help you to write nice and speaking code.

It follows async/await style to avoid "callback hell" as well.

## speaking code

Instead of having some base function with lots of parameters this lib provides some nice syntax and alias functions.  
Instead of writing:

```javascript
var esConnection = esClient.createConnection(connSettings, "tcp://localhost:1113");
esConnection.connect();

var eventId = uuid.v4();
var eventData = {
  a : Math.random(),
  b : uuid.v4()
};
var event = esClient.createJsonEventData(eventId, eventData, null, 'TestWasDone');

esConnection.appendToStream('streamName', esClient.expectedVersion.any, event,someDifferentCredentials)
  .then(function(result) {
      console.log("Stored event:", eventId);
  })
```

you should write something like:

```javascript
const eventstore = new Eventstore('tcp://localhost:1113')
await eventstore.connect()

const eventTestWasDone = new Event('TestWasDone',{
  a : Math.random(),
  b : uuid.v4()
})

await eventstore
  .atStream('streamName')
  .withCredentials(someDifferentCredentials)
  .requiresMaster()
  .append(eventTestWasDone)

 console.log("Stored event:", eventTestWasDone.id)
```

As you can see your code becomes a lot more self speaking and also someone who isn't familiar with your program or even unfamiliar with javascript/typescript is able to understand what these lines of code are doing.

Of course you're able to use function parameters as well if you prefere it, but it's not recommended

## Error handling

This client lib also uses named errors - so no need to parse error messages.  
Just use `error.name` to identify different errors.  
Also the error instance may contain an additional field `causedBy` which will hold some error object if there was an error before which causes the current error.