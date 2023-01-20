import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, lightTheme, RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import { merge } from "lodash";
import {
  allChains,
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";
//import { localhost } from 'wagmi/chains'
import { alchemyProvider } from "wagmi/providers/alchemy";
//import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from "wagmi/providers/public";

// Will default to goerli if nothing set in the ENV
export const targetChainId =
  parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "0") || 1;

export const targetChain = (() => {
  const c = allChains.find((c) => c.id === targetChainId);
  if (!c) {
    throw new Error(`No chain config found for chain ID ${targetChainId}`);
  }
  return c;
})();

const provs = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ? 
[
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
] :
[
  publicProvider(),
];

const targetChains = [targetChain, chain.mainnet];


export const { chains, provider, webSocketProvider } = configureChains(
  targetChains, provs
);

// const { chains, provider } = configureChains(
//   [localhost],
//   [
//     jsonRpcProvider({
//       rpc: (chain) => ({
//         http: `http://127.0.0.1:8545`,
//       }),
//     }),
//   ],
// )

const { connectors } = getDefaultWallets({
  appName: "Mash",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  //webSocketProvider,
});

const myTheme = merge(lightTheme({}), {
  fonts: {
    body: 'ProggyTinyTTSZ',
  },
  colors : {
    //connectButtonBackground: "bg-primary",
    generalBorder: "rgb(100,100,100)",

    actionButtonBorder: "rgba(255, 0, 0, 1)",
  },
  shadows: {
    connectButton: "0px 4px 12px rgba(0, 0, 0, 0.5)"
  }
} as Theme);

export const EthereumProviders: React.FC = ({ children }) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} theme={myTheme} >{children} </RainbowKitProvider>
  </WagmiConfig>
);
