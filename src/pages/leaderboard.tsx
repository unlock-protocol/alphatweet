import DefaultLayout from "@/components/Layouts/Default";
import { Leaderboard } from "@/components/Leaderboard";
import { routes } from "@/config/routes";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

const ReferralPage: NextPage = () => {
  return (
    <DefaultLayout>
      <NextSeo {...routes.leaderboard.seo} />
      <Leaderboard />
    </DefaultLayout>
  );
};

export default ReferralPage;
