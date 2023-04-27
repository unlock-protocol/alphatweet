import NextLink from "next/link";
import { ReactComponent as LogoIcon } from "@/icons/logo.svg";

export function PostNavigation() {
  return (
    <div className="w-full border-b-2 bg-brand-dark border-brand-blue-gray">
      <div className="flex items-center justify-start w-full h-20 max-w-5xl p-6 mx-auto">
        <NextLink href="/">
          <LogoIcon />
        </NextLink>
      </div>
    </div>
  );
}
