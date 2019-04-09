#! /bin/bash
echo "Combine test results"
mkdir ./.nyc_output
nyc merge ./.nyc_integration ./.nyc_output/integation.json
rm -r ./.nyc_integration
nyc merge ./.nyc_unit ./.nyc_output/unit.json
rm -r ./.nyc_unit

rm ./docs/coverage.json > /dev/null

