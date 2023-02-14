// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/RenderV4.sol";
import "src/ToadzRender.sol";

contract ToadTest is Test {

    RenderV4 render;
    ToadzRender toad;
    function setUp() public {
        render = new RenderV4();
        toad = new ToadzRender();
    }

    function testToadData() public {
        
        string memory token = toad.getToken(3147);
        vm.writeFile("toad.svg", token);
    }

    function testToadDatas() public {
        for(uint i = 1; i < 7014; i++) {
            vm.writeFile(string.concat("svgs/token-",Strings.toString(i), ".svg"), toad.getToken(i));
        }
    }

    function testToadTrait() public {
        string memory token = string(toad.getTraitData(1,17));
        vm.writeFile("toadTrait.svg", token);
    }
    
        //  - The second byte must be between 0 and 16, and defines the Background         
    //      - The third byte must be between 17 and 50, and defines the Body
    //      - The next (up to 5) bytes must define traits in this order: 
    //        Mouth: between 121 and 139   -- should be 138
    //        Head: between 51 and  104
    //        Eyes: between 139 and 170
    //        Clothes: between 246 and clothes 248
    //        Accessory II: between 104 and 111
    //        Accessory I: between 237 and 245
    function testToadTraits() public {
      uint8[8] memory start = [0, 17, 121, 51, 139, 245, 104, 237];
      uint8[8] memory end = [16, 50, 137, 103, 167, 248, 111, 244]; 
      string memory token; //2x 139.. must be wrong
      uint8 _correctedLayerId;
        for(uint8 i; i < 15; i++) {
            for(uint8 j; j < 60; j++) {
                _correctedLayerId = i / 8 > 0 ? i - 7 : i;
              if(j + start[_correctedLayerId] > end[_correctedLayerId] ) break;
                token = string(toad.getTraitData(i,j));
                vm.writeFile(string.concat("svgs/",Strings.toString(i), "-", Strings.toString(j), ".svg"), token);
                token = toad.getTraitDetails(i,j).name;
                vm.writeFile(string.concat("svgs/",Strings.toString(i), "-", Strings.toString(j), ".txt"), token);
            }
        }
    }

}
