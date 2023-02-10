// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/RenderV3.sol";

contract CounterTest is Test {

    RenderV3 render;
    function setUp() public {
        render = new RenderV3();
    }

    function testNounData() public {
        render.getNounsToken(1);
    }

}
