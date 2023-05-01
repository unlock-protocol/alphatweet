import { ReactNode } from "react";
import { ReactComponent as ConnectedBottomBanner } from "@/icons/connected-bottom.svg";
import { Connect } from "../Connect";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div>
      <div className="grid gap-12 sm:grid-cols-12">
        <div className="grid sm:col-span-8">{children}</div>
        <div className="relative flex flex-col w-full sm:col-span-4">
          <Connect />
          <ConnectedBottomBanner />
        </div>
      </div>
    </div>
  );
}
