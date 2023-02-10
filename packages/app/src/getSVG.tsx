import { useContractRead } from 'wagmi';

import contractAddresses from "./contracts.json";
import { Mash__factory, Render__factory } from "./types";
 
 
export const GetSVG = ({inBytes} : {inBytes: string[]}) => {
  const { data } = useContractRead({
    address: contractAddresses.mash,
    abi: Mash__factory.abi,
    functionName: 'previewCollage',
    args: [[`0x${inBytes[0]}`,`0x${inBytes[1]}`,`0x${inBytes[2]}`,`0x${inBytes[3]}`,`0x${inBytes[4]}`,`0x${inBytes[5]}`,`0x${inBytes[6]}`]],
  })

  return data;
}