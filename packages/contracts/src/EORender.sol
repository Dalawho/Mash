// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import { Strings } from "openzeppelin/utils/Strings.sol";
import {DynamicBuffer} from 'ethier/utils/DynamicBuffer.sol';
import "./interfaces/IIndelible.sol";
import {IGenericRender} from "./interfaces/IGenericRender.sol";

interface IEtherOrcsMetadataHandler {
    function getBodyName(uint8 id) external pure returns (string memory);
    function getHelmName(uint8 id) external pure returns (string memory);
    function getMainhandName(uint8 id) external pure returns (string memory);
    function getOffhandName(uint8 id) external pure returns (string memory);
    function header() external pure returns (string memory);
    function footer() external pure returns (string memory);
    function bodies(uint8) external pure returns (address);
    function helms(uint8) external pure returns (address);
    function mainhands(uint8) external pure returns (address);
    function offhands(uint8) external pure returns (address);
    function uniques(uint8) external pure returns (address);
}

contract EORender is IGenericRender {
    using DynamicBuffer for bytes;
    using Strings for uint8;
        //string arrays

    enum Part { body, helm, mainhand, offhand, unique }

    IEtherOrcsMetadataHandler eom = IEtherOrcsMetadataHandler(0xeA2977e88938561Dc633C560d0A170C91D90dA95);

    function getTraitDetails(uint8 _layerId, uint8 _traitId) external view returns(IIndelible.Trait memory){
        string memory traitName = 
            _layerId == 0 ? eom.getBodyName(_traitId)  :
            _layerId == 1 ? eom.getHelmName(_traitId)  :
            _layerId == 2 ? eom.getMainhandName(_traitId)  :
            _layerId == 3 ? eom.getOffhandName(_traitId) : "" ;
        return IIndelible.Trait(traitName, "image/svg+xml");
    }

    function getCollectionName() external pure returns(string memory){
        return "Ether Orcs Genesis";
    }

    function getTraitData(uint8 _layerId, uint8 _traitId) public view returns(bytes memory) {
        //uint8 body_, uint8 helm_, uint8 mainhand_, uint8 offhand_
        // it's a unique!
        if (_traitId > 40 && _layerId == 0) return abi.encodePacked(eom.header, get(Part.unique, _traitId), eom.footer);

        return abi.encodePacked(
            eom.header(),
            _layerId == 0 ? get(Part.body, _traitId) :
            _layerId == 1 ? get(Part.helm, _traitId)  : 
            _layerId == 2 ? get(Part.mainhand, _traitId ) :
            get(Part.offhand, _traitId ) ,
            eom.footer() );
    }

        function call(address source, bytes memory sig) internal view returns (string memory svg) {
        (bool succ, bytes memory ret)  = source.staticcall(sig);
        require(succ, "failed to get data");
        svg = abi.decode(ret, (string));
    }

       function get(Part part, uint8 id) internal view returns (string memory data_) {
        address source = 
            part == Part.body     ? eom.bodies(id)    :
            part == Part.helm     ? eom.helms(id)     :
            part == Part.mainhand ? eom.mainhands(id) :
            part == Part.offhand  ? eom.offhands(id)  : eom.uniques(id);

        data_ = wrapTag(call(source, getData(part, id)));
    }
    
    function wrapTag(string memory uri) internal pure returns (string memory) {
        return string(abi.encodePacked('<image x="1" y="1" width="60" height="60" image-rendering="pixelated" preserveAspectRatio="xMidYMid" xlink:href="data:image/png;base64,', uri, '"/>'));
    }

    function getData(Part part, uint8 id) internal pure returns (bytes memory data) {
        string memory s = string(abi.encodePacked(
            part == Part.body     ? "body"     :
            part == Part.helm     ? "helm"     :
            part == Part.mainhand ? "mainhand" :
            part == Part.offhand  ? "offhand"  : "unique",
            Strings.toString(id),
            "()"
        ));
        
        return abi.encodeWithSignature(s, "");
    }


    function getToken(uint256 _tokenId) external view returns(bytes memory) {
      return "";
    }


}