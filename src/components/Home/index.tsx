import { Connect } from "../Connect";
import { HomeFeed } from "../Feed";

export function Home() {
  return (
    <div className="grid gap-12 sm:grid-cols-12">
      <div className="grid gap-6 sm:col-span-8">
        <HomeFeed />
      </div>
      <div className="w-full sm:col-span-4">
        <Connect />
      </div>
    </div>
  );
}
