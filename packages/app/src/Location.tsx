import { Contract } from "./SharedInterfaces";

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
    cwidth: number;
    cheight: number;
  }

type ScaleProps = {
  loc: Locations;
  id: number;
  onChange: (trait: string, value: string) => void;
}

export const LocationForm = (props: ScaleProps) => {

    return(
        <div className="space-y-1">
          <div className="form-control">
          <label className="input-group input-group-xs">
          <div className="tooltip" data-tip="Click to center">
          <button onClick={(e) => props.onChange("x", "center")}>
            <span className="text-xl">X</span>
            </button>
          </div>
          <input className="w-60 text-center rangeselect my-auto"
            type="range" min="-96" max="96"
            value={props.loc.x}
            onChange={(e) => props.onChange("x", e.target.value)}
            required pattern="\d+"
          />
          </label>
          </div>
          <div className="form-control">
          <label className="input-group input-group-xs">
          <div className="tooltip" data-tip="Click to center">
          <button onClick={(e) => props.onChange("y", "center")}>
            <span className="text-xl">Y</span>
            </button>
          </div>
            <input className="w-60 rangeselect my-auto"
            type="range" min="-96" max="96"
            value={props.loc.y}
            onChange={(e) => props.onChange("y", e.target.value)}
            required pattern="\d+"
          />
            </label>
          </div>
    </div>
    )
};

export const ScaleForm = (props: ScaleProps) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e) e.preventDefault();
    }
    return(
        <div className="form-control">
        <label className="input-group input-group-sm">
        <span className="text-xl">Scale:</span>
        <input className=" w-14 input input-bordered input-sm"
            type="number" min="1" max="10" id="scale" value={props.loc.scale}
            onKeyDown={onKeyDown}
            onChange={(e) => props.onChange("scale", parseInt(e.target.value) > 0 ? e.target.value : "1")}
            required pattern="\d+"
          />
          </label>
        </div>
    )
};