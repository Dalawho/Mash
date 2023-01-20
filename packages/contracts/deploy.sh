#!/usr/bin/env bash

source .env

forge script script/MainnetDeploy.s.sol:Deploy --rpc-url $MAIN_RPC_URL --broadcast --verify -vvv
