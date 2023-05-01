import { networks } from "@unlock-protocol/networks";
import { WalletService } from "@unlock-protocol/unlock-js";
import { useCallback } from "react";
import { useProvider, useSigner } from "wagmi";

export const useWalletService = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const connect = useCallback(async () => {
    const walletService = new WalletService(networks);
    await walletService.connect(provider, signer as any);
    return walletService;
  }, [provider, signer]);
  return {
    connect,
  };
};
