import { useForm } from "react-hook-form";
import { Input } from "../../Input";
import { ComboBox, ComboBoxItem } from "../../ComboBox";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../Button";
import { Disclosure } from "@headlessui/react";
import { RiAddLine as AddIcon } from "react-icons/ri";

import { subgraph } from "@/config/subgraph";
import { CreatePostState } from "../store";
import SelectNetwork from "@/components/SelectNetwork";
import { networks } from "@unlock-protocol/networks";
import { useLocks } from "@/hooks/useLocks";
import { useAccount } from "wagmi";

interface ConnectLockProps {
  network: number;
  address: string;
}

export function ConnectLock() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<ConnectLockProps>({
    defaultValues: {
      network: 137,
    },
  });
  const { address } = useAccount();
  const [network, setNetwork] = useState(networks[137]);

  const { data: locks, isLoading: isLocksLoading } = useLocks({
    owner: address!,
    networks: [network.id],
  });

  const [lock, setLock] = useState<ComboBoxItem<string> | undefined>();

  const items = (locks || []).map((item) => {
    return {
      id: item.address,
      name: item.name,
      value: item.address,
    } as ComboBoxItem<string>;
  });

  useEffect(() => {
    setLock(undefined);
  }, [network]);

  const onSubmit = useCallback(
    async ({ address, network }: ConnectLockProps) => {
      try {
        const lock = await subgraph.lock(
          {
            where: {
              address: address.toLowerCase().trim(),
            },
          },
          {
            network,
          }
        );
        if (!lock) {
          throw new Error("Lock not found");
        }
        CreatePostState.address = lock.address;
        CreatePostState.network = lock.network;
        CreatePostState.step = 2;
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return (
    <Disclosure
      as="div"
      className="grid w-full gap-6 p-6 border border-brand-blue rounded-xl"
    >
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-bold text-brand-pale-blue">
          Use Existing Lock
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
          <SelectNetwork
            value={network}
            onChange={(network) => {
              setNetwork(network);
              setValue("network", network.id);
            }}
          />
          <ComboBox
            value={lock}
            label="Lock Address"
            items={items}
            onChange={(item) => {
              setLock(item);
              setValue("address", item.value);
            }}
            createItem={(item) => {
              return {
                id: item,
                name: item,
                value: item,
              } as ComboBoxItem<string>;
            }}
          />
          <Button loading={isSubmitting} type="submit">
            Connect Lock
          </Button>
        </form>
      </Disclosure.Panel>
    </Disclosure>
  );
}
