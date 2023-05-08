import { trpc } from "@/config/trpc";
import { Post, PostPlaceholder } from "./Post";
import NextLink from "next/link";
import { FeedScroll } from "../FeedScroll";
import { useRouteChanging } from "@/hooks/useRouteChange";

export function HomeFeed() {
  const { data: feed, isLoading: isFeedLoading } = trpc.feed.useQuery();
  const routeChange = useRouteChanging()

  return (
    <div className="space-y-6">
      <FeedScroll size="long">
        <div className="grid gap-6">
          {isFeedLoading &&
            Array.from({
              length: 5,
            }).map((_, index) => <PostPlaceholder key={index} />)}
          {!isFeedLoading &&
            (feed || []).map((item) => 
            {
              const href = `/posts/${item.id}`.toLowerCase()?.trim()
              const isLoading = routeChange?.path === href
              return (
              <NextLink key={item.id} href={href}>
                <Post
                  loading={isLoading}
                  hoverable
                  id={item.id}
                  previewContent={item.preview_content}
                  author={item.author_address}
                  lockAddress={item.lock_address}
                  network={item.lock_network}
                />
              </NextLink>
            )})}
        </div>
      </FeedScroll>
    </div>
  );
}
