#! /bin/bash
echo "Combine test results"
cp -a ./.nyc_integration/. ./.nyc_output/
cp -a ./.nyc_unit/. ./.nyc_output/
nyc merge .nyc_output ./coverage/coverage.json
nyc report