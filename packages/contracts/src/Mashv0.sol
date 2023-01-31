pragma solidity ^0.8.12;

// SPDX-License-Identifier: MIT
// Two storage slots for each 

import "openzeppelin-upgradable/access/OwnableUpgradeable.sol";

//import {StringsUpgradeable as Strings} from "openzeppelin-upgradable/utils/StringsUpgradeable.sol";
import "./ERC721G.sol";
import "./DefaultOperatorFiltererUpgradeable.sol";
import {SharedStructs as SSt} from "./sharedStructs.sol";
//import "forge-std/console.sol";

interface IRender {
    function tokenURI(uint256 tokenId, SSt.LayerStruct[7] memory layerIds, SSt.CollectionInfo[7] memory _collections) external view returns (string memory); 
    function previewCollage(SSt.LayerStruct[7] memory layerIds) external view returns(string memory);
}

contract Mashv0 is ERC721G, OwnableUpgradeable, DefaultOperatorFiltererUpgradeable {
    //using Strings for uint8;
    event MetadataUpdate(uint256 _tokenId);
    event ContractAdded(uint256 indexed contractNr, address indexed contractAddress, uint16 maxSupply);
    event MintedFrom(uint256 indexed contractNr);

    error MaxSupplyReached();
    error AllTokensMinted();
    error NoMoreLayersToBeMinted();
    error notTokenOwner();
    error payRightAmount();
    error mintNotStarted();

    IRender public render;
    uint256 public MINT_PRICE;
    uint256 public constant MAX_SUPPLY = 3_000; 
    bool public mintActive;

    mapping(uint256 => SSt.CollectionInfo) private collections; 
    mapping(uint256 => string[]) private layerNames; 
    
    uint256 private nextCollection;

    function initialize() initializer public {
        __ERC721G_init("IndelibleMash", "IM", 1);
        __Ownable_init();
        __DefaultOperatorFilterer_init();
        MINT_PRICE = 0.005 ether;
        nextCollection = 1; 
        mintActive = false;
    }

    //Add collection 

    function addCollection(CollectionInfo memory _newCollection, string[] memory _layersNames) public onlyOwner {
        collections[nextCollection] = _newCollection;
        layerNames[nextCollection] = _layersNames;
        emit ContractAdded(nextCollection, _newCollection.collection, _newCollection.maxSupply);
        ++nextCollection;
    }

    function getCollection(uint256 _collectionNr) public view returns(CollectionInfo memory) {
        return collections[_collectionNr];
    }

    function setMintActive() external {
        mintActive = true;
    }

    function changeLayer(uint256 tokenId, bytes6 layerInfo, uint256 layer, uint256 collection) external {
        if(msg.sender != _tokenData[tokenId].owner) revert notTokenOwner();
        //logic to get rid of the token 
        // CHECK IF it IS MORE GAS EFFICIENT TO LOAD ONCE AND WRITE EVERYTHING BACK? 
        if(collections[collection].minted + 1 > collections[collection].maxSupply) revert AllTokensMinted();
        ++collections[collection].minted;
        _tokenData[tokenId].layers[layer] = layerInfo;
        emit MetadataUpdate(tokenId);
    }

    function mintAndBuy(bytes6[MAX_LAYERS] calldata layerInfo) external payable {
        if(!mintActive) revert mintNotStarted();
        if(totalSupply() + 1 > MAX_SUPPLY) revert MaxSupplyReached();
        if(msg.value < MINT_PRICE) revert payRightAmount();

        // uint8 contractNr;

        // for(uint i; i < MAX_LAYERS; ++i) {
        //     contractNr = uint8(bytes1(layerInfo[i]));
        //     if(contractNr == 0) continue;
        //     if(collections[contractNr].minted + 1 > collections[contractNr].maxSupply) revert NoMoreLayersToBeMinted();
        //     ++collections[contractNr].minted;
        //     emit MintedFrom(contractNr);
        // }
        _mintAndSet(msg.sender, layerInfo);
    }

    ////////////////////////  Set external contract addresses /////////////////////////////////

    function setRender( address _newRender) public onlyOwner {
        render = IRender(_newRender);
    }

    function toggleOperatorFilter() external onlyOwner {
        isOperatorFilterEnabled = !isOperatorFilterEnabled;
    }

    ////////////////////////  TokenURI /////////////////////////////////

    function tokenURI(uint256 tokenId) override public view returns (string memory) { 
        LayerStruct[MAX_LAYERS] memory layerIds;
        CollectionInfo[MAX_LAYERS] memory _collections;
        for(uint256 i; i < MAX_LAYERS; ++i) {
            if( i == 0 ) layerIds[i] = decodeLayer(_tokenData[tokenId].layer1);
            if( i == 1 ) layerIds[i] = decodeLayer(_tokenData[tokenId].layer2);
            if( i > 1 ) layerIds[i] = decodeLayer(_tokenData[tokenId].layers[i-2]);
            if(layerIds[i].collection == 0) continue;
            _collections[i] = getCollection(layerIds[i].collection);
        }
        return render.tokenURI(tokenId, layerIds, _collections);
    }

    function getLayerNames(uint256 collectionNr) external view returns(string[] memory) {
        return layerNames[collectionNr];
    }

    function previewTokenCollage(uint256 tokenId, uint256 layerNr, LayerStruct memory _newLayer) external view returns (string memory) { 
        LayerStruct[MAX_LAYERS] memory _tokenLayers;
        for(uint256 i; i < MAX_LAYERS; ++i) {
            _tokenLayers[i] = decodeLayer(_tokenData[tokenId].layers[i]);
        }
        _tokenLayers[layerNr] = _newLayer;
        return render.previewCollage(_tokenLayers);
    }

    function previewCollage(bytes6[MAX_LAYERS] calldata layerInfo) external view returns (string memory) { 
        LayerStruct[MAX_LAYERS] memory _tokenLayers;
        for(uint256 i; i < MAX_LAYERS; ++i) {
            _tokenLayers[i] = decodeLayer(layerInfo[i]);
        }
        return render.previewCollage(_tokenLayers);
    }

    function decodeLayer(bytes6 array) public view returns (LayerStruct memory) {
        uint8 contractId = decodeContract(array);
        uint8 layerId = uint8(array[1]);
        uint8 traitId = uint8(array[2]);
        bool pfpRender = uint8(array[3] >> 7) == 1 ? true : false;
        uint8 scale = uint8(array[3] & 0x7f);
        int8 xOffset = int8(uint8(array[4]));
        int8 yOffset = int8(uint8(array[5]));
        //console.log("scale:", scale);
        //console.log(xOffset < 0 ? string.concat("-", Strings.toString(uint8(-1 * xOffset) )): Strings.toString(uint8(xOffset)));
        return LayerStruct(contractId, layerId, traitId, pfpRender, 0, scale, xOffset, yOffset);
    }

    function decodeContract(bytes6 array) public pure returns (uint8) {
        return uint8(array[0]);
    }

    function withdraw() external onlyOwner {
        // how should a withdraw function look? 
    }

    // Operatorfilter overrides ///

    function setApprovalForAll(address operator, bool approved) public override onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    function approve(address operator, uint256 tokenId) public override onlyAllowedOperatorApproval(operator) {
        super.approve(operator, tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
        public
        override
        onlyAllowedOperator(from)
    {
        super.safeTransferFrom(from, to, tokenId, data);
    }
}