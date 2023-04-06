import { CreatePostForm } from "@/components/Create";
import { ConnectedLayout } from "@/components/Layouts/ConnectedLayout";
import DefaultLayout from "@/components/Layouts/Default";
import { routes } from "@/config/routes";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

const CreatePage: NextPage = () => {
  return (
    <ConnectedLayout>
      <DefaultLayout>
        <NextSeo {...routes.create.seo} />
        <CreatePostForm />
      </DefaultLayout>
    </ConnectedLayout>
  );
};

export default CreatePage;
