// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


import "openzeppelin-upgradable/access/OwnableUpgradeable.sol";
import {StringsUpgradeable as Strings} from "openzeppelin-upgradable/utils/StringsUpgradeable.sol";
import {Base64Upgradeable as Base64} from "openzeppelin-upgradable/utils/Base64Upgradeable.sol";
import 'ethier/utils/DynamicBuffer.sol';
import "openzeppelin-upgradable/proxy/utils/Initializable.sol";
import {SharedStructs as SSt} from "./sharedStructs.sol";
import "./interfaces/IIndelible.sol";
import "forge-std/console.sol";

interface IMash {
    function getCollection(uint256 _collectionNr) external view returns(SSt.CollectionInfo memory);
    function getLayerNames(uint256 collectionNr) external view returns(string[] memory);
}

contract Render is Initializable, OwnableUpgradeable, SSt {
    using Strings for uint256;
    using Strings for uint8;
    using DynamicBuffer for bytes;

    uint256 public constant MAX_LAYERS = 7; 

    IMash public mash;

    function initialize() initializer public {
        __Ownable_init();
    }


    ////////////////////////  Setters /////////////////////////////////


    function setMash( address _newMash) public onlyOwner {
        mash = IMash(_newMash);
    }

    ////////////////////////  TokenURI /////////////////////////////////

    function getTraitDetails(address _collection, uint8 layerId, uint8 traitId) public view returns(IIndelible.Trait memory) {
        return IIndelible(_collection).traitDetails(layerId, traitId);
    }

    function tokenURI(uint256 tokenId, LayerStruct[MAX_LAYERS] memory layerInfo, CollectionInfo[MAX_LAYERS] memory _collections) external view returns (string memory) { 
        uint8 numberOfLayers = 0;
        string[MAX_LAYERS] memory collectionNames;
        IIndelible.Trait[MAX_LAYERS] memory traitNames;
        for(uint256 i = 0; i < layerInfo.length; i++) {
            if(layerInfo[i].collection == 0) continue;
            console.log(layerInfo[i].collection);
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
             //'{"trait_type":"Layer #', Strings.toString(i), '","value":"', traitNames[i].name,' (from ', collectionNames[i] , ')"}'
             '{"trait_type":"',layerNames[layerInfo[i].layerId], '","value":"', traitNames[i].name,' (from ', collectionNames[i] , ')"}'
             
             //'{"trait_type":"Layer #', Strings.toString(i), ' creator","value":"', string(abi.encodePacked(_layerInfos[i].creator)),'"},'
            );
        }

        _outString = string.concat(_outString, ']');

        if(numberOfLayers != 0) {
            _outString = string.concat(_outString,',"image": "data:image/svg+xml;base64,',
                Base64.encode(_drawTraits(layerInfo, _collections)), '"');
        }
        _outString = string.concat(_outString,'}');
        return _outString; 
    }

    function previewCollage(LayerStruct[MAX_LAYERS] memory layerInfo) external view returns(string memory) {
        uint8 numberOfLayers = 0;
        CollectionInfo[MAX_LAYERS] memory _collections;
        for(uint256 i = 0; i < layerInfo.length; i++) {
            _collections[i] = mash.getCollection(layerInfo[i].collection);
            if(_collections[i].collection != address(0)) numberOfLayers++; 
        }
        return string(_drawTraits(layerInfo, _collections));
    }

    ////////////////////////  Full SVG functions /////////////////////////////////

    function _drawTraits(LayerStruct[MAX_LAYERS] memory _layerInfo, CollectionInfo[MAX_LAYERS] memory _collections) internal view returns(bytes memory) {
            bytes memory buffer = DynamicBuffer.allocate(2**18);
            //buffer.appendSafe(bytes(string.concat('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" viewBox="0 0 ', Strings.toString(height), ' ', Strings.toString(width),'" width="',Strings.toString(height*5),'" height="',Strings.toString(width*5),'"> ')));
            uint8 height = _collections[0].xSize*_layerInfo[0].scale;
            uint8 width = _collections[0].ySize*_layerInfo[0].scale;
            for(uint256 i = 0; i < _layerInfo.length; i++) {
                if(_layerInfo[i].collection == 0) continue;
                _renderImg(_layerInfo[i], _collections[i], buffer);
                if(!_layerInfo[0].pfpRender) { 
                    if(_collections[i].ySize*_layerInfo[i].scale+_layerInfo[i].yOffset > height) height = _collections[i].ySize*_layerInfo[i].scale+_layerInfo[i].yOffset;
                    if(_collections[i].xSize*_layerInfo[i].scale+_layerInfo[i].xOffset > width) width = _collections[i].xSize*_layerInfo[i].scale+_layerInfo[i].xOffset;
                }
            }
            buffer.appendSafe('<style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>');
            return abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 ', Strings.toString(width), ' ', Strings.toString(height),'" width="',Strings.toString(uint256(width)*10),'" height="',Strings.toString(uint256(height)*10),'"> ', buffer);
    }

    function _renderImg(LayerStruct memory _currentLayer, CollectionInfo memory _currentCollection, bytes memory buffer) private view {
        bytes memory _traitData = bytes(IIndelible(_currentCollection.collection).traitData(_currentLayer.layerId, _currentLayer.traitId));
        buffer.appendSafe(bytes(string.concat('<image x="', Strings.toString(_currentLayer.xOffset), '" y="', Strings.toString(_currentLayer.yOffset),'" width="', Strings.toString(_currentCollection.xSize*_currentLayer.scale), '" height="', Strings.toString(_currentCollection.ySize*_currentLayer.scale),
         '" href="data:image/', 'png' , ';base64,'))); //add the gif/png selector
        buffer.appendSafe(bytes(Base64.encode(_traitData)));
        buffer.appendSafe(bytes('"/>'));
    }

    // function _getOneSVG(Trait memory _currentTrait) internal view returns (bytes memory) {
    //     bytes memory buffer = DynamicBuffer.allocate(2**18);
    //     _renderImg(_currentTrait, LayerStruct(1,0,0,0), buffer);
    //     buffer.appendSafe('<style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>');
    //     return abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" id="pixel"  version="1.1" viewBox="0 0 ', Strings.toString(_currentTrait.xSize), ' ', Strings.toString(_currentTrait.ySize),'" width="',Strings.toString(uint256(_currentTrait.xSize)*10),'" height="',Strings.toString(uint256(_currentTrait.ySize)*10),'"> ', buffer);
    // }

    // function getSVGForBytes(bytes memory data, uint256 xSize, uint256 ySize, ImageType imageType) public pure returns(string memory) {
    //     bytes memory buffer = DynamicBuffer.allocate(2**18);
    //     buffer.appendSafe(bytes(string.concat('<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" id="pixel"  version="1.1" viewBox="0 0 ', Strings.toString(xSize), ' ', Strings.toString(ySize),'" width="',Strings.toString(uint256(xSize)*10),'" height="',Strings.toString(uint256(ySize)*10),'"> ')));
    //     buffer.appendSafe(bytes(string.concat('<image width="', Strings.toString(xSize), '" height="', Strings.toString(ySize),
    //     '" href="data:image/', imageType == ImageType.png ? 'png' : 'gif' , ';base64,'))); //iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAABlBMVEVHcEwAAACfKoRRAAAAAXRSTlMAQObYZgAAABtJREFUKM9jYBgFgxcoMLBAWR0MghhiowATAAAG1QDidu33BgAAAABJRU5ErkJggg==
    //     buffer.appendSafe(bytes(Base64.encode(data)));
    //     buffer.appendSafe(bytes('"/>'));
    //     buffer.appendSafe('<style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>');
    //     return string(buffer);
    // }
}
