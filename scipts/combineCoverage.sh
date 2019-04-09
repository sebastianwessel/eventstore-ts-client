#! /bin/bash
echo "Combine test results"
nyc merge ./.nyc_integration ./.nyc_output/integation.json
#nyc merge ./.nyc_unit ./.nyc_output/unit.json
#nyc merge ./.nyc_output ./.nyc_output/combined.json
#rm ./.nyc_output/integation.json
#rm ./.nyc_output/unit.json