// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Indelible.sol";
import "../src/Mash.sol";
import "../src/RenderV2.sol";
import "src/sharedStructs.sol";
import "../src/Proxy.sol";

contract Deploy is Script, SharedStructs {

    IndelibleTest indel;
    Mash mash;
    Mash wrappedMash;
    RenderV2 render;
    UUPSProxy proxy;
    string[] names = ["L1", "L2","L3" , "L4", "L5"];
    bytes6[7] empty = [bytes6(0x000000000000), 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000];
    bytes6[7] onlyback = [bytes6(0x000000c00000), 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000];
    bytes6[7] back = [bytes6(0x010101410000), 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000];


    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        wrappedMash = Mash(address(0x7D747738292bfCa512BfdD96E70496bAf7B2C2fC));
        console.log(wrappedMash.previewCollage(empty));
        console.log(wrappedMash.previewCollage(onlyback)); //0x010007410000
        
        console.log(wrappedMash.previewCollage(back));
        wrappedMash.setMintActive();
        wrappedMash.mintAndBuy{ value: 0.005 ether }(back);
        vm.stopBroadcast();
        // render 0x20b9Ed87130a0c9772c492599dA037D44AdAA3BB
    }
}
