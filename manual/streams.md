# Streams

## Accessing steams

You can use different methods to get an stream instance:

- `stream('streamId')`
- `fromStream('streamId')`
- `atStream('streamId')`

Technically they do same, but with these different named function calls you can improve readability of your code.
You can use it like:

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

await eventstore
      .stream('streamId')
      .softDelete()
```

or if you know you will do some read operation:

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const metadata = await eventstore
      .fromStream('userstream')
      .getMetadata()
```

or if you do some write operation do it this way:

```javascript
const eventstore = new Eventstore()

const eventUsernameChanged = new Event('UsernameChanged')
await eventstore.connect()

await eventstore
      .atStream('userstream')
      .append(eventUsernameChanged)
```

## Writing to streams

Writing to streams is simple by using `.append()` function at a stream instance.

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const eventA = new Event('EventA',{
  some: 'string data',
  num : 1
})
await eventstore.atStream('mystream').append(eventA)

const eventB = new Event('EventB',{
  text: 'other string',
  count : 2
})

eventB.correlationId = eventA.id
await eventstore.atStream('mystream').append(eventB)

const eventC = new Event('EventC')
const eventD = new Event('EventD')

await eventstore.atStream('mystream').append([eventC, eventD])
```

## Reading from stream

It's recommended to use an async iterator to fetch events from streams.  

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const events = await eventstore
      .stream('streamId')
      .walkStreamForward()

for await (const event of events) {
  console.log(event.name)
}
```

You can use handy functions of async iterator returned by `.walkStreamForward()` and `.walkStreamBackward()`.  
They are similar to array functions:

- `map()`
- `filter()`
- `forEach()`
- `reduce()`
- `toArray()`
- `every()`

```javascript
const walker = await eventstore
  .stream('streamId')
  .walkStreamForward()

const result = await walker
  .filter((event) => event.name != 'EventB')
  .map((event) => {
    return event.name
  })
  .toArray()

console.log(result)
```

## Reading all events

It's possible to read all events from eventstore.  
It uses same behavior as regular async iterator for streams but it **needs admin rights**.

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const events = await eventstore.walkAllForward()

for await (const event of events) {
  console.log(event.name)
}
```

or it reverse from end to beginning

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const events = await eventstore.walkAllBackward()

for await (const event of events) {
  console.log(event.name)
}
```

## System projections

Eventstore comes with some handy projections which are available if you have enabled system projections in your server config and your current user acl is not disallowing access to them.

You can use some functions to access these streams:

- walkEventsByStreamCategory
- walkEventsByType
- walkEventsByCorrelationId
- streamNamesByCategory

```javascript
const eventstore = new Eventstore()
await eventstore.connect()

const events = await eventstore.walkEventsByType('sometype')

for await (const event of events) {
  console.log(event.name)
}
```
