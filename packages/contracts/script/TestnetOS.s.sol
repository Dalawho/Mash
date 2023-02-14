// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Test721.sol";

contract Deploy is Script {

    Test721 test;

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        test = new Test721(); 
        test.mint();
        vm.stopBroadcast();
    }
}
