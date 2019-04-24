# Streams

## accessing steams

You can use different methods to get an stream instance:

- `stream('streamId')`
- `fromStream('streamId')`
- `atStream('streamId')`

Technicaly they do same, but with these different named function calls you can improve readablility of your code.
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

## writing to streams

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
  countm : 2
})

eventB.correlationId = eventA.id
await eventstore.atStream('mystream').append(eventB)

const eventC = new Event('EventC')
const eventD = new Event('EventD')

await eventstore.atStream('mystream').append([eventC, eventD])
```

## reading from stream

It's recommended to use an async iteratot to fetch events from streams.  

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

You can use handy functions of async iterator returnded by `.walkStreamForward()` and `.walkStreamBackward()`.  
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