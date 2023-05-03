import { Connect, ProfileShell } from "@/components/Connect";
import { AuthorFeed } from "@/components/Feed";
import { ConnectedLayout } from "@/components/Layouts/ConnectedLayout";
import DefaultLayout from "@/components/Layouts/Default";
import { routes } from "@/config/routes";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { address: connected } = useAccount();
  const address = router.query.address?.toString().toLowerCase().trim();
  const isConnectedAddress =
    address?.toLowerCase()?.trim() === connected?.toLowerCase()?.trim();
  return (
    <ConnectedLayout>
      <DefaultLayout>
        <NextSeo {...routes.profile.seo} />
        <div className="grid gap-12 sm:grid-cols-12 sm:px-0">
          <div className="sm:col-span-8">
            {!address && <div> No profile found </div>}
            {address && <AuthorFeed address={address} />}
          </div>
          <div className="sm:col-span-4">
            {!isConnectedAddress && address && (
              <ProfileShell address={address!} />
            )}
            {isConnectedAddress && <Connect />}
          </div>
        </div>
      </DefaultLayout>
    </ConnectedLayout>
  );
};

export default ProfilePage;
