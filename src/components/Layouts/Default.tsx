import { ReactNode } from "react";
import { Navigation, MobileTop } from "../Navigation";
import { Footer } from "../Footer";

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen gap-6">
      <MobileTop />
      <Navigation />
      <main className="flex-1 w-full max-w-5xl px-6 mx-auto">{children}</main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
