import { Header } from "../Header";
import { Layout } from "../Layout";
import { ConnectLock } from "./ConnectLock";
import { CreateLock } from "./CreateLock";

export function Lock() {
  return (
    <Layout>
      <div className="space-y-6">
        <Header
          title="Gate Settings"
          subTitle="ALPHAtweet is powered by Unlock Protocol. You can use any existing Lock or create one right here, it's super simple to deploy the contract."
        />
        <CreateLock />
        <ConnectLock />
      </div>
    </Layout>
  );
}
