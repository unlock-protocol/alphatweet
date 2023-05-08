import { CreatePostState, useCreatePostState } from "./store";
import { Header } from "./Header";
import { MouseEventHandler, useState } from "react";
import { Button } from "../Button";
import { trpc } from "@/config/trpc";
import { SideLayout } from "../Layouts/SideLayout";

export function Preview() {
  const [text, setText] = useState("");
  const { mutateAsync: updatePost, isLoading: isUpdatingPost } =
    trpc.addPost.useMutation();
  const { address, content, network } = useCreatePostState();
  const onPublish: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    CreatePostState.previewContent = text;
    const response = await updatePost({
      content: content!,
      preview_content: text,
      lock_address: address!,
      lock_network: network!,
      is_published: true,
    });
    if (response.id) {
      CreatePostState.post_id = response.id;
    }
    CreatePostState.step = 4;
  };
  return (
    <SideLayout>
      <Header
        title="Create Preview Text"
        subTitle="This is the text people will see when the URL is shared on social media. Get a potential reader's attention with your preview text!"
      />
      <div className="grid gap-6 mt-6">
        <div className="space-y-1">
          <textarea
            onChange={(event) => {
              event.preventDefault();
              setText(event.target.value);
            }}
            maxLength={125}
            placeholder="Write your preview text"
            className="w-full px-4 py-2 outline-none h-36 bg-brand-blue-gray rounded-xl ring-1 ring-transparent focus:ring-brand-pale-blue"
          />
          <p className="text-sm text-gray-400"> 125 characters max.</p>
        </div>
        <Button loading={isUpdatingPost} onClick={onPublish}>
          Publish It
        </Button>
      </div>
    </SideLayout>
  );
}
