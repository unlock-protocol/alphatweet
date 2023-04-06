import { CryptoIcon } from "@unlock-protocol/crypto-icon";
import { CreatePostState, useCreatePostState } from "./store";
import { useLock } from "@/hooks/useLock";
import { Loading } from "../Loading";
import { useEffect, useState } from "react";
import { AiOutlinePercentage as PercentageIcon } from "react-icons/ai";
import { ethers } from "ethers";
import { Button } from "../Button";
import { useWalletService } from "@/hooks/useWalletService";
import { Header } from "./Header";
import { Layout } from "./Layout";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { onWalletInteractionError } from "@/utils/errors";

export function Reward() {
  const { address, network } = useCreatePostState();
  const walletService = useWalletService();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoading: isLockLoading, data: lock } = useLock({
    address,
    network,
  });

  const { chain } = useNetwork();
  const { switchNetworkAsync, isLoading: isSwitchingNetwork } =
    useSwitchNetwork();

  const [referralFee, setReferralFee] = useState(0);

  useEffect(() => {
    if (!isLockLoading && lock) {
      setReferralFee(lock.formatted?.referral || 0);
    }
  }, [lock, isLockLoading]);

  return (
    <Layout>
      <Header
        title="Reward your followers"
        subTitle="ALPHA is all about engaging community and put the little cherry on top
        of your content. Set up the referral percentage so your follower can
        earn by sharing your content to their connections."
      />
      {isLockLoading && <Loading />}
      {!isLockLoading && (
        <div className="grid gap-6 mt-12">
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-lg text-bold"> Your content price </h3>
            </div>
            <div className="flex items-center gap-2 font-bold uppercase">
              <CryptoIcon symbol={lock?.tokenSymbol?.toLowerCase() || ""} />
              <div>
                {lock?.formatted?.price} {lock?.tokenSymbol || ""}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div>
              <label htmlFor="referral" className="text-lg text-bold">
                Referral fee
              </label>
              <p className="max-w-md text-base text-gray-400">
                Please set a decent percentage to reward your followers.
              </p>
            </div>
            <div className="relative flex items-center justify-end">
              <input
                id="referral"
                className="block w-24 box-border rounded-lg transition-all flex-1 p-1.5 ring-1 ring-transparent focus:ring-brand-blue bg-brand-blue-gray focus:outline-none"
                value={referralFee}
                onChange={(event) => {
                  event.preventDefault();
                  const value = event.target.value;
                  if (value === "") {
                    setReferralFee(0);
                    return;
                  } else {
                    const parsedValue = parseInt(value);
                    if (isNaN(parsedValue)) {
                      return;
                    }
                    if (parsedValue > 100) {
                      return;
                    }
                    setReferralFee(parsedValue);
                  }
                }}
              />
              <PercentageIcon className="absolute w-6 mr-1" />
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-lg text-bold"> Your follower can earn </h3>
              <p className="max-w-md text-base text-gray-400">
                The referral fee is only available when someone unlocks from
                your follower&apos;s link. The transaction will automatically
                happen in the background.
              </p>
            </div>
            <div className="flex items-center gap-2 font-bold uppercase">
              <CryptoIcon symbol={lock?.tokenSymbol || ""} />
              <div>
                {ethers.utils.formatUnits(
                  ethers.BigNumber.from(lock?.price || 0)
                    .div(100)
                    .mul(referralFee)
                    .toString(),
                  lock?.decimals || 0
                )}{" "}
                {lock?.tokenSymbol || ""}
              </div>
            </div>
          </div>
          {chain && chain.id === network && (
            <Button
              loading={isLoading}
              onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);
                const feeBasisPoint = referralFee * 100;
                if (feeBasisPoint !== lock?.referral) {
                  const wallet = await walletService.connect();
                  await wallet.setReferrerFee({
                    feeBasisPoint,
                    lockAddress: lock!.address,
                    address: ethers.constants.AddressZero,
                  });
                }
                CreatePostState.step = 3;
                setIsLoading(false);
              }}
            >
              Looks Good
            </Button>
          )}
          {chain && chain.id !== network && (
            <Button
              loading={isSwitchingNetwork}
              onClick={async (event) => {
                try {
                  event.preventDefault();
                  await switchNetworkAsync?.(network as number);
                } catch (error) {
                  onWalletInteractionError(error);
                }
              }}
              className="w-full"
            >
              Switch Network
            </Button>
          )}
        </div>
      )}
    </Layout>
  );
}
