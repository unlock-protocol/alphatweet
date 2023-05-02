import React, { ReactNode } from "react";
import * as RadixToolTip from "@radix-ui/react-tooltip";

interface Props {
  children: ReactNode;
  content: ReactNode;
}

const ToolTip = ({ children, content }: Props) => {
  return (
    <RadixToolTip.Root>
      <RadixToolTip.Trigger className="cursor-pointer" asChild>
        {children}
      </RadixToolTip.Trigger>
      <RadixToolTip.Portal>
        <RadixToolTip.Content
          className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade text-gray-200 data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-brand-blue-gray px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
          sideOffset={5}
        >
          {content}
          <RadixToolTip.Arrow className="text-brand-blue-gray" />
        </RadixToolTip.Content>
      </RadixToolTip.Portal>
    </RadixToolTip.Root>
  );
};

export default ToolTip;
