import { ReactComponent as LogoBottomIcon } from "@/icons/logo-bottom.svg";
import NextLink from "next/link";

const FOOTER_ITEMS = [
  {
    href: "/create",
    name: "Create your Alpha",
  },

  {
    name: "Discord",
    href: "https://discord.gg/unlock-protocol",
  },
  {
    href: "/privacy",
    name: "Privacy Policy",
  },
];

export function Footer() {
  return (
    <footer className="relative px-6 py-16 pb-32">
      <div className="grid w-full max-w-5xl gap-6 mx-auto sm:grid-cols-2">
        <div className="flex flex-col items-center w-full gap-4 text-center sm:items-start sm:justify-start sm:text-left">
          <LogoBottomIcon />
          <p>
            Empower creators rewarding & create health community with followers.
          </p>
        </div>
        <div className="flex flex-col items-center justify-end w-full gap-6 sm:flex-row">
          {FOOTER_ITEMS.map((item) => (
            <NextLink key={item.name} href={item.href}>
              {item.name}
            </NextLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
