
export interface Locations {
    id: number;
    name: string;
    contract: number;
    layerId: number;
    traitId: number;
    scale: number;
    x: number;
    y: number;
    data: string;
    mimeType: string;
  }

type LocProps = {
  loc: Locations;
  id: number;
  onChange: (trait: string, value: string) => void;
}

export const LocationForm = (props: LocProps) => {
    
    return(
        <div className="justify-self-center col-span-4">
        <form className="grid grid-flow-col ">
        {/* <label className="w-18 pl-1">{props.id} Scale - X - Y:  </label> */}
        <input className="w-10  text-center bg-amber-100"
            type="number" 
            value={props.loc.scale}
            onChange={(e) => props.onChange("scale", parseInt(e.target.value) > 0 ? e.target.value : "1")}
            required pattern="\d+"
          />
          <label className="">|</label>
          <input className="w-10  text-center bg-amber-100"
            type="number" 
            value={props.loc.x}
            onChange={(e) => props.onChange("x", e.target.value)}
            required pattern="\d+"
          />
          <label className="">|</label>
          <input className="w-10 text-center bg-amber-100 outline-none focus:outline-none"
            type="number" 
            value={props.loc.y}
            onChange={(e) => props.onChange("y", e.target.value)}
            required pattern="\d+"
          />
      </form>
      </div>
    )
};