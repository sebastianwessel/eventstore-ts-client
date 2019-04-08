#! /bin/bash
echo "Combine test results"
cp .nyc_integration/*.* .nyc_output
cp .nyc_unit/*.* .nyc_output
nyc merge .nyc_output ./coverage/coverage.json
nyc report --reporter=lcov --reporter=text