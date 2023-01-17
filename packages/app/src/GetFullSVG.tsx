import { Locations } from "./Location";

export const GetFullSVG = ({locations, pfpRender} : { locations: Locations[], pfpRender: boolean}) => {
    //add variable viewbox but fixed size
    if(locations.length == 0) return;
    let out = "";
    let height = 32 * locations[0].scale;
    let width = 32 * locations[0].scale;
    for(let i = 0; i < locations.length; i++) {
        out = out + getImage(locations[i]);
        if(!pfpRender) {
            if(32*locations[i].scale+locations[i].y > height) height = 32*locations[i].scale+locations[i].y;
            if(32*locations[i].scale+locations[i].x > width) width = 32*locations[i].scale+locations[i].x;
        }
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 ${width} ${height}" width="320" height="320">
    ${out}
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`;
}

const getImage = (loc: Locations) => {
    let start = loc.data.indexOf("base64,");
    let end = loc.data.indexOf("/>", start);
    let substring = loc.data.substring(start+7, end-1);
    return `<image x="${loc.x}" y="${loc.y}" width="${32 * loc.scale}" height="${32 * loc.scale}" href="data:${loc.mimeType};base64,${substring}"/>`;
}