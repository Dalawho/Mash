// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Base64Upgradeable as Base64} from "openzeppelin-upgradable/utils/Base64Upgradeable.sol";
import {MouseRender, IMouse} from "../src/MouseRender.sol";

contract ChainTest is Test {

    MouseRender render;
    IMouse mouse = IMouse(0xbad6186E92002E312078b5a1dAfd5ddf63d3f731);

    function setUp() public {
        render = new MouseRender();
    }

    function testMouseName() public {
        //console.log(moon.artworkURI(21,1));
        //moon.artworkURI(21,1);
        assertEq(render.getCollectionName(), "Anonymice");
    }

    function testMouseDirect() public {
        mouse.traitTypes(1,2);
    }

    function testMouseDescr() public {
        //console.log(moon.artworkURI(21,1));
        //moon.artworkURI(21,1);
        console.log(render.getTraitDetails(8,2).name);
        console.log(render.getTraitDetails(0,0).mimetype);
    }

    function testMouseData() public {
        console.log(string.concat("data:image/svg+xml;base64,",Base64.encode(render.getTraitData(1,2))));
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
