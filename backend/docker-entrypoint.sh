#!/bin/sh

sleep 20

npx db-migrate up initialize
node index.js