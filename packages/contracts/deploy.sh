#!/usr/bin/env bash

source .env

forge script script/TestnetDeploy.s.sol:Deploy --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
