import { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  HiCheck as CheckIcon,
  HiChevronUpDown as UpDownIcon,
} from "react-icons/hi2";
import { networks } from "@unlock-protocol/networks";
import { CryptoIcon } from "@unlock-protocol/crypto-icon";

interface Props {
  network: number;
  onChange(currency: any): void;
  value: any;
}

export default function SelectCurrency({ onChange, value, network }: Props) {
  const currencyItems = useMemo(() => {
    const networkConfig = networks[network];
    return [networkConfig?.nativeCurrency, networkConfig?.tokens || []].flat();
  }, [network]);

  return (
    <div>
      <div className="space-y-2">
        <label
          htmlFor="network"
          className="pl-1 font-medium text-brand-pale-blue"
        >
          Currency
        </label>
        <Listbox
          defaultValue={currencyItems[0]}
          value={value}
          onChange={onChange}
        >
          <div className="relative mt-1 ">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default bg-brand-blue-gray focus:outline-none focus-visible:border-brand-pale-blue focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-pale-blue ">
              <div className="flex items-center gap-2 font-medium truncate">
                <CryptoIcon symbol={value?.symbol ?? ""} /> {value?.symbol}
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <UpDownIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-brand-dark max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {currencyItems.map((currencyItems: any, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative  cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-brand-blue-gray text-white"
                          : "text-gray-300"
                      }`
                    }
                    value={currencyItems}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {currencyItems.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                            <CryptoIcon symbol={currencyItems.symbol} />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
