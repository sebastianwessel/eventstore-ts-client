# Testing

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=coverage)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![codecov](https://codecov.io/gh/sebastianwessel/eventstore-ts-client/branch/master/graph/badge.svg)](https://codecov.io/gh/sebastianwessel/eventstore-ts-client)
[![doc coverage](https://sebastianwessel.github.io/eventstore-ts-client/badge.svg)](https://sebastianwessel.github.io/eventstore-ts-client)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=ncloc)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=bugs)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=code_smells)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=security_rating)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=sebastianwessel_eventstore-ts-client&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)

Tests are implemented as integration tests against a real eventstore cluster.  
You can find code coverage analysis at **[sonarcloud.com](https://sonarcloud.io/dashboard?id=sebastianwessel_eventstore-ts-client)** and at **[codecov.io](https://codecov.io/gh/sebastianwessel/eventstore-ts-client)**

## Requirements

- node > 10
- linux or mac for running bash scripts
- installed Docker

## Running tests

- install all dependencies `npm install`
- run tests `npm run test`

## Test suite

The whole tests are configured and started by `scripts/allTest.sh`

- starting eventstore with 3 cluster instances
- building test container - a docker container containing this repository
- adding test users to eventstore
- setting up acl for eventstore
- adding test streams to eventstore
- starting test container and running tests within that container
- shutting down eventstore clusters