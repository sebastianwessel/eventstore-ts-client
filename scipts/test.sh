#! /bin/bash

# helper function - prints colored text
print_style () {

    if [ "$2" == "info" ] ; then
        COLOR="96m";
    elif [ "$2" == "success" ] ; then
        COLOR="92m";
    elif [ "$2" == "warning" ] ; then
        COLOR="93m";
    elif [ "$2" == "danger" ] ; then
        COLOR="91m";
    else #default color
        COLOR="0m";
    fi

    STARTCOLOR="\e[$COLOR";
    ENDCOLOR="\e[0m";

    printf "$STARTCOLOR%b$ENDCOLOR" "$1";
}

i=1
sp="/-\|"


### prepare local eventstore cluster setup
###############################################
print_style "check if eventstore docker image exists\n";
if [[ "$(docker images -q eventstore/eventstore:latest 2> /dev/null)" == "" ]]; then
  print_style "...images does not exist\n";
  docker-compose -f ./test/docker-compose.yml pull  
  # docker pull eventstore/eventstore:latest
  else
  print_style "...image exists\n";
fi

print_style 'starting docker' "info\n";
docker-compose -f ./test/docker-compose.yml -p estest up -d

print_style "waiting for eventstore cluster to be available\n";
until $(curl --output /dev/null --silent --fail http://localhost:2113/stats); do
    printf "\b\b\e[96m${sp:i++%${#sp}:1}"
    sleep 0.1
done
printf "\b\b\e[0m "
print_style "\n";
print_style "estest_eventstore1_1 is up\n" "success";
until $(curl --output /dev/null --silent --fail http://localhost:2123/stats); do
    printf "\b${sp:i++%${#sp}:1}"
    sleep 1
done
print_style "estest_eventstore1_2 is up\n" "success";
until $(curl --output /dev/null --silent --fail http://localhost:2133/stats); do
    printf "\b${sp:i++%${#sp}:1}"
    sleep 1
done
print_style "estest_eventstore1_3 is up\n" "success";

### wait 5 sec
###############################################
for i in {0..50}
  do 
     printf "\b\b\e[96m${sp:i++%${#sp}:1}"
     sleep 0.1
 done
printf "\b\b\e[0m "


### prepare eventstore setup and data for tests
###############################################
print_style "\nsetting up eventstore config\n";
print_style 'create read only user: ';
if $(curl --output /dev/null --silent --fail -i -d @test/testSetup/readOnlyUser.json -H Content-Type:application/json -u admin:changeit http://127.0.0.1:2113/users/); then
  print_style "ok\n" "success";
  else
  print_style "fail\n" "danger";
fi

print_style 'create write only user: '
if $(curl --output /dev/null --silent --fail -i -d @test/testSetup/writeOnlyUser.json -H Content-Type:application/json -u admin:changeit http://127.0.0.1:2113/users/); then
  print_style "ok\n" "success";
  else
  print_style "fail\n" "danger";
fi

print_style 'create restricted user: ';
if $(curl --output /dev/null --silent --fail -i -d @test/testSetup/restrictedUser.json -H Content-Type:application/json -u admin:changeit http://127.0.0.1:2113/users/); then
  print_style "ok\n" "success";
  else
  print_style "fail\n" "danger";
fi

print_style 'change default acl: ';
if $(curl --output /dev/null --silent --fail -i -d @test/testSetup/defaultACL.json -H Content-Type:application/vnd.eventstore.events+json -u admin:changeit http://127.0.0.1:2113/streams/%24settings/metadata/); then
  print_style "ok\n" "success";
  else
  print_style "fail\n" "danger";
fi


### Start integration tests and save code coverage
###############################################
print_style "\nstart integration tests with code coverage generation\n";
npm run test:coverage
testexit=0
rc=$?; if [[ $rc != 0 ]]; then $testexit=$rc; fi


### shut down eventstore cluster and remove docker containers
###############################################
print_style "shutting down docker containers\n";
docker-compose -f ./test/docker-compose.yml -p estest down

exit $testexit