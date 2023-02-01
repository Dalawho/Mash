// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import { Strings} from "openzeppelin/utils/Strings.sol";
import {DynamicBuffer} from 'ethier/utils/DynamicBuffer.sol';
import { RawData} from 'ethier/utils/RawData.sol';
import { Rectangle} from 'ethier/utils/Image.sol';
import "./interfaces/IIndelible.sol";
import {IGenericRender} from "./interfaces/IGenericRender.sol";

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

interface IAssestore {
        function loadLayer(uint8 layerType, uint256 layerID)
        external
        view
        returns (bytes memory);
}

contract MoonRender is IGenericRender {
    using DynamicBuffer for bytes;
    using RawData for bytes;
    //using BytesLib for bytes;

    IAssemble assembler = IAssemble(0xCc80f29a7DB70d727a666AE46Cf4CC3179514368); 
    IAssestore assetStorageManger = IAssestore(0xEDe24B4988cb64cC07fB72fF8AE71Bd8bB031b70);

    function getTraitDetails(uint8 _layerId, uint8 _traitId) external view returns(IIndelible.Trait memory){
        uint8[] memory temp = new uint8[](7);
        temp[_layerId] = _traitId+1;
        IAssemble.Attribute[] memory attributes = assembler.assembleAttributes(IAssemble.Features(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6]));
        string memory out;
        for(uint256 i; i< attributes.length; ++i) {
            out = i == 0 ? string.concat(attributes[i].name, ": ", attributes[i].value) : string.concat(out, ", " , attributes[i].name, ": ", attributes[i].value);
        }
        return IIndelible.Trait(out, "image/svg+xml");
    }

    function getTraitData(uint8 _layerId, uint8 _traitId) external view returns(bytes memory){

        bytes memory buffer = DynamicBuffer.allocate(2**18);
        buffer.appendSafe(abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" viewBox="0 0 42 42" width="42" height="42">'));
        if(_layerId == 0) {
            bytes memory data = assembler.assembleArtwork(IAssemble.Features(_traitId+1,0,0,0,0,0,0), IAssemble.Mutators(0));
            _writeBackgroundPixels(data, buffer);
        } 
        else {
            (bytes memory rawData, ) = assetStorageManger.loadLayer(_layerId - 1, _traitId).popByteFront();
            (bytes memory data, bytes4 rect_) = rawData.popDWORDFront();
            Rectangle memory rect = Rectangle({
                xMin: uint8(bytes1(rect_)),
                yMin: uint8(bytes1(rect_ << 8)),
                xMax: uint8(bytes1(rect_ << 16)),
                yMax: uint8(bytes1(rect_ << 24))
            });
            _writeSVGPixels(data, rect, buffer);
        }
        
        buffer.appendSafe('</svg>');
        return buffer;
    }

    function getCollectionName() external pure returns(string memory){
        return "Moonbirds";
    }

    function _writeBackgroundPixels(bytes memory data, bytes memory buffer)
    public
    pure
  {
    bytes3 colorbytes = bytes3(abi.encodePacked(data[5291],data[5291-1],data[5291-2]));
      buffer.appendSafe(
        abi.encodePacked(
          '<rect fill="#',
          _uint24ToColor(uint24(colorbytes)),
          '" height="100%" width="100%"/>')
      );
    }

  function _writeSVGPixels(bytes memory data, Rectangle memory rect, bytes memory buffer)
    public
    pure
  {
    bytes4 colorbytes;
    uint256 width;
    uint256 pixelNum;
    uint256 imageWidth = rect.xMax - rect.xMin;
    uint256 dataMax = data.length-1;
    uint256 xLoc;
    uint256 yLoc;

    // Write every pixel into the buffer
    while (pixelNum < data.length / 4) {
        // so we should start with the pixels that are left botom
        colorbytes = bytes4(abi.encodePacked(data[dataMax-pixelNum*4],data[dataMax-pixelNum*4-1],data[dataMax-pixelNum*4-2], data[dataMax-pixelNum*4-3]));
        //only skip if background color (query wiht one coloer)
        if (colorbytes == bytes4(0)) {
            pixelNum++;
            continue;
        }

      // Calculate the width of a continuous rect with the same color

              // Calculate the width of a continuous rect with the same color
      width = 1;
      while ((pixelNum + width) % imageWidth != 0) {
        if (colorbytes == bytes4(abi.encodePacked(data[dataMax-pixelNum*4-width*4],data[dataMax-pixelNum*4-1-width*4],data[dataMax-pixelNum*4-2-width*4],data[dataMax-pixelNum*4-3-width*4])) ) {
          width++;
        } else break;
      }

    xLoc = imageWidth - ((pixelNum+width-1) % imageWidth) + rect.xMin;
    yLoc = (pixelNum / imageWidth) + (42-rect.yMax);

      buffer.appendSafe(
        abi.encodePacked(
          '<rect fill="#',
          _uint32ToColor(uint32(colorbytes)),
          '" x="',
          Strings.toString(xLoc),
          '" y="',
          Strings.toString(yLoc),
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

    /// Converts 4 bytes (uint32) to a RGBA hex string
  /// @param u the uint32 to convert to a color
  /// @return bytes8 the color in RBGA hex format
  function _uint32ToColor(uint32 u) internal pure returns (string memory) {
    bytes memory b = new bytes(8);
    for (uint256 j = 0; j < 8; j++) {
      b[7 - j] = _getHexChar(uint8(uint32(u) & 0x0f));
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