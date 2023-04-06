import { toast } from "react-hot-toast";

export const onWalletInteractionError = (error: any) => {
  switch (error.code) {
    case -32000: // WalletConnect: user rejected
    case 4001: // MetaMask: user rejected
    case "ACTION_REJECTED": // MetaMask: user rejected
      console.error("User rejected");
      toast.error("You rejected the transaction. Please try again.");
      break;
    default:
      console.error("Unknown error", error);
      toast.error("Unexpected error. Please try again later.");
  }
};
