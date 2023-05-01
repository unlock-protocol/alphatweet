import NextLink from "next/link";
import { ReactComponent as LogoIcon } from "@/icons/logo.svg";

export function MobileNavigation() {
  return (
    <div className="flex items-center justify-start w-full h-20 p-6 mx-auto border-b-2 sm:hidden bg-brand-dark border-brand-blue-gray">
      <NextLink href="/">
        <LogoIcon />
      </NextLink>
    </div>
  );
}
