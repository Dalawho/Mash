import parse from 'html-react-parser';
import type { NextPage } from "next";
import React, { useEffect,useState, useCallback} from "react";
import Select from 'react-select';
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { BuyAndMintButton } from "../BuyAndMintButton";
import GetContracts from "../GetContracts";
import GetTraits from "../GetTraits";
import GetLayers from "../GetLayers";

import { LocationForm, Locations } from "../Location";
import Panel from "../Panel2";
import { customStyles } from "../formStyles";
import { BoxContainer } from "../BoxContainer2";
import { GetSVG } from "../GetSVG"
import next from 'next';
import { Trait } from '../sharedInterfaces';
import TraitTable from "../TraitTable";
import { useIsMounted } from '../useIsMounted';

const HomePage:NextPage = () => {
    
  const [locations, setLocations] = useState<Locations[]>([]);//[{ id: 0, name:"", contract: 0, layerId: 0, traitId: 0, scale: 1, x: 0, y: 0}]) ;
  //const [SVG, setSVG] = useState<string | null>(null);
  const [bytes, setBytes] = useState(Array.from({length: 7}, () => "0x000000000000"));
  const [pfpRender, setPfpRender] = useState(true);
  
  interface Selector{
    collection: number,
    layer: string,
  }

  interface SelectTrait {
    label: string;
    value: number;
  }

  const [selectedValue, setSelectedValue] = useState<Selector>({collection: 0, layer: ""});

  const handleLocationChange = (coord:string,e:number, index:number) => {
    const nextLocs = locations.map(item => {
      if (item.id === index) {
          return {...item, [coord]: e};
      }
      return item;
    });
    setLocations(nextLocs);
    const nextBytes = nextLocs.map((item) => encodeLayer(item, pfpRender));
    setBytes(nextBytes.concat(Array.from({length: 7-nextBytes.length}, () => "0x000000000000")));
  }

  const handleOrderChange = (nextLocs: Locations[]) => {
    setLocations(nextLocs);
    const nextBytes = nextLocs.map((item) => encodeLayer(item, pfpRender));
    setBytes(nextBytes.concat(Array.from({length: 7-nextBytes.length}, () => "0x000000000000")));
  }

  const handlePiecesId = (trait: Trait) => {
    if(locations.length >= 7) return;
    const maxId = locations.reduce((max, obj) => obj.id > max ? obj.id : max, 0);
    const nextLocs = [...locations, {id: maxId+1, name: trait.name, contract: trait.contract, layerId: trait.layerNr, traitId: trait.traitNr, scale: 1, x: 0, y: 0}]
    setLocations(nextLocs);
    const nextBytes = nextLocs.map((item) => encodeLayer(item, pfpRender));
    setBytes(nextBytes.concat(Array.from({length: 7-nextBytes.length}, () => "0x000000000000")));
  }

  const handleFilter = (filter: string , e?: SelectTrait | unknown | null) => {
    if(e)  {
      const i: SelectTrait = e as SelectTrait;
      if(filter === "layer") {
        setSelectedValue({...selectedValue, [filter]: i.label.toString() === "None" ? "" : i.label.toString()}) }

      if(filter === "collection") {
        setSelectedValue({...selectedValue, [filter]: i.value}) }
      }
  }

  const isMounted = useIsMounted();

  const encodeLayer = (layer: Locations, pfpRender: Boolean) => {
    let pfpRenderByte = ((pfpRender ? 1 : 0) << 7) | layer.scale;
    let array = new Uint8Array([layer.contract, layer.layerId, layer.traitId, pfpRenderByte, layer.x, layer.y]);
    return "0x" + array.reduce((output, elem) => output + elem.toString(16).padStart(2, '0'), '');
}

    const SVG = GetSVG({ inBytes: bytes});
    const contracts = GetContracts();
    const traits = GetTraits();
    const layers = GetLayers();

    const filteredTraits = traits?.filter(trait => {
      if(selectedValue.collection === 0 && selectedValue.layer === "None") { return traits; }
      if(selectedValue.collection === 0) { return trait.layer === selectedValue.layer; }
      if(selectedValue.layer === "None") { return trait.contract == selectedValue.collection}
      return trait.contract === selectedValue.collection && trait.layer === selectedValue.layer;
    });

    const filteredLayers = layers?.filter(layer => {
       if(selectedValue.collection === 0) { return layers; }
      return layer.contract === selectedValue.collection;
    });

    const placeholder = [{value: 0, label: "None", maxSupply: 0, minted: 0}]

    return(
      <div className="bg-amber-100">
        <div className="flex flex-col bg-amber-100 text-slate-800 text-2xl font-proggy" >
          <nav className='m-4 flex flex-row justify-end'>
          <ConnectButton showBalance={false} accountStatus="address"/>
        </nav>
            <div className="flex flex-col gap-4 items-center p-8 mx-auto">
              <div>
                <h1 className='font-bold text-3xl'>
                  What is this, a crossover episode?
                </h1>
                <h2>
                
                </h2>
              </div>
                <div className="flex flex-row space-x-2">
                {(isMounted && SVG ? parse(SVG.toString()) : null) ?? "??"}
                {/* {SVG ? parse(SVG.toString()) : "No Layers added yet."} */}
              <div>
                <h1>Nr. - Name - scale - xOffset - yOffset - Remove</h1>
                <BoxContainer boxes={locations} setBoxes={handleOrderChange} handleLocationChange={handleLocationChange} />
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
              <div>
                <TraitTable selectedValue={selectedValue} handlePiecesId={handlePiecesId} />
              </div>
              
                </div>
                </div>
                </div>
          
    );
};

export default HomePage;
