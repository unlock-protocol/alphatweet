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
        <div className="grid gap-12 md:grid-cols-12 md:px-0">
          <div className="md:col-span-8">
            <AuthorFeed address={address!} />
          </div>
          <div className="order-first md:order-last md:col-span-4">
            <Connect />
          </div>
        </div>
      </DefaultLayout>
    </ConnectedLayout>
  );
};

export default ProfilePage;
