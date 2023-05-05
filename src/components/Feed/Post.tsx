import { ReactComponent as TagIcon } from "@/icons/tag.svg";
import { ReactComponent as QuantityIcon } from "@/icons/quantity.svg";
import { formatter } from "@/utils/formatters";
import { useLock } from "@/hooks/useLock";
import { CgSpinnerTwo as SpinnerIcon } from "react-icons/cg";
import { BiDollarCircle as EarnedIcon } from "react-icons/bi";
import ToolTip from "../Tooltip";
interface Props {
  id: string;
  previewContent: string;
  author: string;
  lockAddress: string;
  network: number;
  loading?: boolean;
  hoverable?: boolean;
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
  hoverable,
}: Props) {
  const { data: lock } = useLock({
    address: lockAddress,
    network,
  });

  return (
    <div
      className={`grid w-full gap-2 bg-brand-blue-gray rounded-xl ${
        hoverable && "hover:bg-gray-800"
      }`}
    >
      <div className="p-2 space-y-2">
        <div className="flex items-center justify-between ">
          <div className="inline-block px-4 py-2 bg-gray-900 text-brand-blue rounded-xl">
            {lock?.name}
          </div>
          {loading && (
            <SpinnerIcon className="animate-spin motion-reduce:invisible " />
          )}
        </div>
        <div className="p-2">{previewContent}</div>
      </div>

      <div className="grid w-full gap-6 p-2 border-t border-gray-700 sm:grid-cols-3">
        <ToolTip content="Price to unlock the content">
          <div className="flex items-center gap-2 text-gray-500">
            <EarnedIcon size={28} />
            {lock && (
              <span>
                {lock.price <= 0
                  ? "FREE"
                  : lock.formatted?.price + " " + lock.tokenSymbol ?? ""}{" "}
              </span>
            )}
          </div>
        </ToolTip>

        <ToolTip content="Percentage referrers get paid from the price">
          <div className="flex items-center gap-2 text-gray-500">
            <QuantityIcon />
            {lock && <span> {lock?.formatted?.referral}%</span>}
          </div>
        </ToolTip>

        <ToolTip content="Total sales amount">
          <div className="flex items-center gap-2 text-gray-500">
            <TagIcon />{" "}
            {lock && (
              <span>
                {lock?.formatted?.earned} {lock.tokenSymbol}
              </span>
            )}
          </div>
        </ToolTip>
      </div>
    </div>
  );
}
