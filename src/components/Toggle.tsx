import { Switch } from "@headlessui/react";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export default function Toggle({ value, onChange, label }: Props) {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      className={
        "bg-brand-blue relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
      }
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className={`${value ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-brand-blue-gray shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
