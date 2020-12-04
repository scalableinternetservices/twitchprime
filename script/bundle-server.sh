#!/usr/bin/env bash

set -euo pipefail

# compile typescript
npm run clean
./node_modules/.bin/tsc -p server --outDir server/bin

# cp package.jsons
cp package.json package-lock.json ./server/bin
cp server/package.json server/package-lock.json ./server/bin/server

# copy static resources
cp fix-maps.js ./server/bin/fix-maps.js
cp -r ./public ./server/bin
cp -r ./server/src/db/migrations ./server/bin/server/src/db
cp ./server/src/graphql/schema.graphql ./server/bin/server/src/graphql/schema.graphql

# install per-package package.json deps
npm --prefix ./server/bin ci --production
npm --prefix ./server/bin/server ci --production


# cd server/bin
# zip -r -q -X ../bundle.zip ./*
