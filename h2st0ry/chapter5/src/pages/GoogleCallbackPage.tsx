import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }

    navigate("/"); // 홈으로 이동
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default GoogleCallbackPage;