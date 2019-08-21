#!/usr/bin/env bash

printf "Building the package\n";

if [ -e profitly.tar.gz ]
then
    rm profitly.tar.gz;
    printf "Removed old build package\n";
fi

rm -rf build
mkdir build

npm run build

cp -a application/templates build/
cp -a application/public/images build/public/
cp -a application/public/fonts build/public/

tar cf profitly.tar -C build .
tar rf profitly.tar node_modules;

gzip profitly.tar;