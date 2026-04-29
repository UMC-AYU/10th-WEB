import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMyInfo } from "../api/auth";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        await getMyInfo();
        setIsAuth(true);
      } catch (err) {
        // 🔥 핵심: 토큰 있으면 "기다려"
        const token = localStorage.getItem("accessToken");

        if (token) {
          // refresh 진행 중일 가능성 → 기다림
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      }
    };

    check();
  }, []);

  if (isAuth === null) return <div>로딩중...</div>;

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;