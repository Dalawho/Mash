import { Locations } from "./Location";
import { Color } from "./SharedInterfaces";
import { Contract } from "./SharedInterfaces";


export const GetFullSVG = ({locations, pfpRender, contracts, bgColor, isSafari} : { locations: Locations[], pfpRender: boolean, contracts?: Contract[], bgColor: Color, isSafari: boolean}): [number, number, string] => {
    //add variable viewbox but fixed size
    if(!contracts) return [0,0,""];
    if(locations.length == 0 && bgColor.hex != "transparent") return [0, 0, onlyBg(bgColor)];
    if(locations.length == 0) return [0,0,""];
    let out = "";
    let height = contracts[locations[0].contract-1].x * locations[0].scale;
    let width = contracts[locations[0].contract-1].y * locations[0].scale;
    if(bgColor.hex != "transparent") {
        out = out + `<rect width="100%" height="100%" fill="${bgColor.hex}" />`
    }

    for(let i = 0; i < locations.length; i++) {
        out = out + getImage(locations[i], contracts[locations[i].contract-1].x, contracts[locations[i].contract-1].y, isSafari);
        if(!pfpRender) {
            if(contracts[locations[i].contract-1].x*locations[i].scale+locations[i].y > height) height = contracts[locations[i].contract-1].x*locations[i].scale+locations[i].y;
            if(contracts[locations[i].contract-1].y*locations[i].scale+locations[i].x > width) width = contracts[locations[i].contract-1].y*locations[i].scale+locations[i].x;
        }
    }
    
    return [width, height, `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 ${width} ${height}" width="320" height="320">
    ${out}
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`];
}

const onlyBg = (bgColor: Color) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 ${32} ${32}" width="320" height="320">
    <rect width="100%" height="100%" fill="${bgColor.hex}" />
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`;

}

// const getImage = (loc: Locations, x:number, y:number, isSafari: boolean) => {
//     let image = "";
//     if(loc.data.startsWith("<?xml")) {
//         image = Buffer.from(loc.data).toString("base64");
//         return returnSVG(loc, x, y, image);
//     }
    
//     if(loc.data.startsWith("0x")) {
//         image = Buffer.from(loc.data.substring(2),'hex').toString('base64');
//         return isSafari ? returnForeign(loc, x, y, image): returnPNG(loc, x, y, image) ;
//     }
//     else{ 
//         image =  loc.data;
//         return isSafari ? returnForeign(loc, x, y, image): returnPNG(loc, x, y, image);
//     }
// }

const getImage = (loc: Locations, x:number, y:number, isSafari: boolean) => {
    if(loc.data.startsWith("<?xml")) {return returnSVG(loc, x, y, loc.data); }
    if(loc.data.startsWith("0x")) { return isSafari ? returnForeign(loc, x, y, loc.data): returnPNG(loc, x, y, loc.data) ; }
    return isSafari ? returnForeign(loc, x, y, loc.data): returnPNG(loc, x, y, loc.data);
}


const returnForeign = (loc: Locations, x:number, y:number, image:string) => {
    return ` <foreignObject x="${loc.x}" y="${loc.y}" width="${x * loc.scale}" height="${y * loc.scale}">
    <img width="100%" height="100%" src="data:${loc.mimeType};base64,${image}"/>
    </foreignObject>`;
}

const returnPNG = (loc: Locations, x:number, y:number, image:string) => {
    return ` <image x="${loc.x}" y="${loc.y}" width="${x * loc.scale}" height="${y * loc.scale}" href="data:${loc.mimeType};base64,${image}"/>`;
}

const returnSVG = (loc: Locations, x:number, y:number, image:string) => {
    return `<image x="${loc.x}" y="${loc.y}" width="${x * loc.scale}" height="${y * loc.scale}" href="data:image/svg+xml;base64,${image}"/>`;
}