import { networks } from "@unlock-protocol/networks";
import { useMemo } from "react";

interface Options {
  network: number;
}

export const useNetworkCurrencyOptions = ({ network }: Options) => {
  return useMemo(() => {
    return (networks[network]?.tokens || []).map((item: any) => {
      return {
        name: item.name,
        id: item.address,
        value: item,
      };
    });
  }, [network]);
};

export const useNetworkOptions = () => {
  return useMemo(() => {
    return Object.values(networks).map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        value: item,
      };
    }) as any[];
  }, []);
};
