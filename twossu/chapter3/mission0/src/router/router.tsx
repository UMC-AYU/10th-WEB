import {
  Children,
  cloneElement,
  useMemo,
  useState,
  useEffect,
  isValidElement,
  type FC,
  type ReactElement,
} from "react";
import type { RoutesProps, RouteProps } from "../types/types";
import { getCurrentPath, PUSHSTATE_EVENT } from "../utils/utils";

const isRouteElement = (
  element: unknown,
): element is ReactElement<RouteProps> => {
  return (
    isValidElement(element) &&
    typeof (element.props as RouteProps).path === "string"
  );
};

const useCurrentPath = () => {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const onLocationChange = () => setPath(getCurrentPath());

    window.addEventListener(PUSHSTATE_EVENT, onLocationChange);
    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener(PUSHSTATE_EVENT, onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return path;
};

export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();
  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement(activeRoute);
};
