import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, lightTheme, RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import merge from 'lodash.merge';
import {
  configureChains,
  createClient,
  WagmiConfig
} from "wagmi";
import { mainnet } from 'wagmi/chains'
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const provs = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ? 
[
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
] :
[
  publicProvider(),
];

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  provs,
)
 
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

const { connectors } = getDefaultWallets({
  appName: 'CC0 Mash',
  chains
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
    connectButtonBackground: "rgb(211,211,211)",
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
