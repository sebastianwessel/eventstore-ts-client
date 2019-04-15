FROM node:11-slim

WORKDIR /home/travis/build/sebastianwessel/eventstore-ts-client/
#ADD . .
CMD ["npm", "run","nyc:all"]