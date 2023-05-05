import { Header } from "../Header";
import { SideLayout } from "../../Layouts/SideLayout";
import { ConnectLock } from "./ConnectLock";
import { CreateLock } from "./CreateLock";

export function Lock() {
  return (
    <SideLayout>
      <div className="space-y-6">
        <Header
          title="Gate Settings"
          subTitle="ALPHAtweet is powered by the Unlock Protocol. You can use an existing Lock or create a new one right here, to token-gate your content."
        />
        <CreateLock />
        <ConnectLock />
      </div>
    </SideLayout>
  );
}
