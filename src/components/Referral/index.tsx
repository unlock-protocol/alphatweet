import { ReactComponent as ReferralCherry } from "@/icons/referral-cherry.svg";
import { FeedEmptyPlaceholder } from "../Feed/AuthorFeed";
import { Connect } from "../Connect";
import { FeedScroll } from "../FeedScroll";
import { trpc } from "@/config/trpc";
import { Loading } from "../Loading";
import NextLink from "next/link";
import { minifyAddress } from "@/utils/formatters";
import ToolTip from "../Tooltip";

export function Referral() {
  const { isLoading: isTopReferralFeedLoading, data: topReferrals } =
    trpc.TopReferralFeed.useQuery();
  return (
    <div className="grid gap-12 sm:grid-cols-12">
      <div className="grid gap-6 sm:col-span-8">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4 p-4 m-2 rounded-lg sm:justify-between bg-cherry-shine sm:grid-cols-12">
            <h3 className="px-6 py-2 rounded-xl bg-brand-dark">
              Top referrers leaderboard
            </h3>
            <div className="hidden sm:block">
              <ReferralCherry />
            </div>
          </div>
          {isTopReferralFeedLoading && <Loading />}
          {!isTopReferralFeedLoading && topReferrals.length === 0 && (
            <FeedEmptyPlaceholder text="No referrals yet" />
          )}
          {!isTopReferralFeedLoading && topReferrals.length > 0 && (
            <FeedScroll size="small">
              <div className="grid gap-4">
                {topReferrals.map((item: any) => (
                  <NextLink
                    key={item.author_address}
                    href={`/profile/${item.author_address}`}
                  >
                    <div className="flex items-center justify-between p-2 hover:bg-opacity-80 bg-brand-blue-gray rounded-xl">
                      <div>{minifyAddress(item.author_address)}</div>
                      <ToolTip
                        content={`The number of referrals this author has made`}
                      >
                        <div>{item.share_count} referred</div>
                      </ToolTip>
                    </div>
                  </NextLink>
                ))}
              </div>
            </FeedScroll>
          )}
        </div>
      </div>
      <div className="w-full sm:col-span-4">
        <Connect />
      </div>
    </div>
  );
}
