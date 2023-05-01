import { networks } from "@unlock-protocol/networks";
import { Chain, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { AppConfig } from "./app";
import { getDefaultClient } from "connectkit";

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
