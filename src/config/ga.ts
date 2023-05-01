import ReactGa from "react-ga4";
import { AppConfig } from "./app";

ReactGa.initialize(AppConfig.googleAnalyticsId);

export const pageview = (path: string) => {
  ReactGa.send({ hitType: "pageview", path });
};
