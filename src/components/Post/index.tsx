import { trpc } from "@/config/trpc";
import { formatter } from "@/utils/formatters";
import { ConnectKitButton, useSIWE } from "connectkit";
import Markdown from "react-markdown";
import { Paywall } from "@unlock-protocol/paywall";
import { useCallback, useEffect } from "react";
import { useAccount, useQuery } from "wagmi";
import { getCheckoutConfig } from "@/utils/checkout";
import { networks } from "@unlock-protocol/networks";
import { useLock } from "@/hooks/useLock";
import { AppConfig } from "@/config/app";
import useClipboard from "react-use-clipboard";
import { subgraph } from "@/config/subgraph";
import { useSigned } from "@/hooks/useSigned";

interface Props {
  id: string;
  referrer?: string;
}

export function Post({ id, referrer }: Props) {
  const { isSignedIn } = useSIWE();
  const { connector, address } = useAccount();
  const ref = referrer || address;

  const [isCopied, copy] = useClipboard(
    formatter.AbsoluteURL(`/posts/${id}?referrer=${address}`),
    {
      successDuration: 1000,
    }
  );

  const {
    data: post,
    isLoading: isPostLoading,
    refetch: refetchPost,
  } = trpc.fetchPost.useQuery(id!, {
    enabled: !!id,
  });

  const { mutateAsync: addShare } = trpc.addShare.useMutation();
  const { isLoading: isLockLoading, data: lock } = useLock({
    address: post?.lock_address,
    network: post?.lock_network,
  });

  const {
    isLoading: isKeyLoading,
    data: key,
    refetch: refetchKey,
  } = useQuery(
    ["subgraph", "key", post?.lock_network, post?.lock_address, address],
    async () => {
      const key = subgraph.key(
        {
          where: {
            lock: post!.lock_address!.toLowerCase()?.trim(),
            owner: address!.toLowerCase()?.trim(),
          },
        },
        {
          network: post!.lock_network,
        }
      );
      return key ?? null;
    },
    {
      enabled: Boolean(
        isSignedIn && post?.lock_address && post?.lock_network && address
      ),
    }
  );

  useEffect(() => {
    const handler = async (_event: any) => {
      await refetchPost();
      await refetchKey();
    };
    window.addEventListener("unlockProtocol.status", handler);
    return () => {
      window.removeEventListener("unlockProtocol.status", handler);
    };
  }, [refetchPost, refetchKey]);

  const openCheckout = useCallback(async () => {
    if (!(post && connector)) {
      return null;
    }
    const provider = await connector.getProvider({
      chainId: post.lock_network,
    });
    const config = getCheckoutConfig({
      address: post.lock_address,
      network: post.lock_network,
      referrer: referrer || post.author_address,
    });
    const paywall = new Paywall(config, networks, provider);
    await paywall.loadCheckoutModal(config, AppConfig.unlockAppUrl);
  }, [post, connector, referrer]);
  const isSigned = useSigned();
  const keychainURL = new URL("/keychain", AppConfig.unlockAppUrl).toString();

  const isLoading = isPostLoading || isLockLoading;
  return (
    <div className="grid w-full border border-brand-pale-blue rounded-xl">
      <div className="w-full h-full">
        {isLoading && (
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
        {!isLoading && (
          <div className="flex flex-col h-full ">
            <div className="flex items-center justify-between border-b">
              {lock && !isLockLoading && (
                <div className="flex flex-col gap-1 p-4">
                  <div className="text-sm text-gray-400"> Locked By</div>
                  <div className="font-bold rounded text-brand-blue">
                    {lock?.name}
                  </div>
                </div>
              )}
              <div className="flex-col hidden gap-1 p-4 md:flex">
                <div className="text-sm text-gray-400"> Created By</div>
                <div className="font-bold rounded text-brand-blue">
                  {formatter.minifyAddress(post!.author_address)}
                </div>
              </div>
              {ref && (
                <div className="flex-col hidden gap-1 p-4 md:flex">
                  <div className="text-sm text-gray-400"> Referred By</div>
                  <div className="font-bold rounded text-brand-blue">
                    {formatter.minifyAddress(ref)}
                  </div>
                </div>
              )}
              {key && !isKeyLoading && (
                <div className="flex flex-col gap-1 p-4">
                  <div className="text-sm text-gray-400"> Token </div>

                  <a
                    href={keychainURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold rounded text-brand-blue"
                  >
                    {key.tokenId}
                  </a>
                </div>
              )}
            </div>
            <Markdown className="p-4 overflow-auto prose max-w-fit prose-invert">
              {post!.content}
            </Markdown>

            {!isPostLoading && !post?.hasAccess && (
              <div className="flex items-center justify-between gap-4 p-4 m-2 rounded-lg bg-blue-yellow sm:grid-cols-12">
                <div className="sm:col-span-8">
                  <p className="font-medium text-brand-blue-gray">
                    {lock?.sold > 10
                      ? `${lock?.sold} people have unlocked this post for ${lock?.formatted?.price} ${lock?.tokenSymbol}`
                      : `Be one of the first to unlock this post for ${lock?.formatted?.price} ${lock?.tokenSymbol}`}
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
                        {!isSigned
                          ? "Connect to Access"
                          : lock?.price > 0
                          ? "Buy Access"
                          : "Access Content"}
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
                    Sharing is rewarding!
                  </h3>
                  <p className="text-gray-700">
                    You earn {lock?.formatted?.referralFee} {lock?.tokenSymbol}{" "}
                    for every person who unlocks this post using your referral
                    link.
                  </p>
                  <p className="text-gray-700">
                    People have earned over {lock?.formatted?.totalReferralFee}{" "}
                    {lock?.tokenSymbol} from sharing this post.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 sm:col-span-4">
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
                    Share on Twitter
                  </button>
                  <button
                    className="text-sm font-semibold text-brand-dark"
                    onClick={(event) => {
                      event.preventDefault();
                      copy();
                    }}
                  >
                    {isCopied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
