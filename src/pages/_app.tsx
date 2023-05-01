import type { AppProps } from "next/app";
import { Provider } from "../components/Provider";
import "@/globals.css";
import { trpc } from "@/config/trpc";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { pageview } from "@/config/ga";
import { hotjar } from "react-hotjar";
import { AppConfig } from "@/config/app";

const grotest = Space_Grotesk({
  subsets: ["latin"],
});

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  useEffect(() => {
    hotjar.initialize(AppConfig.hotjarId, 6);
  }, []);

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
