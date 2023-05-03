import { useSIWE } from "connectkit";
import { useAccount } from "wagmi";

export const useSigned = (): boolean => {
  const { isConnected } = useAccount();
  const { isSignedIn } = useSIWE();
  return isSignedIn && isConnected;
};
