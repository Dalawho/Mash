// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Indelible.sol";
import "../src/Mash.sol";
import "../src/Render.sol";
import "src/sharedStructs.sol";

contract Deploy is Script, SharedStructs {

    IndelibleTest indel;
    Mash mash;
    Render render;
    string[] names = ["name", "name","asd" , "adsf", "ad"];

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        // indel = new IndelibleTest(); 
        // mash = new Mash();
        // render = new Render(); 
        // mash.initialize();
        // render.initialize();
        // mash.setRender(address(render));
        // render.setMash(address(mash));
        Mash(0x9d629b98137b88C42f3021924A5DF8C1Ff5A1fEA).addCollection(CollectionInfo(0x2eE60e5cFe7827aFE0549fA1cA41289f3bEaa813,1000,0,32,32), names);
        vm.stopBroadcast();
        // render 0x20b9Ed87130a0c9772c492599dA037D44AdAA3BB
    }
}
