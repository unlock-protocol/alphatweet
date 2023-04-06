import { ReactNode } from "react-markdown/lib/ast-to-react";

interface Props {
  children: ReactNode;
}

export function Container({ children }: Props) {
  return <div className="p-6 xl:p-0">{children}</div>;
}
