import DefaultLayout from "@/components/Layouts/Default";
import { routes } from "@/config/routes";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

const PrivacyPage: NextPage = () => {
  return (
    <DefaultLayout>
      <NextSeo {...routes.privacy.seo} />
      <div>Privacy policy</div>
    </DefaultLayout>
  );
};

export default PrivacyPage;
