import { trpc } from "@/config/trpc";
import { Post, PostPlaceholder } from "./Post";
import NextLink from "next/link";
import { Tab } from "@headlessui/react";
import { ReactComponent as CherryRedIcon } from "@/icons/cherry-icon-red.svg";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useRouter } from "next/router";
import { useRouteChanging } from "@/hooks/useRouteChange";
interface Props {
  feedItems?: any[];
  isFeedLoading: boolean;
}

export function AuthorFeed({ feedItems, isFeedLoading }: Props) {
  const routeChange = useRouteChanging()

  return (
    <ScrollArea.Root className="w-full h-full overflow-hidden rounded">
      <ScrollArea.Viewport className="w-full rounded max-h-[500px]">
        <div className="grid gap-6 pr-3">
          {isFeedLoading &&
            Array.from({
              length: 5,
            }).map((_, index) => <PostPlaceholder key={index} />)}
          {!isFeedLoading &&
            feedItems?.map((item) => {
              const href = `/posts/${item.id}`.toLowerCase()?.trim()
              const isLoading = routeChange?.path === href
              return (
              <NextLink key={item.id} href={href}>
                <Post
                  hoverable 
                  loading={isLoading}
                  id={item.id}
                  previewContent={item.preview_content}
                  author={item.author_address}
                  lockAddress={item.lock_address}
                  network={item.lock_network}
                />
              </NextLink>
            )})}
          {!isFeedLoading && Number(feedItems?.length) <= 0 && (
            <FeedEmptyPlaceholder text="You haven't created any alphas yet." />
          )}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-brand-dark transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-brand-blue-gray rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-brand-dark transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="flex-1 bg-brand-blue-gray  rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-brand-dark" />
    </ScrollArea.Root>
  );
}

interface FeedEmptyPlaceholderProps {
  text: string;
}

export function FeedEmptyPlaceholder({ text }: FeedEmptyPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <CherryRedIcon />
      <p className="text-center text-gray-500">{text}</p>
    </div>
  );
}

interface AuthorHomeProps {
  address: string;
}

export function AuthorHome({ address }: AuthorHomeProps) {
  const { data: authorCreatedFeed, isLoading: isAuthorCreatedFeedLoading } =
    trpc.authorCreatedFeed.useQuery({
      address,
    });

  const { data: authorPurchaseFeed, isLoading: isAuthorPurchasingFeedLoading } =
    trpc.authorPurchaseFeed.useQuery({
      address,
    });

  const authorCreatedFeedItems = authorCreatedFeed || [];
  const authorPurchasedFeedItems = authorPurchaseFeed || [];

  return (
    <Tab.Group>
      <Tab.List className="flex p-1 space-x-1 rounded-xl ">
        <Tab
          className={({ selected }) =>
            `w-full py-2.5 font-medium  leading-5 border-b ${
              selected
                ? " text-brand-pale-blue border-brand-pale-blue"
                : "text-white border-transparent"
            }`
          }
        >
          Unlocked{" "}
          {!isAuthorPurchasingFeedLoading &&
            `(${authorPurchasedFeedItems.length})`}
        </Tab>
        <Tab
          className={({ selected }) =>
            `w-full py-2.5 font-medium  leading-5 border-b ${
              selected
                ? " text-brand-pale-blue border-brand-pale-blue"
                : "text-white border-transparent"
            }`
          }
        >
          Created{" "}
          {!isAuthorCreatedFeedLoading && `(${authorCreatedFeedItems.length})`}
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-6">
        <Tab.Panel>
          <AuthorFeed
            feedItems={authorPurchasedFeedItems}
            isFeedLoading={isAuthorPurchasingFeedLoading}
          />
        </Tab.Panel>
        <Tab.Panel>
          <AuthorFeed
            feedItems={authorCreatedFeedItems}
            isFeedLoading={isAuthorCreatedFeedLoading}
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
