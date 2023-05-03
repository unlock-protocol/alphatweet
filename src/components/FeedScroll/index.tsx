import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  size?: "small" | "medium";
}

export function FeedScroll({ children, size = "medium" }: Props) {
  return (
    <ScrollArea.Root className="w-full h-full overflow-hidden rounded">
      <ScrollArea.Viewport
        className={`w-full rounded ${
          size === "small" ? "h-96" : size === "medium" ? "h-[600px]" : ""
        }`}
      >
        <div className="pr-3">{children}</div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-brand-dark transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-brand-blue-gray rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-brand-dark transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="flex-1 bg-brand-blue-gray  rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-brand-dark" />
    </ScrollArea.Root>
  );
}
