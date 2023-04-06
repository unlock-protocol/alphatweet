import type { DefaultSeoProps, NextSeoProps } from "next-seo";
import { AppConfig } from "./app";
import { formatter } from "@/utils/formatters";

export const DEFAULT_SEO: DefaultSeoProps = {
  title: "Alpha Tweet",
  description: "No description...",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: AppConfig.siteUrl,
    site_name: "Alpha Tweet",
    images: [
      {
        url: formatter.AbsoluteURL("/api/og/page"),
        alt: "Alpha Tweet",
      },
    ],
  },
  twitter: {
    handle: "UnlockProtocol",
    site: "UnlockProtocol",
    cardType: "summary_large_image",
  },
};

interface SEOProps {
  title: string;
  description?: string;
  imagePath?: string;
  twitter?: {
    handle?: string;
    site?: string;
    cardType?: string;
  };
  path?: string;
}

export function customizeSEO(options: SEOProps): NextSeoProps {
  const images = options.imagePath
    ? [
        // Twitter only fetch og:image if it is an absolute path with domain.
        {
          url: new URL(options.imagePath, AppConfig.siteUrl).toString(),
          alt: options.title,
        },
      ]
    : DEFAULT_SEO.openGraph?.images;
  const path = options.path ?? "/";
  const url = new URL(path, AppConfig.siteUrl).toString();
  return {
    ...DEFAULT_SEO,
    ...options,
    twitter: {
      ...DEFAULT_SEO,
      handle: options.twitter?.handle || DEFAULT_SEO.twitter?.handle,
      site: options.twitter?.site || DEFAULT_SEO.twitter?.site,
    },
    openGraph: {
      ...DEFAULT_SEO.openGraph,
      images,
      url,
    },
  };
}
