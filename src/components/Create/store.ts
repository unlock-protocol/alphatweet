import { DebugConfig } from "@/config/debugging";
import { useRouter } from "next/router";
import { proxy, useSnapshot } from "valtio";

interface State {
  step: number;
  post_id?: string;
  network?: number;
  address?: string;
  content?: string;
  previewContent?: string;
}

const initialState: State = {
  step: 0,
};

export const CreatePostState = proxy<State>(initialState);

export const resetCreatePost = () => {
  CreatePostState.step = initialState.step;
  CreatePostState.post_id = initialState.post_id;
  CreatePostState.network = initialState.network;
  CreatePostState.address = initialState.address;
  CreatePostState.content = initialState.content;
  CreatePostState.previewContent = initialState.previewContent;
};

export const useCreatePostState = () => {
  const router = useRouter();
  const state = useSnapshot(CreatePostState);
  const debug = Boolean(router.query.debug);
  const debugState: State = {
    step: router.query.step ? parseInt(router.query.step.toString()) : 0,
    address: DebugConfig.CREATE_POST.address,
    network: DebugConfig.CREATE_POST.network,
    content: DebugConfig.CREATE_POST.content,
    previewContent: DebugConfig.CREATE_POST.previewContent,
  };
  return debug ? debugState : state;
};
