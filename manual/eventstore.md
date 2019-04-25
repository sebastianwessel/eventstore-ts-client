# Eventstore

## connecting

Main connection parameters are set inside of connection uri  
This lib supports connecting to single instance via tcp and auto discovering to clusters also.  
Connections can be unsecured or encrypted

```javascript
// connection to single instance at local at port 1113 with username and password
const es = new Eventstore({
  uri: 'tcp://username:userpassword@127.0.0.1:1113'
})

await es.connect()
```

```javascript
// connection to cluster at domain escluster.net at port 2112 with username and password
const es = new Eventstore({
  uri: 'discover://username:password@escluster.net:2112'
})

await es.connect()

//...same with some additional properties like encryption and connect to master only
const es = new Eventstore({
  uri: 'discover://username:password@escluster.net:2112',
  requireMaster:true,
  useSSL: true,
  validateServer: true,
  secureContext: {
    ca: fs.readFileSync('./rootCA.crt'),
    key: fs.readFileSync('./domain.key'),
    cert: fs.readFileSync('./domain.crt')
  }
})

await es.connect()
```

## disconnecting

It's highly recommended to close a connection in save way.  
You should use `es.disconnect()` for proper shut down, because this function sets current connection to state `drain`.  
This means the connection does not accept outgoing requests any longer and waits if necessary for outstanding responses from eventstore.  
