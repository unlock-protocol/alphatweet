import { resetCreatePost, useCreatePostState } from "./store";
import { useCallback, useEffect } from "react";
import { Content } from "./Content";
import { Lock } from "./Lock";
import { Reward } from "./Reward";
import { Preview } from "./Preview";
import { Share } from "./Share";

export function CreatePostForm() {
  const { step } = useCreatePostState();

  const FormStepComponent = useCallback(() => {
    switch (step) {
      case 0:
        return <Content />;

      case 1:
        return <Lock />;

      case 2:
        return <Reward />;

      case 3:
        return <Preview />;

      case 4:
        return <Share />;

      default:
        return <Content />;
    }
  }, [step]);

  return (
    <div className="grid w-full gap-6">
      <FormStepComponent />
    </div>
  );
}
