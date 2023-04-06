import { formatter } from "@/utils/formatters";
import { DEFAULT_SEO, customizeSEO } from "./seo";
import type { DefaultSeoProps } from "next-seo";

export interface Route {
  label: string;
  seo: DefaultSeoProps;
}

type Pages =
  | "home"
  | "about"
  | "profile"
  | "privacy"
  | "referral"
  | "create"
  | "discover";

export type Routes = Record<Pages, Route>;

export const routes: Routes = {
  home: {
    label: "Home",
    seo: DEFAULT_SEO,
  },
  about: {
    label: "About",
    seo: customizeSEO({
      title: "About",
      description: "About Alpha Tweet",
      path: "/about",
      imagePath: formatter.ogPageURL({
        title: "About",
        description: "About Alpha Tweet",
      }),
    }),
  },
  profile: {
    label: "Profile",
    seo: customizeSEO({
      title: "Profile",
      description: "Profile",
      path: "/profile",
      imagePath: formatter.ogPageURL({
        title: "Profile",
        description: "Profile",
      }),
    }),
  },
  referral: {
    label: "Referral",
    seo: customizeSEO({
      title: "Referral",
      description: "Referral",
      path: "/referral",
      imagePath: formatter.ogPageURL({
        title: "Referral",
        description: "Referral",
      }),
    }),
  },
  create: {
    label: "Create",
    seo: customizeSEO({
      title: "Create",
      description: "Create",
      path: "/create",
      imagePath: formatter.ogPageURL({
        title: "Create",
        description: "Create",
      }),
    }),
  },
  discover: {
    label: "Discover",
    seo: customizeSEO({
      title: "Discover",
      description: "Discover",
      path: "/discover",
      imagePath: formatter.ogPageURL({
        title: "Discover",
        description: "Discover",
      }),
    }),
  },
  privacy: {
    label: "Privacy",
    seo: customizeSEO({
      title: "Privacy",
      description: "Privacy",
      path: "/privacy",
      imagePath: formatter.ogPageURL({
        title: "Privacy",
        description: "Privacy",
      }),
    }),
  },
} as const;
