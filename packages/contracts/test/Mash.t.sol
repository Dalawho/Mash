// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "forge-std/Test.sol";
import "src/Mash.sol";
import "src/RenderV5.sol";
import "src/sharedStructs.sol";
import "src/Proxy.sol";
import "src/MoonRender.sol";
import "src/CRRenderV2.sol";
import "src/MouseRender.sol";
import "src/EORender.sol";
import "src/ToadzRender.sol";

contract MashTest is Test, SharedStructs {
    using stdJson for string;
    Mash mash;
    RenderV5 render; 
    UUPSProxy proxy;
    Mash wrappedMash;
    MoonRender moon;
    ChainRender cr;
    MouseRender mr; 
    EORender eo;
    ToadzRender toadz;

    //string[] public collections = ["1337Token" ,"OnChainKevinToken", "NounsToken"];
    string[] public collections = ["1337", "TonalMuse",  "CryptoBabyTeddies", "Blitmap", "OnChainKevin", "Nouns", "ChainRunners", "Flipmap", "SmolPhunks",  "MadMasks", "Anonymice", "Moonbirds", "CrypToadz", "CrypToadzToken"];
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
        render = new RenderV5(); 
        proxy = new UUPSProxy(address(mash), "");
        moon = new MoonRender();
        cr = new ChainRender();
        mr = new MouseRender(); 
        eo = new EORender();
        toadz = new ToadzRender();
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
                if(col.collection == 0x3aBEDBA3052845CE3f57818032BFA747CDED3fca) {
                   render.addContract(col.collection, address(eo), false);
                }
                if(col.collection == 0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6) {
                   render.addContract(col.collection, address(toadz), false);
                }
            }
        }
        wrappedMash.setMintActive();
    }

    function testMashMint() public {
        //testCollectionAddition();
        //        string[] private LAYER_NAMES = [unicode"5p3c141", unicode"0v32", unicode"3y35", unicode"und32", unicode"5ku115", unicode"84ck920und"];
        bytes6 empty = bytes6(0);
        bytes6 l1 = bytes6(0x010201010000);
        bytes6 l2 = bytes6(0x010301010000);
        bytes6 l3 = bytes6(0x010001010000);
        bytes6 l4 = bytes6(0x050503010000);

        bytes6 realBlit =   bytes6(0x010010310000);
        bytes6 l6 =         bytes6(0x020102010000);
        bytes6 back =       bytes6(0x030103311010);
        bytes6 blit =       bytes6(0x040402310000);
        bytes6 l5 =         bytes6(0x050506010000);

        wrappedMash.previewCollage([blit,empty,empty,empty,empty,empty, empty]);
        //wrappedMash.mintAndBuy{ value: 0.005 ether }([l1,l2,l3,empty,empty,empty, empty]);
        wrappedMash.mintAndBuy{ value: 0.005 ether }([realBlit, l6, back,blit, back,empty, empty]);
    }

    function mintAndWrite(uint256 i, bytes6[7] memory input, string memory file) public {
        wrappedMash.mintAndBuy{ value: 0.005 ether }(input);
        string memory token = wrappedMash.previewCollage(input);//wrappedMash.tokenURI(i);
        wrappedMash.tokenURI(i);
        vm.writeFile(file, token);
    }

    // function testMashMintAndWrite() public {
    //     // bytes6 l1 =   bytes6(0x010010310000);
    //     // bytes6 l2 =   bytes6(0x020102010000);
    //     // bytes6 l3 =   bytes6(0x030103311010);
    //     // bytes6 l4 =   bytes6(0x040402310000);
    //     // bytes6 l5 =   bytes6(0x050506010000);
    //     // bytes6 l6 =   bytes6(0x000000000000);
    //     // bytes6 l7 =   bytes6(0x000000000000);
    //     // bytes6[7] memory input = [l1, l2, l3, l4, l5, l6, l7];
    //     bytes6[7][4] memory input = [
    //         [ bytes6(0x040064010000), 0x0a0004011a00, 0x0b0100010000, 0x01000b010000, 0x070703010ffa, 0x03000c0100fe, 0x0c020a010000 ],
    //         [bytes6(0x040064820000), 0x0a0004811a00, 0x060264820000, 0x06030b810000, 0x050003810000, 0x050403820000, 0x090003820927],
    //     [bytes6(0x000000000000), 0x000000000000, 0x000000000000, 0x000000000000, 0x050003810000, 0x050403820000, 0x000000000000],
    //      [ bytes6(0x0806a6011e00), 0x0806a8010020, 0x040269011e21, 0x04027e010000, 0x000000000000, 0x000000000000, 0x000000000000 ]
        
    //     ];
    //     for(uint i; i < input.length; ++i) {
    //         mintAndWrite(i+1, input[i], string.concat("svgs/",Strings.toString(i),".svg"));
    //     }
    // }

        //toadstraits == 13
        //Toadstoken == 14 
       function testMashTokenMintAndWrite() public {
        bytes6[7][10] memory input = [
            [ bytes6(0x070000810000), 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000 ],
            [bytes6(0x020001010000), 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000],
        [bytes6(0x030001010000), 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000],
        [bytes6(0x0806a6011e00), 0x0806a8010020, 0x04027e010000, 0x0b0802011f00, 0x07010b010000, 0x030509010e00, 0x0c030a010000],
        [bytes6(0x0d0001010000), 0x0d0101010000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000],
        [bytes6(0x0e013c010000), 0x0e013c010000, 0x0e013c010000, 0x0e013c010000, 0x0e013c010000, 0x0e013c010000, 0x0e013c010000],
        [bytes6(0x080787012000), 0x08078c014000, 0x080784016000, 0x080778014020, 0x080775012020, 0x08071b0130e0, 0x0806c2010000],
        [bytes6(0x000000000000), 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000, 0x000000000000],
        [bytes6(0x040030010000), 0x0401e9012020, 0x040089010040, 0x0806aa012000, 0x0806b2010020, 0x080738012040, 0x000000000000],
        [bytes6(0x0806b201202a), 0x08073801204a, 0x08076c01002a, 0x08078501004a, 0x08079f01200a, 0x0807d2010009, 0x000000000000]
        ];
        for(uint i; i < input.length; ++i) {
            mintAndWrite(i+1, input[i], string.concat("svgMash/",Strings.toString(i),".svg"));
        }
    }

    function testMashAll() public {
        testMashMint();
        //console.log(wrappedMash.tokenURI(1));
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}