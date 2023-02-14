// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Indelible.sol";
import "../src/Mash.sol";
import "../src/RenderV5.sol";
import "../src/sharedStructs.sol";
import "../src/Proxy.sol";
import "src/MoonRender.sol";
import "src/CRRenderV2.sol";
import "src/MouseRender.sol";
import "src/EORender.sol";
import "src/ToadzRender.sol";

contract Deploy is Script, SharedStructs {
    using stdJson for string;

    Mash mash;
    Mash wrappedMash;
    RenderV5 render;
    UUPSProxy proxy;

    MoonRender moon;
    ChainRender cr;
    MouseRender mr;
    ToadzRender tr;

    struct DataLoad {
        address collection;
        uint16 maxSupply; 
        uint16 minted; 
        string[] traitNames;
        uint8 xSize;
        uint8 ySize;
        bool zrender;
    }

    string[] public collections = ["CrypToadzToken"];//"Anonymice", "Moonbirds", "ChainRunners","CrypToadz"];//;//, "CrypToadz"];//"OnChainKevin"];//ChainRunners, "Blitmap"];//,"1337", "TonalMuse" , "pksl", "TinyBones", "TinyPussies", "ProofOfPepe", "TonalMuse", "FrogCentral"];

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        wrappedMash = Mash(0x9AcFf3827d5adA3d946433eCf65e4568CC6ef50D);
        render = RenderV5(0xeB669C67660db6b90929bB83A828e715CcE647A2); //new render
        //render.setMash(address(wrappedMash));
        // wrappedMash.setRender(address(render));
        // wrappedMash.setMintActive();
        //moon = new MoonRender();
       // mr = new MouseRender();
        // cr = new ChainRender();
        //tr = new ToadzRender();

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
            //wrappedMash.replaceCollection(CollectionInfo(col.collection,col.maxSupply,0,col.xSize,col.ySize),col.traitNames, 14);
            // if (col.zrender) {
            //     if(col.collection == 0x23581767a106ae21c074b2276D25e5C3e136a68b) {
            //         render.addContract(col.collection, 	0x02D93e35a8eb732e9aCB076AF1244a068E4A53a7, false); //Moon
            //     }
            //     if(col.collection == 0x97597002980134beA46250Aa0510C9B90d87A587) {
            //         render.addContract(col.collection, 0x0706e9D906047933D94BC68A451e33d9214F9C6a, true); //Cr
            //     }
            //     if(col.collection == 0xbad6186E92002E312078b5a1dAfd5ddf63d3f731) {
            //        render.addContract(col.collection, 0x987F6f44D20Cd1B2080d22F9EdCBA7290AA15967, false); //mouse
            //     }
            //     if(col.collection == 0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6) {
            //        render.addContract(col.collection, 0xF5a6E39b0e1465Ce3CF26A8b83D5836dC918491a, false); //toadz
            //     }
            // }
        }
        vm.stopBroadcast();
    }
}