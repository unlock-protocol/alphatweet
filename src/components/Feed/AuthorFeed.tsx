import { trpc } from "@/config/trpc";
import { Post, PostPlaceholder } from "./Post";
import NextLink from "next/link";
import { formatter } from "@/utils/formatters";
import { Tab } from "@headlessui/react";
import { ReactComponent as CherryRedIcon } from "@/icons/cherry-icon-red.svg";
interface Props {
  address: string;
}

export function AuthorCreatedFeed({ address }: Props) {
  const { data: feed, isLoading: isFeedLoading } =
    trpc.authorCreatedFeed.useQuery({
      address,
    });

  const items = feed || [];
  return (
    <div className="grid gap-6">
      {isFeedLoading &&
        Array.from({
          length: 5,
        }).map((_, index) => <PostPlaceholder key={index} />)}
      {!isFeedLoading &&
        items.map((item) => (
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
      {!isFeedLoading && items.length <= 0 && (
        <FeedEmptyPlaceholder text="You haven't created any alphas yet." />
      )}
    </div>
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

export function AuthorPurchasedFeed({ address }: Props) {
  const { data: feed, isLoading: isFeedLoading } =
    trpc.authorPurchaseFeed.useQuery({
      address,
    });

  const items = feed || [];
  return (
    <div className="grid gap-6">
      {isFeedLoading &&
        Array.from({
          length: 5,
        }).map((_, index) => <PostPlaceholder key={index} />)}
      {!isFeedLoading &&
        items.map((item) => (
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
      {!isFeedLoading && items.length <= 0 && (
        <FeedEmptyPlaceholder text="You haven't purchased any alphas yet." />
      )}
    </div>
  );
}

const Items = ["Created", "Purchased"];

export function AuthorFeed({ address }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 p-4 m-2 rounded-lg bg-blue-yellow sm:grid-cols-12">
        <h3 className="px-6 py-2 rounded-xl bg-brand-dark">
          {formatter.minifyAddress(address)}{" "}
        </h3>
      </div>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 rounded-xl ">
          {Items.map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                `w-full py-2.5 font-medium  leading-5 border-b ${
                  selected
                    ? " text-brand-pale-blue border-brand-pale-blue"
                    : "text-white border-transparent"
                }`
              }
            >
              {item}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel>
            <AuthorCreatedFeed address={address} />
          </Tab.Panel>
          <Tab.Panel>
            <AuthorPurchasedFeed address={address} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
