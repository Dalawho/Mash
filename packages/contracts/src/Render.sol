// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


import "openzeppelin/access/Ownable.sol";
import { Strings} from "openzeppelin/utils/Strings.sol";
import { Base64 } from "openzeppelin/utils/Base64.sol";
import 'ethier/utils/DynamicBuffer.sol';
import {SharedStructs as SSt} from "./sharedStructs.sol";
import "./interfaces/IIndelible.sol";

interface IMash {
    function getCollection(uint256 _collectionNr) external view returns(SSt.CollectionInfo memory);
    function getLayerNames(uint256 collectionNr) external view returns(string[] memory);
}

contract Render is Ownable, SSt {
    using Strings for uint256;
    using DynamicBuffer for bytes;

    uint256 public constant MAX_LAYERS = 7; 

    IMash public mash;

    uint24[7] colors = [0xe1d7d5, 0xfbe3ab, 0x72969e, 0xd51e29, 0x174f87, 0x2afd2f, 0x621b62];

    //constructor() {}

    ////////////////////////  Setters /////////////////////////////////

    function setMash( address _newMash) public onlyOwner {
        mash = IMash(_newMash);
    }

    ////////////////////////  IIndelible functions /////////////////////////////////

    function getTraitDetails(address _collection, uint8 layerId, uint8 traitId) public view returns(IIndelible.Trait memory) {
        return IIndelible(_collection).traitDetails(layerId, traitId);
    }

    function getTraitData(address _collection, uint8 _layerId, uint8 _traitId) public view returns(bytes memory) {
        return bytes(IIndelible(_collection).traitData(_layerId, _traitId));
    }

    function getCollectionName(uint256 _collectionNr) public view returns(string memory out) {
        (out,,,,,,) = IIndelible(mash.getCollection(_collectionNr).collection).contractData();
    }

    ////////////////////////  TokenURI and preview /////////////////////////////////

    function tokenURI(uint256 tokenId, LayerStruct[MAX_LAYERS] memory layerInfo, CollectionInfo[MAX_LAYERS] memory _collections) external view returns (string memory) { 
        uint8 numberOfLayers = 0;
        string[MAX_LAYERS] memory collectionNames;
        IIndelible.Trait[MAX_LAYERS] memory traitNames;
        for(uint256 i = 0; i < layerInfo.length; i++) {
            if(layerInfo[i].collection == 0) continue;
            //console.log(layerInfo[i].collection);
            //_collections[i] = mash.getCollection(layerInfo[i].collection);
            (collectionNames[i],,,,,,) = IIndelible(_collections[i].collection).contractData();
            traitNames[i] = getTraitDetails(_collections[i].collection, layerInfo[i].layerId, layerInfo[i].traitId);
            numberOfLayers++; 
        }
        string memory _outString = string.concat('data:application/json,', '{', '"name" : "Indelible Mashup #' , Strings.toString(tokenId), '", ',
            '"description" : "What Is This, a Crossover Episode?"');
        
        _outString = string.concat(_outString, ',"attributes":[');
        string[] memory layerNames; 
        for(uint8 i = 0; i < layerInfo.length; i++) {
            if(layerInfo[i].collection == 0) continue;
            layerNames = mash.getLayerNames(layerInfo[i].collection);
            if(i > 0) _outString = string.concat(_outString,',');
              _outString = string.concat(
              _outString,
             '{"trait_type":"',layerNames[layerInfo[i].layerId], '","value":"', traitNames[i].name,' (from ', collectionNames[i] , ')"}'
             );
        }

        _outString = string.concat(_outString, ']');

        if(numberOfLayers != 0) {
            _outString = string.concat(_outString,',"image": "data:image/svg+xml;base64,',
                Base64.encode(_drawTraits(layerInfo, _collections, traitNames)), '"');
        }
        _outString = string.concat(_outString,'}');
        return _outString; 
    }

    function previewCollage(LayerStruct[MAX_LAYERS] memory layerInfo) external view returns(string memory) {
        uint8 numberOfLayers = 0;
        CollectionInfo[MAX_LAYERS] memory _collections;
        IIndelible.Trait[MAX_LAYERS] memory traitNames;
        for(uint256 i = 0; i < layerInfo.length; i++) {
            if(layerInfo[i].collection == 0) continue;
            _collections[i] = mash.getCollection(layerInfo[i].collection);
            traitNames[i] = getTraitDetails(_collections[i].collection, layerInfo[i].layerId, layerInfo[i].traitId);
            ++numberOfLayers;
        }
        return string(_drawTraits(layerInfo, _collections, traitNames));
    }

    function getSVGForTrait(uint8 _collectionId, uint8 _layerId, uint8 _traitId) external view returns (string memory) {
        bytes memory buffer = DynamicBuffer.allocate(2**18);
        CollectionInfo memory _collectionInfo = mash.getCollection(_collectionId);
        bytes memory _traitData = getTraitData(_collectionInfo.collection, _layerId, _traitId);
        IIndelible.Trait memory _traitDetails = getTraitDetails(_collectionInfo.collection, _layerId, _traitId);
        buffer.appendSafe(bytes(string.concat('<image width="100%" height="100%" href="data:', _traitDetails.mimetype , ';base64,'))); //add the gif/png selector
        buffer.appendSafe(bytes(Base64.encode(_traitData)));
        buffer.appendSafe(bytes('"/>'));
        buffer.appendSafe('<style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>');
        return string(abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 ', Strings.toString(_collectionInfo.xSize), ' ', Strings.toString(_collectionInfo.ySize),'" width="1200" height="1200"> ', buffer));
    }

    ////////////////////////  SVG functions /////////////////////////////////

    function _drawTraits(LayerStruct[MAX_LAYERS] memory _layerInfo, CollectionInfo[MAX_LAYERS] memory _collections, IIndelible.Trait[MAX_LAYERS] memory traitNames) internal view returns(bytes memory) {
            bytes memory buffer = DynamicBuffer.allocate(2**18);
            //buffer.appendSafe(bytes(string.concat('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" viewBox="0 0 ', Strings.toString(height), ' ', Strings.toString(width),'" width="',Strings.toString(height*5),'" height="',Strings.toString(width*5),'"> ')));
            int256 height = int256(uint256(_collections[0].xSize*_layerInfo[0].scale));
            int256 width = int256(uint256(_collections[0].ySize*_layerInfo[0].scale));
            if(_layerInfo[0].background != 0) {
                buffer.appendSafe(bytes(string.concat('<rect width="100%" height="100%" fill="#', bytes2hex(colors[_layerInfo[0].background-1]) ,'" />')));
            }
            for(uint256 i = 0; i < _layerInfo.length; i++) {
                if(_layerInfo[i].collection == 0) continue;
                _renderImg(_layerInfo[i], _collections[i], traitNames[i], buffer);
                if(!_layerInfo[0].pfpRender) { 
                    if(int256(uint256(_collections[i].ySize*_layerInfo[i].scale))+_layerInfo[i].yOffset > height) height = int256(uint256(_collections[i].ySize*_layerInfo[i].scale))+_layerInfo[i].yOffset;
                    if(int256(uint256(_collections[i].xSize*_layerInfo[i].scale))+_layerInfo[i].xOffset > width) width = int256(uint256(_collections[i].xSize*_layerInfo[i].scale))+_layerInfo[i].xOffset;
                }
            }
            buffer.appendSafe('<style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>');
            return abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 ', Strings.toString(uint256(width)), ' ', Strings.toString(uint256(height)),'" width="',Strings.toString(uint256(width)*20),'" height="',Strings.toString(uint256(height)*20),'"> ', buffer);
    }

    function _renderImg(LayerStruct memory _currentLayer, CollectionInfo memory _currentCollection, IIndelible.Trait memory traitNames, bytes memory buffer) private view {
        //currently only renders as PNG this should also include gif! 
        bytes memory _traitData = getTraitData(_currentCollection.collection, _currentLayer.layerId, _currentLayer.traitId);
        buffer.appendSafe(bytes(string.concat('<image x="', int8ToString(_currentLayer.xOffset), '" y="', int8ToString(_currentLayer.yOffset),'" width="', Strings.toString(_currentCollection.xSize*_currentLayer.scale), '" height="', Strings.toString(_currentCollection.ySize*_currentLayer.scale),
         '" href="data:', traitNames.mimetype , ';base64,'))); //add the gif/png selector
        buffer.appendSafe(bytes(Base64.encode(_traitData)));
        buffer.appendSafe(bytes('"/>'));
    }

    function int8ToString(int8 num) public pure returns (string memory) {
        return num < 0 ? string.concat("-", Strings.toString(uint8(-1 * num) )): Strings.toString(uint8(num));
    }

    function bytes2hex(uint24 u) internal pure returns (string memory) {
    bytes memory b = new bytes(6);
    for (uint256 j = 0; j < 6; j++) {
      b[5 - j] = _getHexChar(uint8(uint24(u) & 0x0f));
      u = u >> 4;
    }
    return string(b);
  }

    function _getHexChar(uint8 char) internal pure returns (bytes1) {
    return
      (char > 9)
        ? bytes1(char + 87) // ascii a-f
        : bytes1(char + 48); // ascii 0-9
  }
}
