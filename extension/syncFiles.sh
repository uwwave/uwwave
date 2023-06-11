#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"

rm -r $DIR/../website/lib/extension/shared
cp -r $DIR/src/main/shared $DIR/../website/lib/extension/shared

cd ../website
yarn lint
