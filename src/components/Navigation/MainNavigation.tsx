import NextLink from "next/link";
import { ReactComponent as CreateIcon } from "@/icons/create.svg";
import { ReactComponent as HomeIcon } from "@/icons/home.svg";
import { ReactComponent as LeaderboardIcon } from "@/icons/referral.svg";
import { ReactComponent as ProfileIcon } from "@/icons/profile.svg";
import { ReactComponent as LogoIcon } from "@/icons/logo.svg";
import { useRouter } from "next/router";

const NAVIGATIONAL_ITEMS = [
  {
    name: "Home",
    href: "/",
    IconComponent: HomeIcon,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    IconComponent: LeaderboardIcon,
  },
  {
    name: "Profile",
    href: "/profile",
    IconComponent: ProfileIcon,
  },
  {
    name: "Create",
    href: "/create",
    IconComponent: CreateIcon,
  },
];

export function Navigation() {
  const router = useRouter();
  return (
    <nav className="fixed bottom-0 z-10 w-full border-b-2 sm:z-0 sm:relative sm:bottom-auto bg-brand-dark border-brand-blue-gray">
      <div className="w-full h-0.5 bg-cherry-shine sm:hidden"></div>
      <div className="flex items-center justify-between w-full h-20 max-w-5xl p-6 mx-auto">
        <div className="hidden sm:block">
          <NextLink href="/">
            <LogoIcon />
          </NextLink>
        </div>
        <div className="grid items-center w-full max-w-lg grid-flow-col gap-6">
          {NAVIGATIONAL_ITEMS.map((item) => {
            const routerPath = router.pathname
              .split("/")?.[1]
              ?.toLowerCase()
              ?.trim();
            const isActive =
              routerPath === item.href.toLowerCase().trim().slice(1);
            return (
              <NextLink
                className={`flex items-center gap-2 flex-col group hover:text-brand-pale-blue sm:flex-row ${
                  isActive ? "text-brand-pale-blue" : "text-gray-300"
                }`}
                key={item.name}
                href={item.href}
              >
                <item.IconComponent
                  className={`${
                    isActive ? "fill-brand-pale-blue" : "fill-gray-300"
                  } group-hover:fill-brand-pale-blue`}
                />
                <span className="text-sm sm:text-base">{item.name}</span>
              </NextLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
