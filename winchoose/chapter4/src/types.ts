import type { ComponentType, ReactNode } from "react";

export interface RouteProps {
  path: string;
  component: ComponentType;
}

export interface LinkProps {
  to: string;
  children: ReactNode;
}

export interface RoutesProps {
  children: ReactNode;
}
