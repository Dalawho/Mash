import { Locations } from "./Location";

interface Contract {
    value: number;
    label: string;
    maxSupply: number;
    minted: number;
    x: number;
    y: number;
}

export const GetFullSVG = ({locations, pfpRender, contracts} : { locations: Locations[], pfpRender: boolean, contracts?: Contract[]}) => {
    //add variable viewbox but fixed size
    if(!contracts) return;
    if(locations.length == 0) return;
    let out = "";
    let height = contracts[locations[0].contract-1].x * locations[0].scale;
    let width = contracts[locations[0].contract-1].y * locations[0].scale;
    for(let i = 0; i < locations.length; i++) {
        out = out + getImage(locations[i], contracts[locations[i].contract-1].x, contracts[locations[i].contract-1].y);
        if(!pfpRender) {
            if(contracts[locations[i].contract-1].x*locations[i].scale+locations[i].y > height) height = contracts[locations[i].contract-1].x*locations[i].scale+locations[i].y;
            if(contracts[locations[i].contract-1].y*locations[i].scale+locations[i].x > width) width = contracts[locations[i].contract-1].y*locations[i].scale+locations[i].x;
        }
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 ${width} ${height}" width="320" height="320">
    ${out}
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`;
}

const getImage = (loc: Locations, x:number, y:number) => {
    const start = loc.data.indexOf("base64,");
    const end = loc.data.indexOf("/>", start);
    const substring = loc.data.substring(start+7, end-1);
    return ` <foreignObject x="${loc.x}" y="${loc.y}" width="${x * loc.scale}" height="${y * loc.scale}">
    <img width="100%" height="100%" src="data:${loc.mimeType};base64,${substring}"/>
    </foreignObject>`;
    //return `<image x="${loc.x}" y="${loc.y}" width="${32 * loc.scale}" height="${32 * loc.scale}" href="data:${loc.mimeType};base64,${substring}"/>`;
}