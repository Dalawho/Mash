import { ConnectButton } from "@rainbow-me/rainbowkit";
import parse from 'html-react-parser';
import type { NextPage } from "next";
import Image from "next/image";
import React, { useEffect,useState} from "react";
import { GithubPicker } from "react-color";
import Select from 'react-select';
import { toast } from "react-toastify";

import { BoxContainer } from "../BoxContainer";
import { BuyAndMintButton } from "../BuyAndMintButton";
import ColorPicker from "../ColorPicker";
import { customStyles } from "../formStyles";
import GetContracts from "../GetContracts";
import { GetFullSVG } from '../GetFullSVG';
//import { GetSVG } from "../GetSVG";
import GetLayers from "../GetLayers";
import GetTraits from "../GetTraits";
import { Locations } from "../Location";
import { Trait } from '../SharedInterfaces';
import TraitTable from "../TraitTable";
import useDebounce from '../useDebounce';
import { useIsMounted } from '../useIsMounted';

interface Selector{
  collection: number,
  layer: string,
}

interface SelectTrait {
  label: string;
  value: number;
}

const HomePage:NextPage = () => {
    
  const [locations, setLocations] = useState<Locations[]>([]);//[{ id: 0, name:"", contract: 0, layerId: 0, traitId: 0, scale: 1, x: 0, y: 0}]) ;
  //const [SVG, setSVG] = useState<string | null>(null);
  const [bytes, setBytes] = useState(Array.from({length: 7}, () => "0x000000000000"));
  const [pfpRender, setPfpRender] = useState(true);
  const [selectedValue, setSelectedValue] = useState<Selector>({collection: 0, layer: ""});
  
  const colors = [{hex: "transparent", tailwind: "bg-[#00000000]"}, 
                  {hex: "#ff8b8b", tailwind: "bg-[#ff8b8b]"},
                  {hex: "#f2f890", tailwind: "bg-[#f2f890]"},
                  {hex: "#82ff82", tailwind: "bg-[#82ff82]"},
                  {hex: "#8bedff", tailwind: "bg-[#8bedff]"},
                  {hex: "#4731ff", tailwind: "bg-[#4731ff]"},
                  {hex: "#7551ff", tailwind: "bg-[#7551ff]"},
                  {hex: "#621b62", tailwind: "bg-[#621b62]"} ];

  const [selColor, setSelColor] = useState(colors[0]);

  const handleLocationChange = (coord:string,e:number, index:number) => {
    const nextLocs = locations.map(item => {
      if (item.id === index) {
          return {...item, [coord]: e};
      }
      return item;
    });
    setLocations(nextLocs);
  }

  const handleOrderChange = (nextLocs: Locations[]) => {
    setLocations(nextLocs);
  }

  const handlePiecesId = (trait: Trait) => {
    if(locations.length >= 7) {
      toast.error(`Max 7 layers, please remove some!`, {
       
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return;
    }
    const maxId = locations.reduce((max, obj) => obj.id > max ? obj.id : max, 0);
    const nextLocs = [...locations, {id: maxId+1, name: trait.name, contract: trait.contract, layerId: trait.layerNr, traitId: trait.traitNr, scale: 1, x: 0, y: 0, data: trait.data, mimeType: trait.mimeType}]
    setLocations(nextLocs);
    toast(`Added ${trait.name} as layer ${nextLocs.length}!`, {
      
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const handleFilter = (filter: string , e?: SelectTrait | unknown | null) => {
    if(e)  {
      const i: SelectTrait = e as SelectTrait;
      if(filter === "layer") {
        setSelectedValue({...selectedValue, [filter]: i.label.toString() === "None" ? "" : i.label.toString()}) }

      if(filter === "collection") {
        setSelectedValue({layer: "", collection: i.value}) }
      }
  }

  const isMounted = useIsMounted();

  const placeSVG = '<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 32 32" width="320" height="320"><style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>';

  const encodeLayer = (layer: Locations, pfpRender: boolean) => {
    const pfpRenderByte = ((pfpRender ? 1 : 0) << 7) | layer.scale;
    //fix here for blitmap and for background 
    const array = new Uint8Array([layer.contract, layer.layerId, layer.traitId, pfpRenderByte, layer.x, layer.y]);
    return "0x" + array.reduce((output, elem) => output + elem.toString(16).padStart(2, '0'), '');
  }

    //const SVG = GetSVG({ inBytes: bytes});
   const contracts = GetContracts();
    const traits = GetTraits();
    const layers = GetLayers();
    const deBouncedLocations = useDebounce(locations); 
    const SVG = GetFullSVG({locations:locations, pfpRender: pfpRender, contracts: contracts ? contracts : undefined, bgColor: selColor});
    
    useEffect(() => {
      const nextBytes = deBouncedLocations.map((item) => encodeLayer(item, pfpRender));
      setBytes(nextBytes.concat(Array.from({length: 7-nextBytes.length}, () => "0x000000000000")));

    }, [deBouncedLocations])

    const onColorPick = (color: string) => {
      return;
    }

    //console.log(bytes);
    const filteredLayers = layers?.filter(layer => {
       if(selectedValue.collection === 0) { return layers; }
      return layer.contract === selectedValue.collection;
    });

    const toggle = () => {
      setPfpRender(!pfpRender);
  }
  
    const empty = [{value: 0, label: "None", maxSupply: 0, minted: 0}]
    const placeholder = [{value: 0, label: "Please connect", maxSupply: 0, minted: 0}]

    return(
      <div className="" data-theme="halloween">
        <div className="flex flex-col text-2xl font-proggy" >
          <nav className='m-4 flex flex-row justify-end space-x-5 h-10'>
            {/* <a href="https://twitter.com/Cc0Mash">
              <Image src="/Twitter social icons - circle - white.png" width={44} height={44}  />
            </a> */}
            <a href="https://etherscan.io/address/0x9acff3827d5ada3d946433ecf65e4568cc6ef50d" className="p-0 my-auto flex">
            <Image src="/etherscan-logo-light-circle.png" width={33} height={33} className="my-auto" />
            </a>
          <ConnectButton showBalance={false} accountStatus="address"/>
        </nav>
            <div className="flex flex-col gap-4 items-center p-8 mx-auto">
              <div className='flex flex-col items-center'>
                <h1 className='font-bold text-5xl'>
                  What is this, a crossover episode?
                </h1>
                <h2 className='font-bold text-3xl py-3'>
                  CC0 Mash - an on-chain CC0 mashup
                </h2>
                <h3 className="pb-2">
                  Phase 1: The Mint
                </h3>
                <label htmlFor="my-modal-4" className="btn rounded-lg btn-outline btn-primary text-2xl">What?</label>
              </div>
                <div className="flex flex-row space-x-2">
                  <div className="border border-1 h-[322px]">
                {(isMounted && SVG ? parse(SVG.toString()) : parse(placeSVG)) ?? parse(placeSVG)}
                  </div>
                {/* {SVG ? parse(SVG.toString()) : "No Layers added yet."} */}
              <div className='flex flex-col text-center'>
                <BoxContainer boxes={locations} setBoxes={handleOrderChange} handleLocationChange={handleLocationChange} />
                <div className="form-control ">
                  <label className="label cursor-pointer justify-center">
                    <span className="label-text text-2xl mx-3">PFP mode</span> 
                    <input type="checkbox" checked={pfpRender} onClick={toggle} className="toggle" />
                  </label>
                </div>
                <div>
                {/* <div className="form-control ">
                  <label className="label cursor-pointer justify-center">
                    <span className="label-text text-2xl mx-3">Background</span> 
                    <input type="checkbox" checked={pfpRender} onClick={toggle} className="toggle" />
                  </label>
                  {<TwitterPicker/>} */}
                  <ColorPicker onChange={setSelColor} selectedColor={selColor} colors={colors}/>
                  {/* <div className="">
                  <button className=" text-2xl btn btn-outline btn-primary">Set Background</button>
                  <GithubPicker colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF']} />
                  </div> */}
                </div>
                <BuyAndMintButton inBytes={bytes} />
              </div>
              </div>
              <div className='flex flex-row space-x-3 text-center pt-2'>
                <h1 className="my-auto">Filter by: </h1>
                <p className="my-auto">Collection </p>
                <Select styles={customStyles} options={contracts ? [empty[0], ...contracts] : placeholder } onChange={(newValue) => handleFilter("collection", newValue)}/>
                <p className="my-auto">Layer </p>
                <Select styles={customStyles} options={filteredLayers ? [empty[0], ...filteredLayers] : placeholder } onChange={(newValue) => handleFilter("layer", newValue)}/>
              </div>
              <h2 className="text-3xl text-bold">Select layers</h2>
              <div>
                <TraitTable selectedValue={selectedValue} handlePiecesId={handlePiecesId} />
              </div>
              
                </div>
                </div>
                </div>
          
    );
};

export default HomePage;
