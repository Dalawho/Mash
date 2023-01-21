//import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "../global.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

import { EthereumProviders } from "../EthereumProviders";

export const graphClient = createGraphClient({
  //url: "https://api.thegraph.com/subgraphs/name/dalawho/indelt",  
  //url: "https://api.thegraph.com/subgraphs/name/dalawho/testmainnetindel"
  url: "https://api.thegraph.com/subgraphs/name/dalawho/cc0mash"
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>CC0 Mash</title>
      </Head>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
<label htmlFor="my-modal-4" className="modal cursor-pointer">
<label className="modal-box relative font-proggy" htmlFor="">
    <h3 className="font-bold text-3xl">Mix and match layers from your favourite Indelible Labs CC0 projects</h3>
    <p className="py-4 text-2xl">Instructions:</p>
    <ul className="text-2xl">
      <li>1. Select layers from the listed traits.</li>
      <li>2. Drag and drop layers to reorder</li>
      <li>3. Adjust scale and position for each layer</li>
      <li>4. Toggle pfp mode <br/>(size is determined by the background layer)</li>
      <li>5. Mint your creation!</li>
      {/* <p className="py-4">Total Supply: 3333. Price: 0.005 Eth</p> */}
    </ul>
  </label>
</label>
      <GraphProvider value={graphClient}>
        <EthereumProviders>
          <Component {...pageProps} />
        </EthereumProviders>
      </GraphProvider>
      <ToastContainer position="bottom-right" draggable={false} />
    </>
  );
};

export default MyApp;