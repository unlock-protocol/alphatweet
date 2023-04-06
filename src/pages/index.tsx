import DefaultLayout from "@/components/Layouts/Default";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { routes } from "@/config/routes";
import { Home } from "@/components/Home";

const IndexPage: NextPage = () => {
  return (
    <DefaultLayout>
      <NextSeo {...routes.home.seo} />
      <Home />
    </DefaultLayout>
  );
};
export default IndexPage;
