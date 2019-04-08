#! /bin/bash
echo "Combine test results"
mkdir .nyc_output
cp .nyc_integration/*.* .nyc_output
cp .nyc_unit/*.* .nyc_output
mkdir coverage
nyc merge .nyc_output ./coverage/coverage.json
nyc report --reporter=text --reporter=lcov
rm -r .nyc_integration
rm -r .nyc_unit