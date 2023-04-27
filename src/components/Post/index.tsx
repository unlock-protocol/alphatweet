import { Connect } from "@/components/Connect";
import { trpc } from "@/config/trpc";
import { formatter } from "@/utils/formatters";
import { ConnectKitButton, useSIWE } from "connectkit";
import Markdown from "react-markdown";
import { Paywall } from "@unlock-protocol/paywall";
import { useCallback, useEffect } from "react";
import { useAccount } from "wagmi";
import { getCheckoutConfig } from "@/utils/checkout";
import { networks } from "@unlock-protocol/networks";
import { PostStats } from "./Stats";

interface Props {
  id: string;
  referrer?: string;
}

export function Post({ id, referrer }: Props) {
  const { isSignedIn } = useSIWE();
  const {
    data: post,
    isLoading: isPostLoading,
    refetch: refetchPost,
  } = trpc.fetchPost.useQuery(id!, {
    enabled: !!id,
  });

  const { mutateAsync: addShare } = trpc.addShare.useMutation();

  const { connector, address } = useAccount();
  useEffect(() => {
    const handler = (_event: any) => {
      return refetchPost();
    };
    window.addEventListener("unlockProtocol.status", handler);
    return () => {
      window.removeEventListener("unlockProtocol.status", handler);
    };
  }, [refetchPost]);

  const openCheckout = useCallback(async () => {
    if (!(post && connector)) {
      return null;
    }
    // const provider = await connector.getProvider({
    //   chainId: post.lock_network,
    // });
    const config = getCheckoutConfig({
      address: post.lock_address,
      network: post.lock_network,
      referrer,
    });
    const paywall = new Paywall(
      config,
      networks
      // need to figure out how to make this work reliably
      // new ethers.providers.Web3Provider(provider)
    );
    await paywall.loadCheckoutModal();
  }, [post, connector, referrer]);

  return (
    <div className="grid w-full h-full gap-12 sm:px-0 sm:grid-cols-12">
      <div className="w-full h-full border rounded-lg sm:col-span-8 border-brand-blue">
        {isPostLoading && (
          <div className="grid gap-6 p-6">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <div
                key={index}
                className="h-12 rounded-full bg-brand-blue-gray animate-pulse"
              />
            ))}
          </div>
        )}
        {!isPostLoading && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-brand-blue">
              <div className="flex flex-col gap-1 p-2">
                <div className="text-sm text-gray-400"> Created By</div>
                <div className="font-bold rounded text-brand-blue">
                  {formatter.minifyAddress(post!.author_address)}
                </div>
              </div>
              <div className="flex flex-col gap-1 p-2 text-right">
                <div className="text-sm text-gray-400"> Published on</div>
                <div className="font-bold rounded text-brand-blue">
                  {new Date(post!.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
            <Markdown className="flex-1 w-full p-2 overflow-auto prose prose-invert">
              {post!.content}
            </Markdown>

            {!isPostLoading && !post?.hasAccess && (
              <div className="flex items-center justify-between gap-4 p-4 m-2 rounded-lg bg-blue-yellow sm:grid-cols-12">
                <div className="sm:col-span-8">
                  <p className="font-medium text-brand-blue-gray">
                    This is a preview post.
                  </p>
                </div>
                <div className="grid gap-1 sm:col-span-4">
                  <ConnectKitButton.Custom>
                    {({ show, isConnected }) => (
                      <button
                        onClick={async (event) => {
                          event.preventDefault();
                          if (isConnected && isSignedIn) {
                            await openCheckout();
                          } else {
                            await show?.();
                          }
                        }}
                        className="flex items-center px-4 py-2 text-sm font-bold border rounded-full border-brand-dark text-brand-dark"
                      >
                        {isConnected
                          ? !isSignedIn
                            ? "Sign in with Ethereum"
                            : "Buy NFT to Access"
                          : "Connect to Access"}
                      </button>
                    )}
                  </ConnectKitButton.Custom>
                </div>
              </div>
            )}
            {!isPostLoading && post?.hasAccess && (
              <div className="grid p-4 m-2 rounded-lg gap-y-4 sm:items-center gap-x-6 sm:grid-cols-12 bg-brand-blue">
                <div className="sm:col-span-8">
                  <h3 className="text-lg font-bold text-brand-blue-gray">
                    Share is rewarding!
                  </h3>
                  <p className="text-gray-700">
                    The creator has set % of referral fee if someone unlocks
                    your share tweet, join the force. 🙌​
                  </p>
                </div>
                <div className="sm:col-span-4">
                  <button
                    onClick={async (event) => {
                      event.preventDefault();
                      await addShare({
                        post_id: id,
                      });
                      const url = formatter.shareTweetURL({
                        id: post!.id!,
                        address,
                        text: post!.preview_content,
                      });
                      window.open(url, "_blank");
                    }}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-bold border rounded-full border-brand-dark text-brand-dark"
                  >
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="space-y-6 sm:col-span-4">
        <Connect showBottom={false} />
        {post && (
          <PostStats
            id={post.id!}
            address={post.lock_address}
            network={post.lock_network}
          />
        )}
      </div>
    </div>
  );
}
