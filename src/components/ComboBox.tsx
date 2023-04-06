import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { FaAngleDown as UpDownIcon } from "react-icons/fa";

export interface ComboBoxItem<T = any> {
  id: string | null;
  name?: string;
  value: T;
}

interface Props<T = any> {
  label: string;
  items: ComboBoxItem<T>[];
  onChange(config: ComboBoxItem<T>): void;
  value: ComboBoxItem<T>;
  disabled?: boolean;
  createItem?(query: string): ComboBoxItem<T>;
}

export function ComboBox<T>({
  items,
  onChange,
  value,
  disabled,
  createItem,
  label,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const filteredItems =
    query === ""
      ? items
      : items.filter((item) =>
          item?.name
            ?.toLowerCase()
            ?.replace(/\s+/g, "")
            ?.includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={value} disabled={disabled} onChange={onChange}>
      <div className="relative z-10 mt-1">
        <div className="space-y-2">
          <label
            htmlFor="network"
            className="pl-1 font-medium text-brand-pale-blue"
          >
            {label}
          </label>
          <div className="relative w-full p-1 overflow-hidden text-left rounded-lg cursor-default bg-brand-blue-gray ring-1 ring-transparent focus:ring-brand-blue focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue focus-visible:ring-opacity-75 focus-visible:ring-offset-1">
            <Combobox.Input
              className="w-full py-2 pl-3 pr-10 leading-5 text-gray-100 border-none rounded-lg outline-none ring-1 ring-transparent focus:ring-brand-blue bg-brand-blue-gray disabled:cursor-not-allowed disabled:opacity-75"
              displayValue={(item: ComboBoxItem<T>) =>
                item?.name || "No option selected"
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <UpDownIcon
                className="w-5 h-5 text-brand-pale-blue"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-brand-dark max-h-60 ring-1 ring-brand-pale-blue ring-opacity-5 focus:outline-none sm:text-base">
            {query.length > 0 && filteredItems.length <= 0 && createItem && (
              <Combobox.Option
                onClick={() => {
                  createItem(query);
                }}
                value={{ id: null, name: query }}
                className={({ active }) =>
                  `relative cursor-default select-none rounded-lg py-2 pl-10 pr-4 ${
                    active
                      ? "bg-brand-blue-gray text-white cursor-pointer"
                      : "text-gray-100"
                  }`
                }
              >
                Create &quot;{query}&quot;
              </Combobox.Option>
            )}
            {filteredItems.map((item) => (
              <Combobox.Option
                key={item.id}
                className={({ active }) =>
                  `relative cursor-default select-none rounded-lg py-2 pl-10 pr-4 ${
                    active
                      ? "cursor-pointer text-gray-50 bg-brand-blue-gray"
                      : "text-gray-200"
                  }`
                }
                value={item}
              >
                {({ selected, active }) => (
                  <div
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {item.name}
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
