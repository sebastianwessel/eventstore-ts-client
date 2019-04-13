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
      .write(eventUsernameChanged)
```