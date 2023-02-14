import { Locations } from "./Location";
import { Color, Contract } from "./SharedInterfaces";


export const GetFullSVG = ({locations, pfpRender, contracts, bgColor, isSafari} : { locations: Locations[], pfpRender: boolean, contracts?: Contract[], bgColor: Color, isSafari: boolean}): [number, number, string] => {
    //add variable viewbox but fixed size
    if(!contracts) return [0,0,""];
    if(locations.length == 0 && bgColor.hex != "transparent") return [0, 0, onlyBg(bgColor)];
    if(locations.length == 0) return [0,0,""];
    let out = "";
    let height = locations[0].cheight * locations[0].scale; //this is broken because of sorting!! 
    let width = locations[0].cwidth * locations[0].scale;
    if(bgColor.hex != "transparent") {
        out = out + `<rect width="100%" height="100%" fill="${bgColor.hex}" />`
    }
    //console.log(locations);
    for(let i = 0; i < locations.length; i++) {
        out = out + getImage(locations[i], locations[i].cheight, locations[i].cwidth, isSafari);
        if(!pfpRender) {
            if(locations[0].cheight*locations[i].scale+locations[i].y > height) height = locations[0].cheight*locations[i].scale+locations[i].y;
            if(locations[0].cwidth*locations[i].scale+locations[i].x > width) width = locations[0].cwidth*locations[i].scale+locations[i].x;
        }
    }
    
    return [width, height, `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 ${width} ${height}" width="320" height="320">
    ${out}
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`];
}

export const GetCheckSVG = ({locations, pfpRender, contracts, bgColor, isSafari} : { locations: Locations[], pfpRender: boolean, contracts?: Contract[], bgColor: Color, isSafari: boolean}): [number, number, string] => {
    //add variable viewbox but fixed size
    if(!contracts) return [0,0,""];
    if(locations.length == 0 && bgColor.hex != "transparent") return [0, 0, onlyBg(bgColor)];
    if(locations.length == 0) return [0,0,""];
    let out = "";
    let x = 0;
    let y = 0;
    let height = contracts.filter(obj => obj.value === locations[0].contract)[0].x * locations[0].scale; //this is broken because of sorting!! 
    let width = contracts.filter(obj => obj.value === locations[0].contract)[0].y * locations[0].scale;
    if(bgColor.hex != "transparent") {
        out = out + `<rect width="100%" height="100%" fill="${bgColor.hex}" />`
    }

    for(let i = 0; i < locations.length; i++) {
        x = contracts.filter(obj => obj.value === locations[i].contract)[0].x * locations[0].scale; //this is broken because of sorting!! 
        y = contracts.filter(obj => obj.value === locations[i].contract)[0].y * locations[0].scale;
        out = out + getImage(locations[i], x, y, isSafari);
        if(!pfpRender) {
            if( x * locations[i].scale+locations[i].y > height) height = x * locations[i].scale+locations[i].y;
            if( y * locations[i].scale+locations[i].x > width) width = y * locations[i].scale+locations[i].x;
        }
    }

    let useElements = '';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 8; j++) {
        useElements += `<use href="#check" x="${j * 64 + 100}" y="${i * 64 + 100}"/>`;
      }
    }
    
    return [width, height, `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 ${width*10} ${height*10}" width="1024" height="1024">
    <defs>
        <svg id="check" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        ${out}
            <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style>
        </svg>
    </defs>
    ${useElements}
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
    <img width="100%" height="100%" src="${getHref(loc, image)}"/>
    </foreignObject>`;
}

const returnPNG = (loc: Locations, x:number, y:number, image:string) => {
    let mimeType = loc.contract > 12 ? "image/svg+xml" : loc.mimeType
    return ` <image x="${loc.x}" y="${loc.y}" width="${x * loc.scale}" height="${y * loc.scale}" href="${getHref(loc, image)}"/>`;
}

const returnSVG = (loc: Locations, x:number, y:number, image:string) => {
    return `<image x="${loc.x}" y="${loc.y}" width="${x * loc.scale}" height="${y * loc.scale}" href="${getHref(loc, image)}"/>`;
}

const getHref = (loc: Locations, image:string) => {
    if(loc.contract > 13 ) return image;
    let mimeType = loc.contract > 12 ? "image/svg+xml" : loc.mimeType
    return `data:${mimeType};base64,${image}`;

}