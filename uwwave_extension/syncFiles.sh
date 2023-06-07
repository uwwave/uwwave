#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"

rm -r $DIR/../uwwave_website/lib/extension/shared
cp -r $DIR/src/main/shared $DIR/../uwwave_website/lib/extension/shared

cd ../uwwave_website
yarn lint
