import parse from 'html-react-parser';
import type { NextPage } from "next";
import React, { useEffect,useState} from "react";
import Select from 'react-select';
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { BuyAndMintButton } from "../BuyAndMintButton";
import GetContracts from "../GetContracts";
import GetTraits from "../GetTraits";
import GetLayers from "../GetLayers";

import { LocationForm, Locations } from "../Location";
import Panel from "../Panel";
import { customStyles } from "../formStyles";

const HomePage:NextPage = () => {
    
  const [locations, setLocations] = useState<Locations[]>([{ order:0, contract: 0, layerId: 0, traitId: 0, scale: 1, x: 0, y: 0}]) ;// (Array.from({length: 7}, () => ({ contract: 0, layerId: 0, traitId: 0, scale: 1, x: 0, y: 0})));
  const [SVG, setSVG] = useState<string | null>(null);
  const [bytes, setBytes] = useState(Array.from({length: 7}, () => ("0x000000000000")));
  
  interface Selector{
    collection: string,
    layer: string,
  }

  interface SelectTrait {
    label: string;
    value: number;
  }

  const [selectedValue, setSelectedValue] = useState<Selector>({collection: "0", layer: "None"});


  const handleLocationChange = (coord:string,e:number, index:number) => {
    const nextLocs = [...locations.slice(0, index), {...locations[index], [coord]: e} , ...locations.slice(index + 1)];
    const nextBytes = [...bytes.slice(0, index), getBytes(nextLocs[index]), ...bytes.slice(index + 1)];
    setLocations(nextLocs);
    setBytes(nextBytes);
  }

  const handlePiecesId = (id: number, layer: number) => {

    const nextLocs = [...locations.slice(0, layer-1), {...locations[layer], layerId: id}  , ...locations.slice(layer)]
    setLocations(nextLocs);

  }

  const handleFilter = (filter: string , e?: SelectTrait | unknown | null) => {
    if(e)  {
      const i: SelectTrait = e as SelectTrait;
      if(filter === "layer") {
        setSelectedValue({...selectedValue, [filter]: i.label.toString()}) }

      if(filter === "collection") {
        setSelectedValue({...selectedValue, [filter]: i.value.toString()}) }
      }
  }

  const handleLayerFilter = (layerNr: number) => {
    setSelectedValue({...selectedValue, collection: layerNr.toString()})
  }

  const getBytes = (loc: Locations) => {

    return "0x000000000000";
  }

  // useEffect( () => {
  //     const callData = async () => {
  //       //previewCollage(uint256 tokenId, uint8 layerNr, uint8 pieceId, uint8 xOffset, uint8 yOffset)
  //       if(pieceIds.some(element => element !== 0)) {
  //       const data = await collageContract.previewCollage( pieceIds, locations.map(object => object.scale), locations.map(object => object.x), locations.map(object => object.y) );
  //       setAnimalSVG(data);
  //       } else {
  //           setAnimalSVG(null);
  //       }
  //       }
  //       callData();
  //       if(pieces) {
  //           let tempPrice = 0;
  //           for(let i = 0; i < 4; i++) {
  //               //doublecheck this
  //               if(pieceIds[i] == 0) continue 
  //               console.log(pieceIds[i]-1);
  //               tempPrice += pieces[pieceIds[i]-1].price;
  //           }
  //           setPrice(tempPrice);
  //       }
  //   }, [pieceIds, locations]);

    const contracts = GetContracts();
    const traits = GetTraits();
    const layers = GetLayers();

    const filteredTraits = traits?.filter(trait => {
      if(selectedValue.collection === "0" && selectedValue.layer === "None") { return traits; }
      if(selectedValue.collection === "0") { return trait.layer === selectedValue.layer; }
      if(selectedValue.layer === "None") { return trait.contract == selectedValue.collection}
      return trait.contract === selectedValue.collection && trait.layer === selectedValue.layer;
    });

    const filteredLayers = layers?.filter(layer => {
      if(selectedValue.collection === "0") { return layers; }
      return layer.contract === selectedValue.collection;
    });


    const placeholder = [{value: 0, label: "None", maxSupply: 0, minted: 0}]

    return(
      <div className="bg-amber-100">
        <div className="flex flex-col bg-amber-100 text-slate-800 text-2xl font-proggy" >
        <ConnectButton showBalance={false} accountStatus="address"/>
            <div className="flex flex-col gap-4 items-center p-8 mx-auto">
              <div>
                <h1>Mint and Set</h1>
              </div>
                <div className="flex flex-row space-x-2">
              {SVG ? parse(SVG) : "No Layers added yet."}
              <div>
                <h1>Set location for</h1>
              {[0,1,2,3].map( (layerNr: number) => (
                  <div key={layerNr}>
                  <LocationForm loc={locations[0]} layerNr={layerNr} onChange={(coord:string,e:string) => handleLocationChange(coord, Number(e), layerNr-1)} />
                  </div>
                ))}
                <BuyAndMintButton inBytes={bytes} />
              </div>
              </div>
              <div className='flex flex-row space-x-3'>
                <h1>Filter by: </h1>
                <p>Collection </p>
                <Select styles={customStyles} options={contracts ? [placeholder[0], ...contracts] : placeholder } onChange={(newValue) => handleFilter("collection", newValue)}/>
                <p>Layer </p>
                <Select styles={customStyles} options={filteredLayers ? [placeholder[0], ...filteredLayers] : placeholder } onChange={(newValue) => handleFilter("layer", newValue)}/>
                
              </div>
              <h2>Select layers</h2>
              <div className="grid grid-cols-5">
                {filteredTraits?.map(panel => (
                    <Panel
                    key={panel.label}
                    id={panel.value}
                    picture={panel.tokenURI}
                    description={panel.label}
                    onClick={handlePiecesId}
                    />
                ))}
              </div>
              
                </div>
                </div>
                </div>
          
    );
};

export default HomePage;

/*
                {[0,1,2,3].map( (layerNr: number) => (
                  <div key={layerNr}>
                  <h1>Set {layerNr}</h1> 
                  <Select styles={customStyles} options={pieces ? pieces : placeholder } onChange={(newValue) => handlePiecesId(layerNr, newValue)}/>
                  <LocationForm loc={locations[layerNr]} onChange={(coord:string,e:string) => handleLocationChange(coord, Number(e), layerNr)} />
                  </div>
                ))}
*/