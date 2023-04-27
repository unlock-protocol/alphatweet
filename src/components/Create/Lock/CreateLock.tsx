import { useForm } from "react-hook-form";
import { Input } from "../../Input";
import { ComboBox } from "../../ComboBox";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../Button";
import { useWalletService } from "@/hooks/useWalletService";
import { Disclosure } from "@headlessui/react";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { CreatePostState } from "../store";
import { ethers } from "ethers";
import SelectNetwork from "@/components/SelectNetwork";
import SelectCurrency from "@/components/SelectCurrency";
import { networks } from "@unlock-protocol/networks";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { onWalletInteractionError } from "@/utils/errors";

interface LockCreateFormData {
  name: string;
  network: number;
  duration: number;
  currencyAddress?: string;
  price: number;
}

export function CreateLock() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<LockCreateFormData>({
    defaultValues: {
      name: "Alpha Tweet Lock",
      duration: 30,
      price: 100,
    },
  });
  const walletService = useWalletService();
  const defaultNetwork = networks[137];
  const [network, setNetwork] = useState(defaultNetwork);
  const [currencyItem, setCurrencyItem] = useState<any>(
    defaultNetwork.nativeCurrency
  );
  const { chain } = useNetwork();
  const { switchNetworkAsync, isLoading: isSwitchingNetwork } =
    useSwitchNetwork();

  const onSubmit = useCallback(
    async (data: LockCreateFormData) => {
      try {
        const wallet = await walletService.connect();
        const lockAddress = await wallet.createLock({
          publicLockVersion: 12,
          expirationDuration: data.duration * 86400,
          maxNumberOfKeys: ethers.constants.MaxUint256.toString(),
          keyPrice: data.price.toString(),
          currencyContractAddress: data?.currencyAddress,
          name: data.name,
        });
        CreatePostState.address = lockAddress;
        CreatePostState.network = data.network;
        CreatePostState.step = 2;
      } catch (error) {
        console.error(error);
      }
    },
    [walletService]
  );

  useEffect(() => {
    if (!network) return;
    setCurrencyItem(network.nativeCurrency);
  }, [network]);

  useEffect(() => {
    setValue("network", network?.id);
    setValue("currencyAddress", undefined);
  }, [network, setValue]);

  return (
    <Disclosure
      as="div"
      className="grid w-full gap-6 p-6 border border-brand-blue rounded-xl"
    >
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-bold text-brand-pale-blue">
          Create New Lock
        </h3>
        <Disclosure.Button
          className="fill-brand-pale-blue"
          aria-label="expand create lock form"
        >
          <AddIcon className="fill-inherit" size={24} />
        </Disclosure.Button>
      </div>
      <Disclosure.Panel>
        <form className="grid w-full gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <SelectNetwork
              value={network}
              onChange={(network) => {
                setNetwork(network);
                setValue("network", network.id);
              }}
            />
            <Input
              label="Name"
              {...register("name", {
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              required
              error={errors.name?.message}
            />
            <Input
              label="Duration (Days)"
              pattern="[0-9]*"
              {...register("duration", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Quantity must be at least 0",
                },
              })}
              required
              error={errors.duration?.message}
            />
            <SelectCurrency
              onChange={(currency) => {
                setCurrencyItem(currency);
                setValue("currencyAddress", currency?.address);
              }}
              network={network.id}
              value={currencyItem}
            />
            <Input
              label="Price"
              {...register("price", {
                valueAsNumber: true,
              })}
              required
              error={errors.price?.message}
            />
          </div>
          {chain && chain.id === network.id && (
            <Button loading={isSubmitting} type="submit" className="w-full">
              Deploy Lock
            </Button>
          )}
          {chain && chain.id !== network.id && (
            <Button
              loading={isSwitchingNetwork}
              onClick={async (event) => {
                try {
                  event.preventDefault();
                  await switchNetworkAsync?.(network.id as number);
                } catch (error) {
                  onWalletInteractionError(error);
                }
              }}
              className="w-full"
            >
              Switch Network
            </Button>
          )}
        </form>
      </Disclosure.Panel>
    </Disclosure>
  );
}
