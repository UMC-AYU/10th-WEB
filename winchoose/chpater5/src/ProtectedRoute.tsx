import { useEffect } from "react";

type ProtectedRouteProps = {
  isLoggedIn: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps) {
  useEffect(() => {
    if (!isLoggedIn) {
      window.history.replaceState(null, "", "/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return children;
}

export default ProtectedRoute;
