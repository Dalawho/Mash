// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import { Strings} from "openzeppelin/utils/Strings.sol";
import { DynamicBuffer } from 'ethier/utils/DynamicBuffer.sol';
import { Base64 } from "solady/utils/Base64.sol";
import "./interfaces/IIndelible.sol";
import {IGenericRender} from "./interfaces/IGenericRender.sol";
// import "forge-std/console.sol";

interface ICrypToadzMetadata {
    function getMetadata(uint256 tokenId) external view returns (uint8[] memory metadata);
}

interface ICrypToadzStrings {
    function getString(uint8 key) external view returns (string memory);
}

interface ICrypToadzBuilder {
  struct GIF {
    uint32 frameCount;
    GIFFrame[] frames;
    uint16 width;
    uint16 height;
  }
  struct GIFFrame {
      uint32[] buffer;
      uint16 delay;
      uint16 width;
      uint16 height;
  }
    function getImage(uint8[] memory metadata, uint256 tokenId) external view returns (GIF memory gif);
    function getImage(uint8[] memory metadata) external view returns (GIF memory gif);
}

interface ICrypToadzCustomImages {
    function isCustomImage(uint256 tokenId) external view returns (bool);
    function getCustomImage(uint256 tokenId) external view returns (bytes memory buffer);
}

interface ICrypToadzCustomAnimations {
    function isCustomAnimation(uint256 tokenId) external view returns (bool);
    function getCustomAnimation(uint256 tokenId) external view returns (bytes memory buffer);
}

