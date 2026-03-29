import { Children, useMemo } from "react";
import type { ReactNode } from "react";
import { Route } from "./Route";
import type { RouteProps } from "./Route";
import { useCurrentPath } from "./useCurrentPath";

type RoutesProps = {
  children: ReactNode;
};

const isRouteElement = (
  child: any
): child is React.ReactElement<RouteProps> => {
  return child?.type === Route;
};

export const Routes = ({ children }: RoutesProps) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;

  return activeRoute;
};