import type { ComponentType } from "react";

export type RouteProps = {
  path: string;
  component: ComponentType;
};

export const Route = ({ component: Component }: RouteProps) => {
  return <Component />;
};