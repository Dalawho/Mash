import { gql } from "urql";
import { useAccount } from "wagmi";

import { useLayersQuery } from "../codegen/subgraph";
import { useIsMounted } from "./useIsMounted";

gql`
  query Layers {
    layers(first: 10) {
      id
      name
      contract {
        id
      }
    }
  }
`;

const GetLayers = ()  => {
  const { address } = useAccount();

  const [query] = useLayersQuery({
    pause: !address
  });

  // Temporarily workaround hydration issues where server-rendered markup
  // doesn't match the client due to localStorage caching in wagmi
  // See https://github.com/holic/web3-scaffold/pull/26
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }

  if (!address) {
    return null;
  }
    const getImageFromSVG = (svg: string) => {
        if(svg.length > 20) {         
        return(svg.replace('"', '').replace(/width="\d+"/, 'width="90%"').replace(/height="\d+"/, 'height="90%"'));
      }
      return("no Image found");
    }
  const returnData = query.data?.layers.map((item, index) => { return {value: index, label: item.name, contract: item.contract.id } } ).sort( (a,b) => a.value - b.value );

  return returnData;
};

export default GetLayers;