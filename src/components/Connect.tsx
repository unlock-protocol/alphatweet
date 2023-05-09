import { trpc } from "@/config/trpc";
import { ReactComponent as Cherry } from "@/icons/cherry-large.svg";
import { formatter } from "@/utils/formatters";
import { ConnectKitButton, useSIWE } from "connectkit";
import { useAccount } from "wagmi";
import { ReactComponent as WalletIcon } from "@/icons/wallet.svg";
import { ReactNode } from "react";
import { Button } from "./Button";
import { useSigned } from "@/hooks/useSigned";
import NextLink from "next/link";

interface ConnectedProps {
  children?: ReactNode;
}

export function Connect({ children }: ConnectedProps) {
  const { isConnected } = useAccount();
  const { isSignedIn } = useSIWE();
  return isSignedIn && isConnected ? (
    <Connected>{children}</Connected>
  ) : (
    <NotConnected />
  );
}

export function ConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ show }) => (
        <button
          onClick={show}
          aria-label="Connect Wallet"
          className="flex items-center justify-center w-full gap-2 px-4 py-2 font-bold text-gray-300 border border-gray-300 rounded-full"
        >
          Connect Wallet
        </button>
      )}
    </ConnectKitButton.Custom>
  );
}

export function Stats() {
  const { data: stats } = trpc.authorStats.useQuery(undefined, {
    initialData: {
      unlocked: 0,
      created: 0,
    },
  });
  return (
    <div className="grid grid-cols-2 divide-x divide-brand-dark">
      <div className="p-6 space-y-2">
        <div> Created </div>
        <p className="text-xl font-bold">{stats?.created}</p>
      </div>
      <div className="p-6 space-y-2">
        <div> Unlocked </div>
        <p className="text-xl font-bold">{stats?.unlocked}</p>
      </div>
    </div>
  );
}

export function Connected({ children }: ConnectedProps) {
  const { address } = useAccount();
  return (
    <div
      className="grid w-full divide-y divide-brand-dark rounded-xl bg-brand-pale-blue text-brand-dark"
      style={{
        boxShadow: "4px 4px 40px -2px rgba(91, 173, 233, 1)",
      }}
    >
      <div className="flex items-center justify-between p-6">
        <div className="flex flex-col">
          <div> My Wallet </div>
          <p className="text-base font-bold">
            {formatter.minifyAddress(address!)}
          </p>
        </div>
        <div>
          <ConnectKitButton.Custom>
            {({ show }) => (
              <button
                className="p-1"
                aria-label="open wallet window"
                onClick={show}
              >
                <WalletIcon />
              </button>
            )}
          </ConnectKitButton.Custom>
        </div>
      </div>
      {children}
    </div>
  );
}

export function NotConnected() {
  return (
    <div
      className="flex flex-col w-full gap-6 p-6 rounded-3xl"
      style={{
        boxShadow: "4px 4px 40px -2px rgba(91, 173, 233, 1)",
      }}
    >
      <div className="grid gap-6 justify-items-center">
        <Cherry />
        <p>
          ALPHAtweet enables you to token-gate your tweets & empower your
          followers to earn rewards.
        </p>
      </div>
      <div className="grid gap-4 justify-items-center">
        <ConnectButton />
      </div>
    </div>
  );
}

interface Props {
  address: string;
}

export function ProfileShell({ address }: Props) {
  const signedIn = useSigned();
  return (
    <div
      className="grid w-full divide-y divide-brand-dark rounded-xl bg-brand-pale-blue text-brand-dark"
      style={{
        boxShadow: "4px 4px 40px -2px rgba(91, 173, 233, 1)",
      }}
    >
      <div className="flex items-center p-6">
        <div className="flex flex-col">
          <div> Author&apos;s Wallet</div>
          <p className="text-base font-bold">
            {formatter.minifyAddress(address!)}
          </p>
        </div>
      </div>
      {signedIn && (
        <div className="p-6">
          <NextLink href="/profile">
            <Button color="outline"> Go to my profile </Button>
          </NextLink>
        </div>
      )}
    </div>
  );
}
