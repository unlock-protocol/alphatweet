import { subgraph } from "@/config/subgraph";
import { ethers } from "ethers";
import {
  getErc20Decimals,
  getErc20TokenSymbol,
} from "@unlock-protocol/unlock-js";
import { networks } from "@unlock-protocol/networks";
import { UnlockWeb3Client } from "@/config/unlock";

interface Options {
  address: string;
  network: number;
}

export async function getLock({ address, network }: Options) {
  const response = await subgraph.lock(
    {
      where: {
        address: address.toLowerCase().trim(),
      },
    },
    {
      network,
    }
  );

  if (!response) {
    return {};
  }

  const provider = new ethers.providers.JsonRpcProvider(
    networks[network].provider
  );
  const referralFeePromise = UnlockWeb3Client.referrerFees({
    lockAddress: response.address,
    network: response.network,
    address: ethers.constants.AddressZero,
  });

  const [decimals, tokenSymbol, referral] = await Promise.all(
    response.tokenAddress &&
      response.tokenAddress !== ethers.constants.AddressZero
      ? [
          getErc20Decimals(response.tokenAddress, provider),
          getErc20TokenSymbol(response.tokenAddress, provider),
          referralFeePromise,
        ]
      : [18, networks[network].nativeCurrency.symbol, referralFeePromise]
  );

  return {
    decimals,
    tokenSymbol,
    referral,
    name: response.name,
    address: response.address,
    network: response.network,
    tokenAddress: response.tokenAddress,
    symbol: response.symbol,
    price: response.price,
    expirationDuration: response.expirationDuration,
    quantity: response.maxNumberOfKeys,
    sold: response.totalKeys,
    managers: response.lockManagers?.map((item) => item.toLowerCase().trim()),
    formatted: {
      price: ethers.utils.formatUnits(response.price, decimals),
      referral: Math.round((referral || 0) / 100),
      referralFee: ethers.utils.formatUnits(
        ethers.BigNumber.from(response.price)
          .mul(Math.round((referral || 0) / 100))
          .div(100),
        decimals
      ),
      totalReferralFee: ethers.utils.formatUnits(
        ethers.BigNumber.from(response.price)
          .mul(Math.round((referral || 0) / 100))
          .div(100)
          .mul(response.totalKeys || 0),
        decimals
      ),
      quantity:
        response.maxNumberOfKeys === ethers.constants.MaxUint256.toString()
          ? "Unlimited"
          : response.maxNumberOfKeys.toString(),
    },
  } as const;
}
