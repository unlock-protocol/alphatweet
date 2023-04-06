import { getLock } from "@/utils/lock";
import { useQuery } from "wagmi";

interface Options {
  address: string;
  network: number;
}

export const useLock = ({ address, network }: Partial<Options>) => {
  return useQuery(
    ["subgraph", "lock", network, address],
    () => {
      if (!address || !network) {
        return;
      }
      return getLock({
        address,
        network,
      });
    },
    {
      enabled: !!address && !!network,
    }
  );
};
