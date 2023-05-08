import { Button } from "../Button";
import { Connect } from "../Connect";
import { HomeFeed } from "../Feed";
import NextLink from "next/link";

export function Home() {
  return (
    <div className="grid gap-12 md:grid-cols-12">
      <div className="grid gap-6 md:col-span-8">
        <HomeFeed />
      </div>
      <div className="order-first w-full md:order-last md:col-span-4">
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
