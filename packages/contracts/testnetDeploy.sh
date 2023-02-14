
#!/usr/bin/env bash

source .env

forge script script/TestnetOS.s.sol:Deploy --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvv