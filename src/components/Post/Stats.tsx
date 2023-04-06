import { trpc } from "@/config/trpc";
import { useLock } from "@/hooks/useLock";

interface Props {
  id: string;
  address: string;
  network: number;
}

export function PostStats({ id, address, network }: Props) {
  const { data: stats, isLoading: isPostStatsLoading } =
    trpc.postStats.useQuery({
      post_id: id,
    });

  const { isLoading: isLockLoading, data: lock } = useLock({
    address,
    network,
  });

  return (
    <div
      style={{
        boxShadow: "4px 4px 40px -2px rgba(91, 173, 233, 1)",
      }}
      className="grid gap-6 p-6 rounded-xl"
    >
      <header>
        <h2 className="font-semibold text-brand-blue"> ALPHA Stats</h2>
        <p className="text-gray-400">
          How this tweet enables all ALPHAs earn & its reward distribution
        </p>
      </header>
      <div>
        {!isPostStatsLoading && (
          <div className="space-y-1">
            <div className="text-brand-blue">Shared count </div>
            <div className="text-xl font-bold text-brand-blue">
              {stats?.shares}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
