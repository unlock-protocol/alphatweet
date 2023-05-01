import { AppConfig } from "@/config/app";
import { Button } from "../Button";
import { Editor } from "../Editor";
import { CreatePostState } from "./store";
import { Layout } from "./Layout";
import { useState } from "react";
import { Header } from "./Header";

export function Content() {
  const [content, setContent] = useState<undefined | string>("");
  return (
    <Layout>
      <div className="space-y-6">
        <Header
          title="Create Content"
          subTitle="Your readers will only be able to read this after they unlock access."
        />
        <Editor value={content} onChange={setContent} />
        <Button
          disabled={!content}
          onClick={(event) => {
            event.preventDefault();
            CreatePostState.content = content;
            CreatePostState.step = 1;
          }}
        >
          Create Post
        </Button>
      </div>
    </Layout>
  );
}
