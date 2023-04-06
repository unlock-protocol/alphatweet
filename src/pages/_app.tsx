import type { AppProps } from "next/app";
import { Provider } from "../components/Provider";
import "@/globals.css";
import { trpc } from "@/config/trpc";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default trpc.withTRPC(CustomApp);
