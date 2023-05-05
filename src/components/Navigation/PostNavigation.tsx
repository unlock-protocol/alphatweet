import NextLink from "next/link";
import { ReactComponent as LogoIcon } from "@/icons/logo.svg";
import { Button } from "../Button";
import { FaPlus as PlusIcon } from "react-icons/fa";

interface Props {
  showCreateButton: boolean;
}

export function PostNavigation({ showCreateButton }: Props) {
  return (
    <div className="w-full border-b-2 bg-brand-dark border-brand-blue-gray">
      <div className="flex items-center justify-between w-full h-20 max-w-5xl p-6 mx-auto">
        <NextLink href="/">
          <LogoIcon />
        </NextLink>
        <div>
          {showCreateButton && (
            <NextLink href="/create">
              <Button icon={<PlusIcon />}>Create Alpha</Button>
            </NextLink>
          )}
        </div>
      </div>
    </div>
  );
}
