import { ethers } from "ethers";
import {  useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

import { Button } from "./Button";
import contractAddresses from "./contracts.json";
import { Mash__factory } from "./types";

export const BuyAndMintButton = ( {inBytes} : {inBytes : string[] } ) => {

  const price = "5000000000000000";
   
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddresses.mash,
    contractInterface: Mash__factory.abi,
    functionName: 'mintAndBuy',
    args: [inBytes],
    overrides: {value: price}
  })
  const { data, error, isLoading, isSuccess , write } = useContractWrite(config);
  const {isSuccess: txSuccess} = useWaitForTransaction({hash: data?.hash});
  //    {txSuccess && <div>{artName} submitted</div>}
  return (
    <Button onClick={() => write?.()} disabled={((isLoading || (isSuccess && !txSuccess) || !write))} >
    {isLoading && <div>Confirm in Wallet</div>}
    {(isSuccess && !txSuccess) && <div>Transaction submitted</div>}
    {(!isLoading && !isSuccess) && <div>Mint for {ethers.utils.formatEther(price)}</div>}
    {(!isLoading && isSuccess && txSuccess) && <div>Mint for {ethers.utils.formatEther(price)}</div>}
    </Button>
  );
};
