import { Connect } from "@/components/Connect";
import { AuthorFeed } from "@/components/Feed";
import { ConnectedLayout } from "@/components/Layouts/ConnectedLayout";
import DefaultLayout from "@/components/Layouts/Default";
import { routes } from "@/config/routes";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useAccount } from "wagmi";

const ProfilePage: NextPage = () => {
  const { address } = useAccount();
  return (
    <ConnectedLayout>
      <DefaultLayout>
        <NextSeo {...routes.profile.seo} />
        <div className="grid gap-12 sm:grid-cols-12 sm:px-0">
          <div className="sm:col-span-8">
            <AuthorFeed address={address!} />
          </div>
          <div className="order-first sm:order-last sm:col-span-4">
            <Connect />
          </div>
        </div>
      </DefaultLayout>
    </ConnectedLayout>
  );
};

export default ProfilePage;
