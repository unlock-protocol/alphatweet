import { ReactComponent as TagIcon } from "@/icons/tag.svg";
import { ReactComponent as QuantityIcon } from "@/icons/quantity.svg";
import { ReactComponent as Retweet } from "@/icons/retweet.svg";
import { formatter } from "@/utils/formatters";
import { trpc } from "@/config/trpc";
import { useLock } from "@/hooks/useLock";
import { CgSpinnerTwo as SpinnerIcon } from "react-icons/cg";

interface Props {
  id: string;
  previewContent: string;
  author: string;
  lockAddress: string;
  network: number;
  loading?: boolean;
}

export function PostPlaceholder() {
  return (
    <div className="grid w-full gap-4 p-4 h-44 bg-brand-blue-gray rounded-xl animate-pulse"></div>
  );
}

export function Post({
  id,
  previewContent,
  lockAddress,
  network,
  author,
  loading,
}: Props) {
  const { data: lock } = useLock({
    address: lockAddress,
    network,
  });
  const { data: stats } = trpc.postStats.useQuery({
    post_id: id,
  });

  return (
    <div className="grid w-full gap-4 p-4 bg-brand-blue-gray rounded-xl">
      <div className="flex items-center justify-between">
        <div className="inline-block px-4 py-2 bg-gray-900 text-brand-blue rounded-xl">
          {formatter.minifyAddress(author)}
        </div>
        {loading && (
          <SpinnerIcon className="animate-spin motion-reduce:invisible " />
        )}
      </div>
      <div>{previewContent}</div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 text-gray-500">
          <TagIcon />{" "}
          {lock && (
            <span>
              {lock.price <= 0
                ? "FREE"
                : lock.formatted?.price + " " + lock.tokenSymbol ?? ""}{" "}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <QuantityIcon />
          {lock && <span>{lock?.formatted?.quantity}</span>}
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Retweet />
          {stats && <span>{stats.shares}</span>}
        </div>
      </div>
    </div>
  );
}
