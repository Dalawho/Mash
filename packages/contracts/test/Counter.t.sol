// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/interfaces/IIndelible.sol";
import {Base64Upgradeable as Base64} from "openzeppelin-upgradable/utils/Base64Upgradeable.sol";

contract CounterTest is Test {
    IIndelible indel;

    function setUp() public {
        indel = IIndelible(0x9251dEC8DF720C2ADF3B6f46d968107cbBADf4d4);
    }

    function testResponse() public {
        bytes memory out = bytes(indel.traitData(1,3));
        console.log("out:",".",Base64.encode(out));
        IIndelible.Trait memory traits = indel.traitDetails(1,3);
        console.log("traitdetails:", traits.name);
        //IIndelible.ContractData memory data = 
        indel.contractData(); 
    }
}
