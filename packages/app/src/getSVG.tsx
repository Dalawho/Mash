import { useContractRead } from 'wagmi';
import contractAddresses from "./contracts.json";
import { Render__factory } from "./types";
 
 
export const getSVG = ({inBytes} : {inBytes: string[]}) => {
  const { data, isError, isLoading } = useContractRead({
    addressOrName: contractAddresses.mash,
    contractInterface: Render__factory.abi,
    functionName: 'getSVGForTrait',
    args: [inBytes]
  })
}