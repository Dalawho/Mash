//import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "../global.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

import { EthereumProviders } from "../EthereumProviders";

export const graphClient = createGraphClient({
  //url: "https://api.thegraph.com/subgraphs/name/dalawho/indelt",  
  url: "https://api.thegraph.com/subgraphs/name/dalawho/testmainnetindel"
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Collect Create</title>
      </Head>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Mix and match layers from your favourite Indelible Labs CC0 projects</h3>
    <p className="py-4">Instructions:</p>
    <ul>
      <li>Select </li>
      <li>1. Select layers from the list images below</li>
      <li>2. Drag and drop layers to reorder</li>
      <li>3. Adjust</li>
    </ul>
    <div className="modal-action">
      <label htmlFor="my-modal" className="btn">Yay!</label>
    </div>
  </div>
</div>
      <GraphProvider value={graphClient}>
        <EthereumProviders>
          <Component {...pageProps} />
        </EthereumProviders>
      </GraphProvider>
    </>
  );
};

export default MyApp;