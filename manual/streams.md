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

await eventstore
      .connect()
      .stream('streamId')
      .softDelete()
```

or if you know you will do some read operation:

```javascript
const eventstore = new Eventstore()

const metadata = await eventstore
      .connect()
      .fromStream('userstream')
      .getMetadata()
```

or if you do some write operation do it this way:

```javascript
const eventstore = new Eventstore()

const eventUsernameChanged = new Event('UsernameChanged')

await eventstore
      .connect()
      .atStream('userstream')
      .write(eventUsernameChanged)
```