import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "로그인이 필요한 페이지입니다.",
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;