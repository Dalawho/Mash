#!/bin/bash

pnpm typechain --target ethers-v5 --out-dir types './out/?(Mash.sol|Render.sol)/*.json'