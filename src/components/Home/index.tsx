import { Button } from "../Button";
import { Connect } from "../Connect";
import { HomeFeed } from "../Feed";
import NextLink from "next/link";

export function Home() {
  return (
    <div className="grid gap-12 sm:grid-cols-12">
      <div className="grid gap-6 sm:col-span-8">
        <HomeFeed />
      </div>
      <div className="w-full sm:col-span-4">
        <Connect>
          <div className="p-6 border-t">
            <NextLink href="/create">
              <Button color="outline"> Create Alpha</Button>
            </NextLink>
          </div>
        </Connect>
      </div>
    </div>
  );
}
