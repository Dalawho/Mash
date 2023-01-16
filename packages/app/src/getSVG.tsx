import { useContractRead } from 'wagmi';
import contractAddresses from "./contracts.json";
import { Mash__factory, Render__factory } from "./types";
 
 
export const GetSVG = ({inBytes} : {inBytes: string[]}) => {
  const { data } = useContractRead({
    addressOrName: contractAddresses.mash,
    contractInterface: Mash__factory.abi,
    functionName: 'previewCollage',
    args: [inBytes]
  })

  return data;
}