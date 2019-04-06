# eventstore-ts-client

Eventstore javascript client library written in typescript

## building

To build this lib just run `npm run build`

## test lib

eventstore-ts-client tests are heavily based on integration tests.

Test are running against a 3 node eventstore cluster which will configured and filled with some test data and settings.  
You will need to have docker installed on your machine to be able to run tests.  
The setup contains a script which does all stuff for you - just type:

`npm run test`

Running tests will also generate some code coverage report to be used in tools like sonarqube