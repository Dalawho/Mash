import parse from 'html-react-parser';

import { Trait } from './SharedInterfaces';

interface PanelProps {
  trait: Trait;
  onClick: (trait:Trait) => void,
}

const Panel = ({ trait, onClick }: PanelProps) => {
  return (
    <button onClick={() => onClick(trait)} className="rounded-lg border-zinc-300 border-2 m-2 pt-1 flex flex-col items-center" >
      {trait.tokenURI ? parse(trait.tokenURI.toString()) : ""}
      
      <p>{trait.name}</p>
    </button>
  )
}

export default Panel;