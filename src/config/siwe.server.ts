import { configureServerSideSIWE } from "connectkit-next-siwe";
import { AppConfig } from "./app";

export const siweServer = configureServerSideSIWE({
  session: {
    cookieName: "connectkit-next-siwe",
    password: process.env.SESSION_SECRET,
    cookieOptions: {
      secure: AppConfig.production,
    },
  },
});
