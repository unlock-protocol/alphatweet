import { subgraph } from "@/config/subgraph";
import { useQuery } from "@tanstack/react-query";

interface Options {
  owner: string;
  network: number;
  address: string;
}

export const useKey = ({
  owner: ownerAddress,
  address,
  network,
}: Partial<Options>) => {
  return useQuery(
    ["subgraph", "key", network, address, ownerAddress],
    async () => {
      const lock = address!.toLowerCase().trim();
      const owner = ownerAddress!.toLowerCase().trim();
      const key = await subgraph.key(
        {
          where: {
            lock,
            owner,
          },
        },
        {
          network: network!,
        }
      );
      return key || null;
    },
    {
      enabled: !!address && !!network && !!ownerAddress,
    }
  );
};
