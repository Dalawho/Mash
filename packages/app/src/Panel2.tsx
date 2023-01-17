import parse from 'html-react-parser';
import { useRef,useState } from 'react';
import { Trait } from './sharedInterfaces';

interface PanelProps {
  trait: Trait;
  onClick: (trait:Trait) => void,
}

const Panel = ({ trait, onClick }: PanelProps) => {
  //{picture && parse(picture)}
  //console.log(trait.tokenURI);
  return (
    <button onClick={() => onClick(trait)} className="rounded-lg border-slate-900 border-4 m-1 pt-1 flex flex-col items-center" >
      {trait.tokenURI ? parse(trait.tokenURI.toString()) : ""}
      
      <p>{trait.name}</p>
    </button>
  )
}

export default Panel;