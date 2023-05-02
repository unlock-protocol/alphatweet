import ReactGa from "react-ga4";
import { AppConfig } from "./app";

if (AppConfig.googleAnalyticsId) {
  ReactGa.initialize(AppConfig.googleAnalyticsId);
}

export const pageview = (path: string) => {
  if (AppConfig.googleAnalyticsId) {
    ReactGa.send({ hitType: "pageview", path });
  }
};
