import { gql } from "urql";
import { useAccount } from "wagmi";

import { useContractsQuery } from "../codegen/subgraph";
import { useIsMounted } from "./useIsMounted";

gql`
  query Contracts {
    contracts(first: 100) {
      id
      address
      layerNames
      xSize
      ySize
      name
    }
  }
`;

const GetContracts = ()  => {
  //const { address } = useAccount();

  const [query] = useContractsQuery({
    //pause: !address
  });

  // Temporarily workaround hydration issues where server-rendered markup
  // doesn't match the client due to localStorage caching in wagmi
  // See https://github.com/holic/web3-scaffold/pull/26
  // const isMounted = useIsMounted();
  // if (!isMounted) {
  //   return null;
  // }

  // if (!address) {
  //   return null;
  // }
    // const getImageFromSVG = (svg: string) => {
    //     if(svg.length > 20) {         
    //     return(svg.replace('"', '').replace(/width="\d+"/, 'width="90%"').replace(/height="\d+"/, 'height="90%"'));
    //   }
    //   return("no Image found");
    // }
  const returnData = query.data?.contracts.map((item, index) => { return {value: parseInt(item.id), label: `${item.name} - ${item.xSize}x${item.xSize}`, maxSupply: 100, minted: 0, x: item.xSize, y: item.ySize } } ).sort( (a,b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  } );

  return returnData;
};

export default GetContracts;