# Eventstore typescript / ES6 javascript client lib

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.org/sebastianwessel/eventstore-ts-client.svg?branch=master)](https://travis-ci.org/sebastianwessel/eventstore-ts-client)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![codecov](https://codecov.io/gh/sebastianwessel/eventstore-ts-client/branch/master/graph/badge.svg)](https://codecov.io/gh/sebastianwessel/eventstore-ts-client)
[![doc coverage](./docs/api/badge.svg)](./docs/api/index.html)

Eventstore javascript client library written in typescript.

This repo is **under havy development and not ready for use**

Main focus on this lib are:

- available for typescript
- highly documented
- clean code
- propper testing

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

## Building

To build this lib just run:

```bash
npm run build
```

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