contract ToadzRender is IGenericRender {
    using DynamicBuffer for bytes;

    bytes private constant PNG_URI_PREFIX = "data:image/png;base64,";
    bytes private constant GIF_URI_PREFIX = "data:image/gif;base64,";
    bytes private constant SVG_URI_PREFIX = "data:image/svg+xml;base64,";

    ICrypToadzMetadata metadata = ICrypToadzMetadata(0x317aD381543Ec87DD9341Ee123a5E4e87d4dc495); 
    ICrypToadzBuilder builder = ICrypToadzBuilder(0xB982741Fa2f6727e6c355E78574212C0d59e6768);
    ICrypToadzCustomImages customImages = ICrypToadzCustomImages(0x30730e1978CD7B32D858734c322fB1fFA8ff854f ); 
    ICrypToadzCustomAnimations customAnimations = ICrypToadzCustomAnimations(0x5aD2Abcbc10bD3b04D4Cfbf1089AcF0FCeD67642 );
    ICrypToadzStrings toadStrings = ICrypToadzStrings(0xE79BA77C0B35636D36A2aB8A93426fAF98686B7e);

    error TraitDetailsError();
    error NothingToShow();
    error CustomAnimation();

    function getTraitDetails(uint8 _layerId, uint8 _traitId) external view returns(IIndelible.Trait memory){
        return IIndelible.Trait(toadStrings.getString(getTraitNr(_layerId, _traitId)) , "image/svg+xml");
    }


    /*@dev The following serves as a guideline for forming the input metadata buffer:
         - The array must be between 2 and 7 elements in length
         - The first byte must be `119` (Short) or `120` (Tall)
         - The second byte must be between 0 and 16, and defines the Background         
         - The third byte must be between 17 and 50, and defines the Body
         - The next (up to 5) bytes must define traits in this order: 
           Mouth: between 121 and 139
           Head: between 51 and  104
           Eyes: between 139 and 170
           Clothes: between 246 and clothes 248
           Accessory II: between 104 and 111
           Accessory I: between 237 and 245
         - Trait values can be determined by checking comments in `CrypToadzStrings.sol`
         - The last byte defines the number of traits, based on this look-up table:
           | # Traits | Value |
           | -------- | ----- |
           |        2 |   114 |
           |        3 |   116 |
           |        4 |   112 |
           |        5 |   113 |
           |        6 |   115 |
           |        7 |   118 |
    */
    function getTraitData(uint8 _layerId, uint8 _traitId) external view returns(bytes memory){
        uint8[] memory meta = getMeta(_layerId, _traitId);
        ICrypToadzBuilder.GIF memory data = builder.getImage(meta);
        bytes memory buffer = DynamicBuffer.allocate(2**18);
        buffer.appendSafe(abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" viewBox="0 0 36 36" width="360" height="360">'));
        _writeSVGPixels(data.frames[0].buffer, buffer);
        buffer.appendSafe('</svg>');
        if(buffer.length == 134) revert NothingToShow();
        return buffer;
    }

    function getMeta(uint8 _layerId, uint8 _traitId) public pure returns(uint8[] memory) {
      uint8[] memory meta = new uint8[](2);
      meta[0] = _layerId < 8 ? 119 : 120;
      meta[1] = getTraitNr(_layerId, _traitId);
      return meta;
    }

    function getTraitNr(uint8 _layerId, uint8 _traitId) public pure returns(uint8 ) {
      uint8[8] memory start = [0, 17, 121, 51, 139, 245, 104, 237];
      uint8[8] memory end = [16, 50, 137, 103, 167, 248, 111, 244]; 
      uint8 _correctedLayerId = _layerId / 8 > 0 ? _layerId - 7 : _layerId;
      if(_traitId + start[_correctedLayerId] > end[_correctedLayerId]) revert TraitDetailsError();
      return _traitId + start[_correctedLayerId];
    }

    function getCollectionName() external pure returns(string memory){
        return "CrypToadz";
    }

    function getToken(uint256 _tokenId) external view returns(string memory) {
    uint8[] memory meta = metadata.getMetadata(_tokenId);
    meta[1] = 0;
    uint8[] memory newMeta = new uint8[](meta.length-1);
    newMeta[0] = meta[0];
    for(uint i = 1; i < newMeta.length; i++) {
      newMeta[i] = meta[i+1];
    }
    return (_getImageURI(_tokenId, newMeta));
    }

    function _getImageURI(uint256 tokenId, uint8[] memory meta)
        private
        view
        returns (string memory)
    {
        if (customImages.isCustomImage(tokenId)) {
            bytes memory customImage = customImages.getCustomImage(tokenId);
            return string(
                abi.encodePacked(
                    PNG_URI_PREFIX,
                    Base64.encode(customImage)
                )
            );
        }
        if (customAnimations.isCustomAnimation(tokenId)) {
          revert CustomAnimation();
            // bytes memory customAnimation = customAnimations.getCustomAnimation(
            //     tokenId
            // );
            // return string(
            //     abi.encodePacked(
            //         GIF_URI_PREFIX,
            //         Base64.encode(customAnimation)
            //     )
            // );
        }
        
        ICrypToadzBuilder.GIF memory data = builder.getImage(meta);
        bytes memory buffer = DynamicBuffer.allocate(2**18);
        buffer.appendSafe(abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" viewBox="0 0 36 36" width="360" height="360">'));
        _writeSVGPixels(data.frames[0].buffer, buffer);
        buffer.appendSafe('</svg>');
        return string.concat("data:image/svg+xml;base64,", Base64.encode(buffer));
        //return string(buffer);
    }

  function _writeSVGPixels(uint32[] memory data, bytes memory buffer)
    public
    pure
  {
    bytes4 colorbytes;
    uint256 width;
    uint256 pixelNum = 0;
    uint256 imageWidth = 36;
    uint256 xLoc;
    uint256 yLoc;

    // Write every pixel into the buffer
    while (pixelNum < data.length) {
        // so we should start with the pixels that are left botom
        colorbytes = bytes4(data[pixelNum]);
        //only skip if background color (query wiht one coloer)
        if (colorbytes == bytes4(0)) {
            pixelNum++;
            continue;
        }

      width = 1;
      while ((pixelNum + width) % imageWidth != 0) {
        if (colorbytes == bytes4(data[pixelNum+width]) ) {
          width++;
        } else break;
      }

    xLoc = ((pixelNum) % imageWidth);
    yLoc = (pixelNum / imageWidth);

      buffer.appendSafe(
        abi.encodePacked(
          '<rect fill="#',
          _invertUint32ToColor(uint32(colorbytes)),
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

    /// Converts 4 bytes (uint32) to a RGBA hex string
  /// @param u the uint32 to convert to a color
  /// @return bytes8 the color in RBGA hex format
  function _invertUint32ToColor(uint32 u) internal pure returns (string memory) {
    bytes memory b = new bytes(8);
    for (uint256 j = 0; j < 6; j = j+2) {
      b[5 - j] = _getHexChar(uint8(uint32(u) & 0x0f));
      u = u >> 4;
      b[5 - (j+1)] = _getHexChar(uint8(uint32(u) & 0x0f));
      u = u >> 4;
    }
    b[6] = _getHexChar(uint8(uint32(u) & 0x0f));
    u = u >> 4;
    b[7] = _getHexChar(uint8(uint32(u) & 0x0f));
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