import { wagmiClient } from "@/config/wagmi";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider, SIWESession } from "connectkit";
import { siweClient } from "@/config/siwe.client";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/reactQuery";
import { DefaultSeo } from "next-seo";
import { DEFAULT_SEO } from "@/config/seo";
import { Toaster } from "react-hot-toast";

export const Provider = ({ children }: { children?: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <siweClient.Provider
          // Optional parameters
          enabled={true} // defaults true
          nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
          sessionRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
          signOutOnDisconnect={true} // defaults true
          signOutOnAccountChange={true} // defaults true
          onSignIn={(session?: SIWESession) => {
            return queryClient.refetchQueries();
          }}
          onSignOut={() => {
            return queryClient.refetchQueries();
          }}
          signOutOnNetworkChange={false}
        >
          <ConnectKitProvider
            theme="midnight"
            options={{
              embedGoogleFonts: true,
            }}
          >
            <DefaultSeo {...DEFAULT_SEO} />
            {children}
            <Toaster
              toastOptions={{
                className: "bg-brand-blue-gray text-white",
                style: {
                  background: "#1C1F21",
                  color: "white",
                },
              }}
            />
          </ConnectKitProvider>
        </siweClient.Provider>
      </WagmiConfig>
    </QueryClientProvider>
  );
};
