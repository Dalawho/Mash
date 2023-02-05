// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "forge-std/Test.sol";
import "src/Mash.sol";
import "src/RenderV2.sol";
import "src/sharedStructs.sol";
import "src/Proxy.sol";
import "src/MoonRender.sol";
import "src/CRRenderV2.sol";
import "src/MouseRender.sol";

contract MashTest is Test, SharedStructs {
    using stdJson for string;
    Mash mash;
    RenderV2 render; 
    UUPSProxy proxy;
    Mash wrappedMash;
    MoonRender moon;
    ChainRender cr;
    MouseRender mr; 

    string[] public collections = ["1337", "TonalMuse",  "CryptoBabyTeddies", "Blitmap", "OnChainKevin", "Nouns", "ChainRunners", "Anonymice", "SmolPhunks", "Moonbirds" , "MadMasks"];
    struct DataLoad {
        address collection;
        uint16 maxSupply; 
        uint16 minted; 
        string[] traitNames;
        uint8 xSize;
        uint8 ySize;
        bool zrender;
    }

    function setUp() public {
        mash = new Mash();
        render = new RenderV2(); 
        proxy = new UUPSProxy(address(mash), "");
        moon = new MoonRender();
        cr = new ChainRender();
        mr = new MouseRender(); 
        wrappedMash = Mash(address(proxy));

        wrappedMash.initialize();
        wrappedMash.setRender(address(render));
        render.setMash(address(wrappedMash));
        string memory _in = vm.readFile("./collections.json");
        for(uint256 i; i < collections.length; ++i) {
            bytes memory rawJson = _in.parseRaw(collections[i]);
            DataLoad memory col = abi.decode(rawJson, (DataLoad));
            wrappedMash.addCollection(CollectionInfo(col.collection,col.maxSupply,0,col.xSize,col.ySize),col.traitNames);
            if (col.zrender) {
                if(col.collection == 0x23581767a106ae21c074b2276D25e5C3e136a68b) {
                    render.addContract(col.collection, address(moon), false);
                }
                if(col.collection == 0x97597002980134beA46250Aa0510C9B90d87A587) {
                    render.addContract(col.collection, address(cr), true);
                }
                if(col.collection == 0xbad6186E92002E312078b5a1dAfd5ddf63d3f731) {
                   render.addContract(col.collection, address(mr), false);
                }
            }
        }
        wrappedMash.setMintActive();
    }

    // function testFlipMap() public {
    //     console.log(IBlitmap(0x0E4B8e24789630618aA90072F520711D3d9Db647).tokenSvgDataOf(1));
    // }

    // function testFlipTokenURI() public {
    //     //testCollectionAddition();
    //     //        string[] private LAYER_NAMES = [unicode"5p3c141", unicode"0v32", unicode"3y35", unicode"und32", unicode"5ku115", unicode"84ck920und"];
    //     bytes6 empty = bytes6(0);
    //     bytes6 l5 = bytes6(0x090001011010);
    //     wrappedMash.mintAndBuy{ value: 0.005 ether }([l5,empty,empty,empty,empty,empty, empty]);
    // }

    function testMint() public {
        //testCollectionAddition();
        //        string[] private LAYER_NAMES = [unicode"5p3c141", unicode"0v32", unicode"3y35", unicode"und32", unicode"5ku115", unicode"84ck920und"];
        bytes6 empty = bytes6(0);
        bytes6 l1 = bytes6(0x010201010000);
        bytes6 l2 = bytes6(0x010301010000);
        bytes6 l3 = bytes6(0x010001010000);
        bytes6 l4 = bytes6(0x050503010000);
        //        string[] private LAYER_NAMES = [unicode"Eyes", unicode"Head", unicode"Snout", unicode"Accessory", unicode"Body Accessory", unicode"Type", unicode"Background"];
        //bytes6 l5 = bytes6(0x020501010000);
        bytes6 l5 = bytes6(0x090200020000);
        bytes6 l6 = bytes6(0x0b0801020000);
        bytes6 blit = bytes6(0x080201320000);

        bytes6 back = bytes6(0x080100320000);

        wrappedMash.previewCollage([blit,empty,empty,empty,empty,empty, empty]);
        //wrappedMash.mintAndBuy{ value: 0.005 ether }([l1,l2,l3,empty,empty,empty, empty]);
        wrappedMash.mintAndBuy{ value: 0.005 ether }([l6,back,blit, l5,empty,empty, empty]);
    }

    // function testPreview() public {
    //     bytes6 empty = bytes6(0);
    //     bytes6 l1 = bytes6(0x010501010000);
    //     bytes6 l2 = bytes6(0x010401010000);
    //     bytes6 l3 = bytes6(0x010301010000);
    //     bytes6 l4 = bytes6(0x010207010000);
    //     bytes6 l5 = bytes6(0x020501010000);
    //     bytes6 l6 = bytes6(0x030001010101);
    //     //console.log(wrappedMash.previewCollage([l1,l3,l2,l4,l5,l6, empty]));
    // }

    function testAll() public {
        testMint();
        //console.log(wrappedMash.tokenURI(1));
        console.log(wrappedMash.tokenURI(1));
    }

    // function testWithdraw() public {
    //     testMint();
    //     uint256 before = address(this).balance;
    //     wrappedMash.withdraw();
    //     assertEq(address(this).balance, before + 0.005 ether);
    // }

    // function testFailWithdraw() public {
    //     testMint();
    //     vm.prank(address(0));
    //     wrappedMash.withdraw();
    // }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}