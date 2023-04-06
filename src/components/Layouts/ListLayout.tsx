import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ListLayout({ children }: Props) {
  return (
    <div className="grid w-full grid-cols-1 gap-24 mx-auto sm:p-0 sm:grid-cols-2">
      {children}
    </div>
  );
}
