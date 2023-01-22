export const GetTraitSVG = ({traitData} : { traitData: string}) => {
    if(traitData.startsWith("<?xml")) return traitData;
    
    let base64String = "";
    if(traitData.startsWith("0x")) {base64String = Buffer.from(traitData.substring(2),'hex').toString('base64');}
    else{ base64String = traitData}
    return `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 50 50" width="80%" height="80%"> '
    <foreignObject width="100%" height="100%"><img width="100%" height="100%" src="data:${"image/png"};base64,${base64String}" /></foreignObject>
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`;
}

//<image width="100%" height="100%" href="data:${"image/png"};base64,${base64String}"/>
