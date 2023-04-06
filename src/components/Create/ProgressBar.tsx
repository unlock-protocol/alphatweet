import { CreatePostState, useCreatePostState } from "./store";
import { ReactComponent as CherryIcon } from "@/icons/cherry.svg";

const MAX_STEPS = 5;

export function ProgressBar() {
  const { step } = useCreatePostState();
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div>
        <h1 className="text-lg font-bold"> Create Alpha </h1>
      </div>
      <div className="flex items-center gap-4">
        {Array.from({ length: MAX_STEPS }).map((_, index) => {
          const isActive = index <= step;
          return (
            <button
              disabled={!isActive}
              aria-label={`Move to step ${step}`}
              key={index}
              className={`${
                isActive ? "fill-brand-pale-blue" : "fill-gray-400"
              }`}
              onClick={(event) => {
                event.preventDefault();
                CreatePostState.step = index;
              }}
            >
              <CherryIcon key={index} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
