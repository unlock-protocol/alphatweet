import { useSIWE } from "connectkit";
import { useAccount } from "wagmi";

export const useSigned = () => {
  const { isConnected } = useAccount();
  const { isSignedIn } = useSIWE();
  return isSignedIn && isConnected;
};
