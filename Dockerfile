FROM node:11-slim

WORKDIR /usr/src/app
#ADD . .
CMD ["npm", "run","nyc:all"]