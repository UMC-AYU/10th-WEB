import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactElement,
} from "react";
import { Route } from "./Route";
import type { LinkProps, RouteProps, RoutesProps } from "./types";
import { getCurrentPath, navigateTo, PUSHSTATE_EVENT } from "./utils";

const useCurrentPath = () => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const handleChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener("popstate", handleChange);
    window.addEventListener(PUSHSTATE_EVENT, handleChange);

    return () => {
      window.removeEventListener("popstate", handleChange);
      window.removeEventListener(PUSHSTATE_EVENT, handleChange);
    };
  }, []);

  return path;
};

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (getCurrentPath() === to) {
      return;
    }

    navigateTo(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

const isRouteElement = (
  element: unknown,
): element is ReactElement<RouteProps> => {
  return isValidElement(element) && element.type === Route;
};

export const Routes = ({ children }: RoutesProps) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) {
    return <h1>404</h1>;
  }

  return cloneElement(activeRoute);
};
