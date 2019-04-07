# Eventstore typescript / ES6 javascript client lib

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Eventstore javascript client library written in typescript

## Building

To build this lib just run `npm run build`

## Test lib

eventstore-ts-client tests are heavily based on integration tests.

Test are running against a 3 node eventstore cluster which will configured and filled with some test data and settings.  
You will need to have docker installed on your machine to be able to run tests.  
The setup contains a script which does all stuff for you - just type:

`npm run test`

Running tests will also generate some code coverage report to be used in tools like sonarqube

## Apache 2.0 License

see [LICENSE](LICENSE)