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
    Render render;
    UUPSProxy proxy;

    struct DataLoad {
        address collection;
        uint16 maxSupply; 
        uint16 minted; 
        string[] traitNames;
        uint8 xSize;
        uint8 ySize;
    }

    string[] public collections = ["Blitmap"];//,"1337", "TonalMuse" , "pksl", "TinyBones", "TinyPussies", "ProofOfPepe", "TonalMuse", "FrogCentral"];

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        // mash = new Mash();
        // render = new Render(); 
        // proxy = new UUPSProxy(address(mash), "");
        // wrappedMash = Mash(address(proxy));

        // wrappedMash.initialize();
        
        wrappedMash = Mash(0x9AcFf3827d5adA3d946433eCf65e4568CC6ef50D);
        // wrappedMash.setRender(address(render));
        // render.setMash(address(wrappedMash));
           
        string memory _in = vm.readFile("./collections.json");
        for(uint256 i; i < collections.length; ++i) {
            bytes memory rawJson = _in.parseRaw(collections[i]);
            DataLoad memory col = abi.decode(rawJson, (DataLoad));
            wrappedMash.addCollection(CollectionInfo(col.collection,col.maxSupply,0,col.xSize,col.ySize),col.traitNames);
        }
        vm.stopBroadcast();
    }
}