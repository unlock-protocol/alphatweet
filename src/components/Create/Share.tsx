import { resetCreatePost, useCreatePostState } from "./store";
import { SideLayout } from "../Layouts/SideLayout";
import { trpc } from "@/config/trpc";
import { useRouter } from "next/router";
import { formatter } from "@/utils/formatters";
import useClipboard from "react-use-clipboard";
import { useAccount } from "wagmi";
import { Post, PostPlaceholder } from "../Feed/Post";

export function Share() {
  const { post_id } = useCreatePostState();
  const router = useRouter();
  const { address: accountAddress } = useAccount();
  const { mutateAsync: addShare } = trpc.addShare.useMutation();
  const { data: post, isInitialLoading: isPostLoading } =
    trpc.fetchPost.useQuery(post_id!, {
      enabled: !!post_id,
    });
  return (
    <SideLayout>
      <div>
        <div className="grid gap-6">
          {isPostLoading && <PostPlaceholder />}
          {!isPostLoading && post && (
            <Post
              author={post.author_address}
              lockAddress={post.lock_address}
              network={post.lock_network}
              id={post.id}
              previewContent={post.preview_content}
            />
          )}
          <div className="grid items-center gap-6 p-6 rounded-lg bg-blue-yellow sm:grid-cols-12">
            <div className="sm:col-span-8">
              <p className="font-medium sm:text-lg text-brand-blue-gray">
                Sweet! ALPHA is ready to be seen by others, let&apos;s post it
                on Twitter!
              </p>
            </div>
            <div className="grid gap-1 sm:col-span-4">
              <button
                disabled={isPostLoading}
                onClick={async (event) => {
                  event.preventDefault();
                  await addShare({
                    post_id: post_id!,
                  });
                  const url = formatter.shareTweetURL({
                    id: post_id!,
                    address: accountAddress,
                    text: post!.preview_content,
                  });
                  window.open(url, "_blank");
                }}
                className="px-4 py-2 font-bold border rounded-full border-brand-dark text-brand-dark"
              >
                Tweet it out
              </button>
              <CopyLink text={formatter.AbsoluteURL(`/posts/${post_id}`)} />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="text-gray-400"
              onClick={(event) => {
                event.preventDefault();
                resetCreatePost();
                router.push("/");
              }}
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </SideLayout>
  );
}

export const CopyLink = ({ text }: Record<"text", string>) => {
  const [isCopied, copy] = useClipboard(text, { successDuration: 1000 });

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        copy();
      }}
      className="px-4 py-2 font-medium rounded-full text-brand-dark"
    >
      {isCopied ? "Copied!" : "Copy link"}
    </button>
  );
};
