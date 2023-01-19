// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/Mash.sol";
import "src/Render.sol";
import "src/sharedStructs.sol";
import "src/Proxy.sol";

contract CounterTest is Test, SharedStructs {
    using stdJson for string;
    Mash mash;
    Render render; 
    UUPSProxy proxy;
    Mash wrappedMash;
    string[] public collections = ["1337", "CryptoBabyTeddies", "pksl", "TinyBones", "TinyPussies", "ProofOfPepe", "TonalMuse"];
    struct DataLoad {
        address collection;
        uint16 maxSupply; 
        uint16 minted; 
        string[] traitNames;
        uint8 xSize;
        uint8 ySize;
    }

    function setUp() public {
        mash = new Mash();
        render = new Render(); 
        proxy = new UUPSProxy(address(mash), "");
        wrappedMash = Mash(address(proxy));

        wrappedMash.initialize();
        wrappedMash.setRender(address(render));
        render.setMash(address(wrappedMash));
        string memory _in = vm.readFile("./collections.json");
        for(uint256 i; i < collections.length; ++i) {
            bytes memory rawJson = _in.parseRaw(collections[i]);
            DataLoad memory col = abi.decode(rawJson, (DataLoad));
            wrappedMash.addCollection(CollectionInfo(col.collection,col.maxSupply,0,col.xSize,col.ySize),col.traitNames);
        }
        wrappedMash.setMintActive();
    }

    function testMint() public {
        //testCollectionAddition();
        //        string[] private LAYER_NAMES = [unicode"5p3c141", unicode"0v32", unicode"3y35", unicode"und32", unicode"5ku115", unicode"84ck920und"];
        bytes6 empty = bytes6(0);
        bytes6 l1 = bytes6(0x010501010000);
        bytes6 l2 = bytes6(0x010401010000);
        bytes6 l3 = bytes6(0x010301010000);
        bytes6 l4 = bytes6(0x010207010000);
        //        string[] private LAYER_NAMES = [unicode"Eyes", unicode"Head", unicode"Snout", unicode"Accessory", unicode"Body Accessory", unicode"Type", unicode"Background"];
        bytes6 l5 = bytes6(0x020501010000);
        bytes6 l6 = bytes6(0x030001010101);
        wrappedMash.mintAndBuy{ value: 0.005 ether }([l1,l3,l2,l4,l5,l6, empty]);
    }

    function testPreview() public {
        bytes6 empty = bytes6(0);
        bytes6 l1 = bytes6(0x010501010000);
        bytes6 l2 = bytes6(0x010401010000);
        bytes6 l3 = bytes6(0x010301010000);
        bytes6 l4 = bytes6(0x010207010000);
        bytes6 l5 = bytes6(0x020501010000);
        bytes6 l6 = bytes6(0x030001010101);
        //console.log(wrappedMash.previewCollage([l1,l3,l2,l4,l5,l6, empty]));
    }

    function testAll() public {
        testMint();
    }

    function testWithdraw() public {
        testMint();
        uint256 before = address(this).balance;
        wrappedMash.withdraw();
        assertEq(address(this).balance, before + 0.005 ether);
    }

    function testFailWithdraw() public {
        testMint();
        vm.prank(address(0));
        wrappedMash.withdraw();
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}