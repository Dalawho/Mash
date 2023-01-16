import { Trait } from "./sharedInterfaces";

export const GetTraitSVG = ({traitData} : { traitData: string}) => {
    const base64String = Buffer.from(traitData.substring(2),'hex').toString('base64');;
    return `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" id="pixel" viewBox="0 0 50 50" width="80%" height="80%"> '
    <image width="100%" height="100%" href="data:${"image/png"};base64,${base64String}"/>
    <style>#pixel {image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; -ms-interpolation-mode: nearest-neighbor;}</style></svg>`;
}