#! /bin/sh

echo 'check if eventstore docker image exists'
if [[ "$(docker images -q eventstore/eventstore:latest 2> /dev/null)" == "" ]]; then
  echo '...images does not exist'
  docker-compose -f ./test/docker-compose.yml pull  
  # docker pull eventstore/eventstore:latest
  else
  echo '...image exists'
fi

echo 'starting docker'
docker-compose -f ./test/docker-compose.yml -p estest up -d

echo 'waiting for eventstore cluster to be available'
until $(curl --output /dev/null --silent --fail http://localhost:2133/stats); do
    printf '.'
    sleep 1
done

echo ''
echo 'start integration tests'
npm run test:coverage

echo 'shutting down docker containers'
docker-compose -f ./test/docker-compose.yml -p estest down