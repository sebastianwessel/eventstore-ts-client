#! /bin/bash
echo "Combine test results"
cp -a ./.nyc_integration/. .nyc_output/
cp -a ./.nyc_unit/. .nyc_output/
nyc merge .nyc_output ./coverage/coverage.json
ls -a ./.nyc_output
echo  "***********"
ls -a ./coverage/
nyc report --reporter=lcov --reporter=text --report-dir=./coverage --temp-directory=./.nyc_output