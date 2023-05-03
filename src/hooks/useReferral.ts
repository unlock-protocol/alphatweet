import { UnlockWeb3Client } from "@/config/unlock";
import { networks } from "@unlock-protocol/networks";
import {
  getErc20Decimals,
  getErc20TokenSymbol,
} from "@unlock-protocol/unlock-js";
import { ethers } from "ethers";
import { useQuery } from "wagmi";

interface Options {
  address: string;
  network: number;
}

export const useReferralFee = ({ address, network }: Options) => {
  return useQuery(
    ["referralFee", network, address],
    async () => {
      const provider = new ethers.providers.JsonRpcBatchProvider(
        networks[network].provider
      );
      const referralFeePromise = UnlockWeb3Client.referrerFees({
        lockAddress: address,
        network,
        address: ethers.constants.AddressZero,
      });

      const lockContract = await UnlockWeb3Client.lockContract(
        address,
        network
      );

      const [tokenAddress, price] = await Promise.all([
        lockContract.tokenAddress(),
        lockContract.keyPrice(),
      ]);

      const [decimals, tokenSymbol, referral] = await Promise.all(
        tokenAddress && tokenAddress !== ethers.constants.AddressZero
          ? [
              getErc20Decimals(tokenAddress, provider),
              getErc20TokenSymbol(tokenAddress, provider),
              referralFeePromise,
            ]
          : [18, networks[network].nativeCurrency.symbol, referralFeePromise]
      );

      return {
        decimals,
        tokenSymbol,
        referral,
        tokenAddress,
        price,
        formatted: {
          price: ethers.utils.formatUnits(price, decimals),
          referral: Math.round((referral || 0) / 100),
        },
      };
    },
    {
      enabled: !!address && !!network,
    }
  );
};
