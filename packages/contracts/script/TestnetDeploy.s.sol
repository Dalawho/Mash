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

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        indel = new IndelibleTest(); 
        mash = new Mash();
        render = new RenderV2();
        proxy = new UUPSProxy(address(mash), "");
        wrappedMash = Mash(address(proxy));
        wrappedMash.initialize(); 
        wrappedMash.setRender(address(render));
        render.setMash(address(wrappedMash));
        wrappedMash.addCollection(CollectionInfo(address(indel),1000,0,32,32), names);
        vm.stopBroadcast();
        // render 0x20b9Ed87130a0c9772c492599dA037D44AdAA3BB
    }
}
