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




### prepare eventstore setup and data for tests
###############################################
print_style "\nsetting up eventstore config\n";
print_style 'create read only user: ';
curl --output /dev/null --silent --fail -i -d @test/integrationTests/testSetup/readOnlyUser.json -H Content-Type:application/json -u admin:changeit http://127.0.0.1:2113/users/
res=$?
if test "$res" != "0"; then
  print_style "fail\n" "danger";
  else
      print_style "ok\n" "success";
fi

print_style 'create write only user: '
curl --output /dev/null --silent --fail -i -d @test/integrationTests/testSetup/writeOnlyUser.json -H Content-Type:application/json -u admin:changeit http://127.0.0.1:2113/users/
res=$?
if test "$res" != "0"; then
  print_style "fail\n" "danger";
  else
      print_style "ok\n" "success";
fi

print_style 'create restricted user: ';
curl --output /dev/null --silent --fail -i -d @test/integrationTests/testSetup/restrictedUser.json -H Content-Type:application/json -u admin:changeit http://127.0.0.1:2113/users/
res=$?
if test "$res" != "0"; then
  print_style "fail\n" "danger";
  else
      print_style "ok\n" "success";
fi

print_style 'change default acl: ';
curl --output /dev/null --silent --fail -i -d @test/integrationTests/testSetup/defaultACL.json -H Content-Type:application/vnd.eventstore.events+json -u admin:changeit http://127.0.0.1:2113/streams/%24settings/metadata/
res=$?
if test "$res" != "0"; then
  print_style "fail\n" "danger";
  else
      print_style "ok\n" "success";
fi


print_style 'creating test streams:\n';
for dir in ./test/integrationTests/testSetup/testStreams/*/
do
    dir=${dir%*/}      # remove the trailing "/"
    streamname=${dir##*/}    # print everything after the final "/"
    print_style "stream ${streamname}: "
    curl --output /dev/null --silent --fail -i -d @test/integrationTests/testSetup/testStreams/${streamname}/events.json -H Content-Type:application/vnd.eventstore.events+json -u admin:changeit http://127.0.0.1:2113/streams/${streamname}
    res=$?
    if test "$res" != "0"; then
      print_style "fail\n" "danger";
      else
          print_style "ok\n" "success";
    fi
done


### Start integration tests and save code coverage
###############################################
print_style "\nstart integration tests with code coverage generation\n";
npm run mocha:integration
testexit=0
rc=$?; if [[ $rc != 0 ]]; then $testexit=$rc; fi
