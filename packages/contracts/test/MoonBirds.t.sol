// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Base64Upgradeable as Base64} from "openzeppelin-upgradable/utils/Base64Upgradeable.sol";
import {MoonRender} from "../src/MoonRender.sol";

interface IMoonBirds {
        function artworkURI(
        Features memory features,
        Mutators memory mutators,
        uint32 scaleupFactor
    ) external view returns (string memory);
    function artworkURI(uint256 tokenId, uint32 scaleupFactor)
        external
        view
        returns (string memory);
    struct Features {
        /// @dev Valid range [0, 11)
        uint8 background;
        /// @dev Valid range [0, 20)
        uint8 beak;
        /// @dev Valid range [0, 113)
        uint8 body;
        /// @dev Valid range [0, 63)
        uint8 eyes;
        /// @dev Valid range [0, 13)
        uint8 eyewear;
        /// @dev Valid range [0, 38)
        uint8 headwear;
        /// @dev Valid range [0, 9)
        uint8 outerwear;
    }
    struct Mutators {
        uint96 backgroundId;
    }
}

contract CounterTest is Test {
    IMoonBirds moon;
    MoonRender render;

    function setUp() public {
        moon = IMoonBirds(0xb1bEfc9E7B76C1e846EBBf3e6E1Ab029C86e7435);
        render = new MoonRender();
    }

    function testMoon() public {
        //console.log(moon.artworkURI(21,1));
        //moon.artworkURI(21,1);
       // console.log(moon.artworkURI(IMoonBirds.Features(1, 2, 1, 2, 0, 0, 0), IMoonBirds.Mutators(0), 10));
    }

    function testMoonName() public {
        //console.log(moon.artworkURI(21,1));
        //moon.artworkURI(21,1);
        //console.log(render.getCollectionName());
    }

    function testMoonDescr() public {
        //console.log(moon.artworkURI(21,1));
        //moon.artworkURI(21,1);
        // console.log(render.getTraitDetails(0,1).name);
        // console.log(render.getTraitDetails(0,1).mimetype);
    }

    function testMoonData() public {
        //console.log(moon.artworkURI(21,1));
        //moon.artworkURI(21,1);
        //console.log(string(render.getTraitData(2,9)));
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
