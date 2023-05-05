import { ReactNode } from "react";
import { ReactComponent as ConnectedBottomBanner } from "@/icons/connected-bottom.svg";
import { Connect } from "../Connect";

interface Props {
  children: ReactNode;
}

export function SideLayout({ children }: Props) {
  return (
      <div className="grid gap-12 sm:grid-cols-12">
        <div className="grid sm:col-span-8">{children}</div>
        <div className="relative flex flex-col order-first w-full sm:col-span-4 sm:order-last">
          <Connect />
          <ConnectedBottomBanner className="hidden sm:block" />
        </div>
      </div>
  );
}
