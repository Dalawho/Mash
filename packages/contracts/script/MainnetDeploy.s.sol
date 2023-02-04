// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Indelible.sol";
import "../src/Mash.sol";
import "../src/RenderV2.sol";
import "../src/sharedStructs.sol";
import "../src/Proxy.sol";

contract Deploy is Script, SharedStructs {
    using stdJson for string;

    Mash mash;
    Mash wrappedMash;
    RenderV2 render;
    UUPSProxy proxy;

    struct DataLoad {
        address collection;
        uint16 maxSupply; 
        uint16 minted; 
        string[] traitNames;
        uint8 xSize;
        uint8 ySize;
    }

    string[] public collections = ["Nouns"];//"OnChainKevin"];//"Blitmap"];//,"1337", "TonalMuse" , "pksl", "TinyBones", "TinyPussies", "ProofOfPepe", "TonalMuse", "FrogCentral"];

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        wrappedMash = Mash(0x9AcFf3827d5adA3d946433eCf65e4568CC6ef50D);
        // render = new RenderV2(); //new render
        // render = RenderV2(0x4Ad77332F4e3aDb6d6ca7c9e43c7e83DCC4DC08A);
        // render.setMash(address(wrappedMash));
        // wrappedMash.setRender(address(render));
         //deploy the new Mash
        // proxy = new UUPSProxy(address(mash), "");
        // wrappedMash = Mash(address(proxy));
        // wrappedMash.initialize();
        // wrappedMash.setRender(address(render));
        // render.setMash(address(wrappedMash));
        // mash = new Mash();
        // wrappedMash.upgradeTo(address(mash));
           
        string memory _in = vm.readFile("./collections.json");
        for(uint256 i; i < collections.length; ++i) {
            bytes memory rawJson = _in.parseRaw(collections[i]);
            DataLoad memory col = abi.decode(rawJson, (DataLoad));
            wrappedMash.addCollection(CollectionInfo(col.collection,col.maxSupply,0,col.xSize,col.ySize),col.traitNames);
        }
        vm.stopBroadcast();
    }
}