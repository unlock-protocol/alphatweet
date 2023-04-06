import { useForm } from "react-hook-form";
import { Input } from "../../Input";
import { ComboBox } from "../../ComboBox";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../Button";
import { Disclosure } from "@headlessui/react";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { useNetworkOptions } from "../hooks";

import { subgraph } from "@/config/subgraph";
import { CreatePostState } from "../store";
import SelectNetwork from "@/components/SelectNetwork";
import { networks } from "@unlock-protocol/networks";

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
  } = useForm<ConnectLockProps>();
  const [network, setNetwork] = useState(networks[137]);

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
          Connect with existing Lock
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
          <Input
            label="Lock Address"
            {...register("address", {
              required: {
                value: true,
                message: "Lock Address is required",
              },
            })}
            error={errors.address?.message}
          />
          <Button loading={isSubmitting} type="submit">
            Connect Lock
          </Button>
        </form>
      </Disclosure.Panel>
    </Disclosure>
  );
}
