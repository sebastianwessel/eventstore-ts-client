# Events

Events are holding your stored information and business data.  
A single event is written to a stream and contains a name, a uuid, a creation timestamp and maybe metadata and data.

If you get events during read operations as result be aware that these events are **immutable** or if you write an event to a stream this event will also **become immutable**. Reason for this is quite simple: You can't change the past.  
If you try to change already written events will result in throwing `EventstoreOperationError`.

## Creating event

You can create a event like this:

```javascript
const newEvent = new Event('MyEventName')

newEvent.data = {some:'data'}
newEvent.metadata = {some:'metadata'}

// SAME AS

const newEvent = new Event('MyEventName',{some:'data'},{some:'metadata'})

```

## Correlation id

In real world events are often created because of a previously appeared event.  
For example because of event `SomeRequest` appeared you will have an event `ResponseForRequestSend`.  
For not loosing this logical connection between events you can use `$correlationID` field in events metadata.

As starting with eventstore version 5 you will have some new system projection using this special field.  

You can use handy functions for setting a correlation id on new events:

```javascript
const someRequestEvent = new Event('SomeRequest')
someRequestEvent.correlationId = someRequestEvent.id


await eventstore
      .atStream('somestream')
      .append(someRequestEvent)

const someResponseEvent = new Event('ResponseForRequestSend',null,{$correlationId: someRequestEvent.correlationId})

await eventstore
      .atStream('somestream')
      .append(someResponseEvent)


// OR IN NICE WAY

const someRequestEvent = new Event('SomeRequest')
someRequestEvent.correlationId = someRequestEvent.id


await eventstore
      .atStream('somestream')
      .append(someRequestEvent)

const someResponseEvent = someRequestEvent.causesEvent('ResponseForRequestSend')

await eventstore
      .atStream('somestream')
      .append(someResponseEvent)


// AND READING (eventstore version >= 5 & system projections enabled):

const events = await eventstore.walkEventsByCorrelationId(someRequestEvent.id)

for await (const event of events) {
  console.log(event.name)
}

//outputs
//SomeRequest
//ResponseForRequestSend
```
