export const GetTraitSVG = ({traitData , mimeType} : { traitData: string, mimeType:string}) => {
    let base64String = getBase64(traitData);
    if(traitData.startsWith("<?xml")) {
        return `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 50 50" width="80%" height="80%"> '
        <image x="0"" y="0" width="100%" height="100%" href="data:image/svg+xml;base64,${base64String}"/>
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`;

    }
    return `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 50 50" width="80%" height="80%"> '
    <foreignObject width="100%" height="100%"><img width="100%" height="100%" src="data:${mimeType};base64,${base64String}" /></foreignObject>
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`;
}

const getBase64 = (traitData: string) => {
    if(traitData.startsWith("<?xml")) return Buffer.from(traitData).toString('base64');
    if(traitData.startsWith("0x")) { return Buffer.from(traitData.substring(2),'hex').toString('base64');}
    return traitData;
}