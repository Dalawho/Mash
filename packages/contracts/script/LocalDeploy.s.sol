// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Indelible.sol";
import "../src/Mash.sol";
import "../src/Render.sol";
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

    function run() public {
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        string memory _in = vm.readFile("./collections.json");
        bytes memory rawJson = _in.parseRaw("1337");
        DataLoad memory col = abi.decode(rawJson, (DataLoad));
        vm.startBroadcast(deployerPrivateKey);
        mash = new Mash();
        render = new Render(); 
        proxy = new UUPSProxy(address(mash), "");
        wrappedMash = Mash(address(proxy));

        wrappedMash.initialize();
        wrappedMash.setRender(address(render));
        render.setMash(address(wrappedMash));
           
        wrappedMash.addCollection(CollectionInfo(col.collection,col.maxSupply,0,col.xSize,col.ySize),col.traitNames);
        wrappedMash.setMintActive();
        (bool sendt,) = payable(address(0x84f2bca64e27cDaef769d899A7eC2Ea6bEB8c73d)).call{value: 1 ether}("");
        console.log(sendt);
        vm.stopBroadcast();
    }
}
