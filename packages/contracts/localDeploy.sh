#!/usr/bin/env bash

source .env

forge script script/LocalDeploy.s.sol:Deploy --rpc-url http://127.0.0.1:8545 --broadcast -vvvv
