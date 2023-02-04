// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Base64Upgradeable as Base64} from "openzeppelin-upgradable/utils/Base64Upgradeable.sol";
import {ChainRender} from "../src/CRRenderV2.sol";

contract ChainTest is Test {

    ChainRender render;

    function setUp() public {
        render = new ChainRender();
    }

    function testChainName() public {
        //console.log(moon.artworkURI(21,1));
        //moon.artworkURI(21,1);
        assertEq(render.getCollectionName(), "ChainRunners");
    }

    function testChainDescr() public {
        //console.log(moon.artworkURI(21,1));
        //moon.artworkURI(21,1);
        console.log(render.getTraitDetails(1,2).name);
        console.log(render.getTraitDetails(0,0).mimetype);
    }

    function testChainData() public {
        // console.log(string.concat("data:image/svg+xml;base64,",string(render.getTraitData(3,2))));
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
