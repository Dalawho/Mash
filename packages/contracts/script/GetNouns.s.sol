// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Indelible.sol";
import "../src/Mash.sol";
import "../src/RenderV2.sol";
import "../src/sharedStructs.sol";
import "../src/Proxy.sol";

import { Base64 } from "solady/utils/Base64.sol";

contract GetNouns is Script, SharedStructs {
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
    bytes[] public nouns;
    address nounsAddress;

    function run() public {
        //vm.startBroadcast();
        wrappedMash = Mash(0x9AcFf3827d5adA3d946433eCf65e4568CC6ef50D);
        render = RenderV2(0x4Ad77332F4e3aDb6d6ca7c9e43c7e83DCC4DC08A);
           
        string memory out = '{ "nouns" :[';
        bytes memory newNoun;
        for(uint8 i = 180; i < 242; ++i) {
            newNoun = render.getTraitData(0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03, 2, i);
            nouns.push(newNoun);
            out = string.concat(out,'"' , Base64.encode(newNoun), '", ');
            console.log(i);
        }
        out = string.concat(out, "]}");
        vm.writeFile("out3.json", out);
        //vm.stopBroadcast();
    }
}