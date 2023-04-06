import { networks } from "@unlock-protocol/networks";
import { Chain, Connector, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { AppConfig } from "./app";
import { getDefaultClient } from "connectkit";
import { ethers, getDefaultProvider } from "ethers";
import { getNetwork } from "@ethersproject/networks";

export const getProvider = (_config: {
  chainId?: number;
  connector?: Connector;
}) => {
  let windowProvider: any = window.ethereum;
  let provider: any;
  if (!windowProvider) {
    provider = getDefaultProvider(getNetwork(_config.chainId ?? 1));
  } else {
    provider = new ethers.providers.Web3Provider(windowProvider);
  }
  return provider;
};

const chains = Object.values(networks).map((item: any) => {
  return {
    id: item?.id,
    rpcUrls: {
      default: {
        http: [item?.provider],
      },
      public: {
        http: [item?.publicProvider],
      },
    },
    name: item.name,
    testnet: item.isTestNetwork,
    blockExplorers: {
      default: item?.explorer?.base,
    },
    nativeCurrency: item.nativeCurrency,
    network: item.network,
  } as Chain;
});

const { provider, webSocketProvider } = configureChains(
  chains,
  [
    jsonRpcProvider({
      priority: 0,
      rpc: (chain) => {
        return {
          http: chain.rpcUrls.default.http[0],
          webSocket: chain.rpcUrls.default.webSocket?.[0],
        } as const;
      },
      static: true,
    }),
    publicProvider(),
  ],
  { pollingInterval: 10_000, targetQuorum: 3 }
);

export const wagmiClient = createClient(
  getDefaultClient({
    chains,
    autoConnect: true,
    provider,
    webSocketProvider,
    appName: AppConfig.name,
  })
);
