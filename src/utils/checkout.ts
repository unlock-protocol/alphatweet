import { formatter } from "./formatters";

interface Options {
  address: string;
  network: number;
  referrer?: string;
}

export const getCheckoutConfig = ({ address, network, referrer }: Options) => {
  return {
    icon: formatter.AbsoluteURL("/cherry.svg"),
    title: "Alpha Tweet",
    locks: {
      [address]: {
        network,
      },
    },
    referrer,
    skipRecipient: true,
    pessimistic: true,
  };
};
