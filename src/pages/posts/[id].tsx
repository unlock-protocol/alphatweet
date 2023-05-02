import DefaultLayout from "@/components/Layouts/Default";
import { supabaseAdminClient } from "@/config/supabase.server";
import { formatter } from "@/utils/formatters";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Post } from "@/components/Post";
import PostLayout from "@/components/Layouts/PostLayout";

const PostPage: NextPage = ({ preview_content, author_address }: any) => {
  const router = useRouter();
  const id = router.query?.id?.toString();
  const referrer = router.query?.referrer?.toString();

  return (
    <PostLayout>
      <NextSeo
        title={`Alpha shared by ${formatter.minifyAddress(author_address)}`}
        description={preview_content}
        openGraph={{
          title: `Alpha shared by ${formatter.minifyAddress(author_address)}`,
          description: preview_content,
          images: [
            {
              alt: "AlphaTweet Post",
              url: formatter.ogTweetURL({
                title: preview_content,
                author: author_address,
              }),
            },
          ],
        }}
      />
      {!id && <div> No post found </div>}
      {id && <Post id={id} referrer={referrer} />}
    </PostLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id?.toString();
  if (!id) return { props: {} };

  const response = await supabaseAdminClient
    .from("posts")
    .select("*")
    .eq("id", id!)
    .single();

  if (response.error) {
    return {
      notFound: true,
    };
  }
  const post = response.data;

  const suceed = await supabaseAdminClient.rpc("upsert_post_view", {
    post_id: post.id,
  });

  if (suceed.error) {
    console.error(suceed.error);
  }

  return {
    props: {
      author_address: post?.author_address ?? null,
      preview_content: post?.preview_content ?? null,
    },
  };
};

export default PostPage;
