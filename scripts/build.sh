#! /bin/sh

echo 'start compiling'
tsc
echo 'compile finished'
echo 'copy model.js'
cp src/protobuf/model.js dist/protobuf/model.js
echo 'copy model.d.ts'
cp src/protobuf/model.js dist/protobuf/model.d.ts
echo 'finished build'