#! /bin/bash
echo "Combine test results"
mkdir ./.nyc_output
nyc merge ./.nyc_integration ./.nyc_output/integation.json
nyc merge ./.nyc_unit ./.nyc_output/unit.json
#nyc merge ./.nyc_output ./.nyc_output/combined.json

rm ./docs/coverage.json
rm -r ./.nyc_integration
rm -r ./.nyc_output
rm -r ./.nyc_unit