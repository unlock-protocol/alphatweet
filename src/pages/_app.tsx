import type { AppProps } from "next/app";
import { Provider } from "../components/Provider";
import "@/globals.css";
import { trpc } from "@/config/trpc";
import { Space_Grotesk } from "next/font/google";

const grotest = Space_Grotesk({
  subsets: ["latin"],
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <style jsx global>{`
        html {
          font-family: ${grotest.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Provider>
  );
}

export default trpc.withTRPC(CustomApp);
