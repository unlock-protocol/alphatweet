interface Options {
  address: string;
  network: number;
  referrer?: string;
}

export const getCheckoutConfig = ({ address, network, referrer }: Options) => {
  return {
    locks: {
      [address]: {
        network,
      },
    },
    referrer,
    skipRecipient: true,
    pessimistic: true,
  };
};
