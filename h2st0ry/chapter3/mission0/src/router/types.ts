import type { ReactNode } from "react";

export type LinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
};
