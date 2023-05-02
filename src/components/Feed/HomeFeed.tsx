import { trpc } from "@/config/trpc";
import { Post, PostPlaceholder } from "./Post";
import NextLink from "next/link";
import { FeedScroll } from "../FeedScroll";

export function HomeFeed() {
  const { data: feed, isLoading: isFeedLoading } = trpc.feed.useQuery();
  return (
    <FeedScroll>
      <div className="grid gap-6">
        {isFeedLoading &&
          Array.from({
            length: 5,
          }).map((_, index) => <PostPlaceholder key={index} />)}
        {!isFeedLoading &&
          (feed || []).map((item) => (
            <NextLink key={item.id} href={`/posts/${item.id}`}>
              <Post
                id={item.id}
                previewContent={item.preview_content}
                author={item.author_address}
                lockAddress={item.lock_address}
                network={item.lock_network}
              />
            </NextLink>
          ))}
      </div>
    </FeedScroll>
  );
}
