import { ReactComponent as ReferralCherry } from "@/icons/referral-cherry.svg";
import { FeedEmptyPlaceholder } from "../Feed/AuthorFeed";
import { Connect } from "../Connect";

export function Referral() {
  return (
    <div className="grid gap-12 sm:grid-cols-12">
      <div className="grid gap-6 sm:col-span-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 p-4 m-2 rounded-lg bg-cherry-shine sm:grid-cols-12">
            <h3 className="px-6 py-2 rounded-xl bg-brand-dark">
              Referral Leaderboard
            </h3>
            <div>
              <ReferralCherry />
            </div>
          </div>
          <FeedEmptyPlaceholder text="Coming soon to Alpha Tweet" />
        </div>
      </div>
      <div className="w-full sm:col-span-4">
        <Connect />
      </div>
    </div>
  );
}
