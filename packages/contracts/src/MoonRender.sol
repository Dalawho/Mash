// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


import "openzeppelin/access/Ownable.sol";
import { Strings} from "openzeppelin/utils/Strings.sol";
import { Base64 } from "openzeppelin/utils/Base64.sol";
import 'ethier/utils/DynamicBuffer.sol';
import "./interfaces/IIndelible.sol";
import {IGenericRender} from "./interfaces/IGenericRender.sol";
import "forge-std/console.sol";

interface IAssemble {
        function assembleArtwork(Features memory f, Mutators memory mutators) external view returns (bytes memory);
        function assembleAttributes(Features memory f) external view returns (Attribute[] memory);
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
    struct Attribute {
        string name;
        string value;
    }
}

contract MoonRender is Ownable, IGenericRender {
    using DynamicBuffer for bytes;

    IAssemble assembler = IAssemble(0xCc80f29a7DB70d727a666AE46Cf4CC3179514368); 

    function getTraitDetails(uint8 _layerId, uint8 _traitId) external view returns(IIndelible.Trait memory){
        uint8[] memory temp = new uint8[](7);
        temp[_layerId] = _traitId;
        IAssemble.Attribute[] memory attributes = assembler.assembleAttributes(IAssemble.Features(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6]));
        string memory out;
        for(uint256 i; i< attributes.length; ++i) {
            out = i == 0 ? string.concat(attributes[i].name, ": ", attributes[i].value) : string.concat(out, ", " , attributes[i].name, ": ", attributes[i].value);
        }
        return IIndelible.Trait(out, "image/svg+xml");
    }

    function getTraitData(uint8 _layerId, uint8 _traitId) external view returns(bytes memory){
        uint8[] memory temp = new uint8[](7);
        temp[_layerId] = _traitId;
        bytes memory data = assembler.assembleArtwork(IAssemble.Features(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6]), IAssemble.Mutators(0));
        bytes memory buffer = DynamicBuffer.allocate(2**18);
        buffer.appendSafe(abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" viewBox="0 0 42 42" width="42" height="42">'));
        _writeSVGPixels(data, buffer);
        return buffer;
    }

    function getCollectionName() external pure returns(string memory){
        return "Moonbirds";
    }


  function _writeSVGPixels(bytes memory data, bytes memory buffer)
    public
    pure
  {
    bytes6 colorbytes;
    string memory color;
    uint256 width;
    uint256 pixelNum;

    // Write every pixel into the buffer
    while (pixelNum < 42*42) {
        //first check if we need to write a pixel 
        // lets do this the wrong way around first 
        colorbytes = bytes6(data[pixelNum*6:pixelNum*6+6]);
        if (colorbytes == 0) {
            pixelNum++;
            continue;
        }
      //colorIndex = ctx.pixels[pixelNum];
      // Check if we need to write a new rect to the buffer at all
    //   if (utils._canSkipPixel(ctx, colorIndex)) {
    //     pixelNum++;
    //     continue;
    //   }

      // Calculate the width of a continuous rect with the same color
      width = 1;
      while ((pixelNum + width) % 42 != 0) {
        if (colorbytes == bytes6(data[pixelNum*6:pixelNum*6+6+6*width])) {
          width++;
        } else break;
      }

      buffer.appendSafe(
        abi.encodePacked(
          '<rect fill="#',
          color,
          '" x="',
          Strings.toString(pixelNum % 42),
          '" y="',
          Strings.toString(pixelNum / 42),
          '" height="1" width="',
          Strings.toString(width),
          '"/>'
        )
      );

      unchecked {
        pixelNum += width;
      }
    }
  }

      /// Converts 3 bytes (uint24) to a RGB hex string
  /// @param u the uint24 to convert to a color
  /// @return string the color in RBG hex format
  function _uint24ToColor(uint24 u) internal pure returns (string memory) {
    bytes memory b = new bytes(6);
    for (uint256 j = 0; j < 6; j++) {
      b[5 - j] = _getHexChar(uint8(uint24(u) & 0x0f));
      u = u >> 4;
    }
    return string(b);
  }

    /// Gets the ascii hex character for a uint8 (byte)
  /// @param char the uint8 to get the ascii hex character for
  /// @return bytes1 ascii hex character for the given uint8
  function _getHexChar(uint8 char) internal pure returns (bytes1) {
    return
      (char > 9)
        ? bytes1(char + 87) // ascii a-f
        : bytes1(char + 48); // ascii 0-9
  }

}