import { ReactComponent as TagIcon } from "@/icons/tag.svg";
import { ReactComponent as QuantityIcon } from "@/icons/quantity.svg";
import { formatter } from "@/utils/formatters";
import { useLock } from "@/hooks/useLock";
import { CgSpinnerTwo as SpinnerIcon } from "react-icons/cg";
import { BiDollarCircle as EarnedIcon } from "react-icons/bi";
import { ethers } from "ethers";
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
      <div className="grid w-full grid-cols-3 gap-6">
        <div className="flex items-center gap-2 text-gray-500">
          <TagIcon />{" "}
          {lock && (
            <span>
              Price:{" "}
              {lock.price <= 0
                ? "FREE"
                : lock.formatted?.price + " " + lock.tokenSymbol ?? ""}{" "}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <QuantityIcon />
          {lock && <span>Fee: {lock?.formatted?.referral}%</span>}
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <EarnedIcon size={28} />
          {lock && (
            <span>
              Earned:{" "}
              {ethers.utils.formatUnits(
                ethers.BigNumber.from(lock.price).mul(lock.sold),
                lock.decimals
              )}{" "}
              {lock.tokenSymbol}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
