# Eventstore typescript / ES6 javascript client lib

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.com/sebastianwessel/eventstore-ts-client.svg?branch=master)](https://travis-ci.com/sebastianwessel/eventstore-ts-client)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=coverage)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=ncloc)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=security_rating)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![doc coverage](https://sebastianwessel.github.io/eventstore-ts-client/badge.svg)](https://sebastianwessel.github.io/eventstore-ts-client)

Eventstore javascript client library written in typescript.

This repo is **under heavy development and not ready for use**

Main focus on this lib are:

- available for typescript
- available for ES6 with async/await syntax
- well documented
- clean code
- proper code readability
- proper testing
- nice error handling

## Documentation

Full documentation is available at **[https://sebastianwessel.github.io/eventstore-ts-client/](https://sebastianwessel.github.io/eventstore-ts-client/)**

## Requirements

You will need to have node.js version >=10 installed to use this lib because it's based on async iterators.  
It's tested against eventstore version 5, but should also work on lower versions in general.  
Expect some shortcut function for accessing standard projections which are not part of lower eventstore versions.

## Installation

Installation is as simple as most packages.  
Just install package in your projects root with:

```bash
npm i --save eventstore-ts-client
```

## Quick-Start

```javascript
const {Eventstore, Event} = require('eventstore-ts-client)
const es = new Eventstore({
  uri: 'tcp://admin:changeit@127.0.0.1:1113'
})
await es.connect()


const eventA = new Event('EventA',{
  some: 'string data',
  num : 1
})
await es.atStream('mystream').append(eventA)

const eventB = new Event('EventB',{
  text: 'other string',
  countm : 2
})

eventB.correlationId = eventA.id
await es.atStream('mystream').append(eventB)

const eventC = new Event('EventC')
const eventD = new Event('EventD')

await es.atStream('mystream').append([eventC, eventD])

const events = await es
      .stream('mystream')
      .walkStreamForward()

for await (const event of events) {
  console.log(event.name)
}

await es.close()
```

## Building

To build this lib just clone this repo and run:

```bash
npm install
npm run build
```

*Maybe you need to change file attributes of scripts inside of `scripts/` folder to be executable*

## Test lib

eventstore-ts-client tests are heavily based on integration tests.

Test are running against a 3 node eventstore cluster which will configured and filled with some test data and settings.  
You will need to have docker installed on your machine to be able to run tests.  
The setup contains a script which does all stuff for you - just type:

```bash
npm run test
```

Running tests will also generate some code coverage report to be used in tools like sonarqube

## Apache 2.0 License

see [LICENSE](LICENSE)