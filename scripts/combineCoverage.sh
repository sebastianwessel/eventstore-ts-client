#! /bin/bash
echo "Combine test results"
mkdir -p ./.nyc_output
nyc merge ./.nyc_integration ./.nyc_output/integation.json
sleep 2
nyc merge ./.nyc_unit ./.nyc_output/unit.json
sleep 2

