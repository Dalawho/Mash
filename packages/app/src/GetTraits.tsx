import { gql } from "urql";
import { useAccount } from "wagmi";

import { useTraitsQuery } from "../codegen/subgraph";
import { GetTraitSVG } from "./GetTraitSVG";
import { useIsMounted } from "./useIsMounted";

gql`
  query Traits {
        traits(first: 1000) {
          data
          id
          name
          index
          mimeType
          layer {
            name
            index
            contract {
              id
            }
          }
        }
      }
`;

const GetTraits = ()  => {
  const { address } = useAccount();

  const [query] = useTraitsQuery({
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
        return(svg.replace('\\', '').replace(/width="\d+"/, 'width="90%"').replace(/height="\d+"/, 'height="90%"'));
      }
      return("no Image found");
    }
  //const returnData = query.data?.contracts.map((item, index) => { return {value: parseInt(item.id), label: `${item.id} - ${item.name}`, price: parseInt(item.price), tokenURI: getImageFromTokenURI(item.tokenURI)}}).sort( (a,b) => a.value - b.value );
    
  const out = query.data?.traits.map((item, index) => {return {value: parseInt(item.id), label: `${item.id}`, tokenURI: GetTraitSVG( {traitData: item.data}), layer: item.layer.name, contract: parseInt(item.layer.contract.id), mimeType: item.mimeType, layerNr: item.layer.index, traitNr: item.index, name: item.name}});

  //console.log(query.data?.contracts);
  return out;
};

export default GetTraits;