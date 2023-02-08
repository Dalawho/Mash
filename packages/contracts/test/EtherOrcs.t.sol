// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Base64Upgradeable as Base64} from "openzeppelin-upgradable/utils/Base64Upgradeable.sol";
import {EORender} from "../src/EORender.sol";

contract ChainTest is Test {

    EORender render;

    function setUp() public {
        render = new EORender();
    }

    function testEtherName() public {
        //console.log(moon.artworkURI(21,1));
        //moon.artworkURI(21,1);
        assertEq(render.getCollectionName(), "Ether Orcs Genesis");
    }

    // function testEtherDirect() public {
    //     mouse.traitTypes(1,2);
    // }

    function testEtherDescr() public {
        //console.log(moon.artworkURI(21,1));
        //moon.artworkURI(21,1);
        console.log(render.getTraitDetails(2,2).name);
        console.log(render.getTraitDetails(2,2).mimetype);
    }

    function testEtherData() public {
        //console.log(string.concat("data:image/svg+xml;base64,",Base64.encode(render.getTraitData(1,2))));
        console.log(string(render.getTraitData(0,2)));
    }

    // function testResponse() public {
    //     bytes memory out = bytes(indel.traitData(1,3));
    //     console.log("out:",".",Base64.encode(out));
    //     IIndelible.Trait memory traits = indel.traitDetails(1,3);
    //     console.log("traitdetails:", traits.name);
    //     //IIndelible.ContractData memory data = 
    //     indel.contractData(); 
    // }
}
