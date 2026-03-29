import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
} from "react";
import { useCurrentPath } from "./useCurrentPath";

export const Routes = ({ children }: any) => {
  const currentPath = useCurrentPath();

  const routes = Children.toArray(children).filter(isValidElement);

  const activeRoute = useMemo(() => {
    return routes.find(
      (route: any) => route.props.path === currentPath
    );
  }, [routes, currentPath]);

  if (!activeRoute) {
    const notFoundRoute = routes.find(
      (route: any) => route.props.path === "/not-found"
    );

    return notFoundRoute
      ? cloneElement(notFoundRoute)
      : <h1>404</h1>;
  }

  return cloneElement(activeRoute);
};