// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

contract CounterTest is Test {
    function setUp() public {
    }

    function testDecode() public {
        console.log(getTraitData(1,1));
    }

    function getTraitData(uint8 _layerId, uint8 _traitId) public view returns(uint16) {
        uint16 id = (uint16(_layerId) << 8) | uint16(_traitId);
        return id;
    }
}