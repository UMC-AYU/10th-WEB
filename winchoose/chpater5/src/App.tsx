import "./App.css";
import { useEffect, useState } from "react";
import { getAccessToken, removeAccessToken, saveMockAccessToken } from "./Auth";
import ProtectedRoute from "./ProtectedRoute";

type Page = "home" | "login" | "me" | "userDetail" | "protected" | "notFound";

function getPage(pathname: string): Page {
  if (pathname === "/") return "home";
  if (pathname === "/login") return "login";
  if (pathname === "/my") return "me";
  if (pathname.startsWith("/users/")) return "userDetail";
  if (pathname === "/auth/protected") return "protected";
  return "notFound";
}

function getUserId(pathname: string) {
  return pathname.split("/")[2] ?? "unknown";
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [token, setToken] = useState(() => getAccessToken());
  const isLoggedIn = Boolean(token);
  const page = getPage(path);

  useEffect(() => {
    const handleRouteChange = () => setPath(window.location.pathname);

    window.addEventListener("popstate", handleRouteChange);

    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState(null, "", to);
    setPath(to);
  };

  const login = () => {
    setToken(saveMockAccessToken());
    navigate("/my");
  };

  const logout = () => {
    removeAccessToken();
    setToken(null);
    navigate("/");
  };

  return (
    <main className="app">
      <header className="topbar">
        <button className="logo" onClick={() => navigate("/")}>
          Chapter 5
        </button>
        <nav>
          <button onClick={() => navigate("/my")}>내 정보</button>
          <button onClick={() => navigate("/users/1")}>유저 1</button>
          <button onClick={() => navigate("/auth/protected")}>
            토큰 테스트
          </button>
        </nav>
        {isLoggedIn ? (
          <button className="ghost" onClick={logout}>
            로그아웃
          </button>
        ) : (
          <button className="primary" onClick={() => navigate("/login")}>
            로그인
          </button>
        )}
      </header>

      {page === "home" && <HomePage isLoggedIn={isLoggedIn} />}
      {page === "login" && <LoginPage onLogin={login} />}
      {page === "me" && (
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Card title="내 정보 조회" endpoint="GET /v1/users/me">
            <p>토큰이 있는 사용자만 볼 수 있는 마이페이지입니다.</p>
          </Card>
        </ProtectedRoute>
      )}
      {page === "userDetail" && (
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Card title="다른 사용자 정보 조회" endpoint="GET /v1/users/{userId}">
            <p>현재 조회 중인 사용자 ID는 {getUserId(path)}입니다.</p>
          </Card>
        </ProtectedRoute>
      )}
      {page === "protected" && (
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Card title="토큰 인증 테스트" endpoint="GET /v1/auth/protected">
            <p>로그인 상태라서 보호된 인증 테스트 페이지에 접근했습니다.</p>
          </Card>
        </ProtectedRoute>
      )}
      {page === "notFound" && (
        <Card title="페이지 없음" endpoint="404">
          <p>존재하지 않는 경로입니다.</p>
        </Card>
      )}
    </main>
  );
}

function HomePage({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <section className="hero">
      <p className="eyebrow">Mission 1</p>
      <h1>Protected Route</h1>
      <p>
        로그인 토큰이 필요한 API 페이지는 보호되고, 비로그인 사용자는 로그인
        페이지로 리다이렉트됩니다.
      </p>
      <span className={isLoggedIn ? "badge success" : "badge"}>
        {isLoggedIn ? "로그인 상태" : "비로그인 상태"}
      </span>
    </section>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  return (
    <Card title="로그인" endpoint="POST /v1/auth/signin">
      <p>
        미션 확인용 간단 로그인입니다. 버튼을 누르면 mock token이 저장됩니다.
      </p>
      <button className="primary wide" onClick={onLogin}>
        로그인하기
      </button>
    </Card>
  );
}

function Card({
  title,
  endpoint,
  children,
}: {
  title: string;
  endpoint: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card">
      <span className="endpoint">{endpoint}</span>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

export default App;
