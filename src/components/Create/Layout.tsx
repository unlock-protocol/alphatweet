import { ReactNode } from "react";
import { ReactComponent as ConnectedBottomBanner } from "@/icons/connected-bottom.svg";
import { ProgressBar } from "./ProgressBar";
import { Connect } from "../Connect";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div>
      <ProgressBar />
      <div className="grid gap-6 mt-6 sm:grid-cols-12 ">
        <div className="grid sm:col-span-8">{children}</div>
        <div className="relative flex flex-col w-full sm:col-span-4">
          <Connect showBottom={false} />
          <ConnectedBottomBanner />
        </div>
      </div>
    </div>
  );
}
