import { ethers } from "ethers";
import {  useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

import { Button } from "./Button";
import contractAddresses from "./contracts.json";
import { Mash__factory } from "./types";

export const BuyAndMintButton = ( {inBytes} : {inBytes : string[] } ) => {
   
  const price = "0.005";
  const { config } = usePrepareContractWrite({
    address: contractAddresses.mash,
    abi: Mash__factory.abi,
    functionName: 'mintAndBuy',
    args: [[`0x${inBytes[0]}`,`0x${inBytes[1]}`,`0x${inBytes[2]}`,`0x${inBytes[3]}`,`0x${inBytes[4]}`,`0x${inBytes[5]}`,`0x${inBytes[6]}`]],
    overrides: {value: ethers.utils.parseEther(price)}
  })
  const { data, error, isLoading, isSuccess , write } = useContractWrite(config);
  const {isSuccess: txSuccess} = useWaitForTransaction({hash: data?.hash});

  //console.log(write);
  //    {txSuccess && <div>{artName} submitted</div>}
  return (
    <div className="justify-center">
    <Button className="btn-primary" onClick={() => write?.()} disabled={((isLoading || (isSuccess && !txSuccess) || !write))} >
    {isLoading && <div>Confirm in Wallet</div>}
    {(isSuccess && !txSuccess) && <div>Transaction submitted</div>}
    {(!isLoading && !isSuccess) && <div>Mint for 0.005 Eth</div>}
    {(!isLoading && isSuccess && txSuccess) && <div>Success! Mint another mashup?</div>}
    </Button>
    </div>
  );
};
