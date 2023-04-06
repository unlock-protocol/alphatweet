import DefaultLayout from "@/components/Layouts/Default";
import { Referral } from "@/components/Referral";
import { routes } from "@/config/routes";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

const ReferralPage: NextPage = () => {
  return (
    <DefaultLayout>
      <NextSeo {...routes.referral.seo} />
      <Referral />
    </DefaultLayout>
  );
};

export default ReferralPage;
