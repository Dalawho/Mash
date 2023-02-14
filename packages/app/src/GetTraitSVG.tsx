import nouns from "./out.json";

export const GetTraitSVG = ({traitData , mimeType, contract} : { traitData: string, mimeType:string, contract:number}) => {
    if(traitData.startsWith("<?xml") || contract > 12) {
        return `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 50 50" width="80%" height="80%"> '
        <image x="0"" y="0" width="100%" height="100%" href="${getHref(traitData, mimeType, contract)}"/>
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`;

    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 50 50" width="80%" height="80%"> '
    <foreignObject width="100%" height="100%"><img width="100%" height="100%" src="${getHref(traitData, mimeType, contract)}" /></foreignObject>
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`;
}

export const GetBase64 = (traitData: string, contract: number, layer: string, trait:number) => {
    if(contract > 12) return traitData;
    if(contract == 6 && layer == "Head") {
        //console.log(nouns.nouns[trait]);
        return nouns.nouns[trait];
    }
    if(traitData.startsWith("<?xml")) return Buffer.from(traitData).toString('base64');
    if(traitData.startsWith("0x")) { 
        if(contract == 5 || contract == 7) return Buffer.from(traitData.substring(2),'hex').toString();
        return Buffer.from(traitData.substring(2),'hex').toString('base64');
    }
    return traitData;
}

const getHref = (traitData: string, mimeType:string, contract:number) => {
    if(contract > 13 ) return traitData;
    let realMimeType = contract > 12 ? "image/svg+xml" : mimeType
    return `data:${mimeType};base64,${traitData}`;

}