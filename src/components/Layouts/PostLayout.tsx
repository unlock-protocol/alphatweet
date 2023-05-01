import { ReactNode } from "react";
import { MobileNavigation, PostNavigation } from "../Navigation";
import { Footer } from "../Footer";

interface Props {
  children: ReactNode;
}

export function PostLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen gap-6">
      <PostNavigation />
      <main className="flex-1 w-full max-w-5xl px-6 mx-auto">{children}</main>
      <Footer />
    </div>
  );
}

export default PostLayout;
