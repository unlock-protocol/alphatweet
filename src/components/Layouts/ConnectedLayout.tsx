import { useSigned } from "@/hooks/useSigned";
import { ConnectKitButton } from "connectkit";
import { ReactComponent as FooterCherryIcon } from "@/icons/img-footer-cherry.svg";
import DefaultLayout from "./Default";
export interface Props {
  children: React.ReactNode;
}

export function ConnectedLayout({ children }: Props) {
  if (useSigned()) return <>{children}</>;

  return (
    <DefaultLayout>
      <div className="grid items-center h-full justify-items-center md:grid-cols-12">
        <div className="space-y-6 md:col-span-8">
          <header className="space-y-4">
            <h1 className="text-xl font-bold md:text-5xl">
              Create your tweet & monetize it right at start.
            </h1>
            <p className="text-xl text-gray-300">
              ALPHAtweet enables you to token-gate your tweets & empower your
              followers to earn rewards.
            </p>
          </header>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <ConnectKitButton.Custom>
                {({ show }) => (
                  <button
                    className="inline-flex justify-center gap-2 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out rounded-full cursor-pointer w-44 box-borderitems-center disabled:bg-opacity-75 disabled:cursor-not-allowed bg-brand-blue hover:bg-opacity-75 disabled:hover:bg-brand-blue disabled:hover:bg-opacity-50"
                    onClick={show}
                  >
                    {" "}
                    Connect{" "}
                  </button>
                )}
              </ConnectKitButton.Custom>
            </div>
          </div>
        </div>
        <div className="md:col-span-4">
          <FooterCherryIcon />
        </div>
      </div>
    </DefaultLayout>
  );
}
