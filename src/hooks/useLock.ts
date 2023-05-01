import { getLock } from "@/utils/lock";
import { useQuery } from "wagmi";

interface Options {
  address: string;
  network: number;
}

export const useLock = ({ address, network }: Partial<Options>) => {
  return useQuery(
    ["subgraph", "lock", network, address],
    async () => {
      if (!address || !network) {
        return {};
      }
      try {
        const lock = await getLock({
          address,
          network,
        });
        return lock;
      } catch (error) {
        console.error(error);
        return {};
      }
    },
    {
      enabled: !!address && !!network,
    }
  );
};
