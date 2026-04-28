import "./App.css";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { api, signIn, signUp } from "./api";
import { getAccessToken, removeTokens } from "./Auth";
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
    const handleAuthExpired = () => {
      setToken(null);
      navigate("/login");
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("auth-expired", handleAuthExpired);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState(null, "", to);
    setPath(to);
  };

  const login = (accessToken: string) => {
    setToken(accessToken);
    navigate("/my");
  };

  const logout = () => {
    removeTokens();
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
          <ProtectedApiPage
            title="내 정보 조회"
            endpoint="GET /v1/users/me"
            requestPath="/users/me"
          />
        </ProtectedRoute>
      )}
      {page === "userDetail" && (
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <ProtectedApiPage
            title="다른 사용자 정보 조회"
            endpoint="GET /v1/users/{userId}"
            requestPath={`/users/${getUserId(path)}`}
          />
        </ProtectedRoute>
      )}
      {page === "protected" && (
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <ProtectedApiPage
            title="토큰 인증 테스트"
            endpoint="GET /v1/auth/protected"
            requestPath="/auth/protected"
          />
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
        Access Token이 만료되면 Refresh Token으로 자동 갱신하고, 실패했던
        요청을 한 번 다시 시도합니다.
      </p>
      <span className={isLoggedIn ? "badge success" : "badge"}>
        {isLoggedIn ? "로그인 상태" : "비로그인 상태"}
      </span>
    </section>
  );
}

function LoginPage({ onLogin }: { onLogin: (accessToken: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const tokens = await signIn(email, password);
      onLogin(tokens.accessToken);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "로그인에 실패했습니다."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setErrorMessage("");
    setIsSigningUp(true);

    try {
      await signUp(email, password);
      const tokens = await signIn(email, password);
      onLogin(tokens.accessToken);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "회원가입에 실패했습니다."));
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <Card title="로그인" endpoint="POST /v1/auth/signin">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          이메일
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email@example.com"
            required
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
            required
          />
        </label>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button className="primary wide" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인하기"}
        </button>
        <button
          className="ghost wide"
          type="button"
          onClick={handleSignUp}
          disabled={isSigningUp || !email || !password}
        >
          {isSigningUp ? "회원가입 중..." : "회원가입 후 로그인"}
        </button>
      </form>
    </Card>
  );
}

function ProtectedApiPage({
  title,
  endpoint,
  requestPath,
}: {
  title: string;
  endpoint: string;
  requestPath: string;
}) {
  const [result, setResult] = useState("아직 요청하지 않았습니다.");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const requestProtectedApi = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.get(requestPath);
      setResult(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "요청에 실패했습니다."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestProtectedApi();

    const intervalId = window.setInterval(() => {
      requestProtectedApi();
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [requestPath]);

  return (
    <Card title={title} endpoint={endpoint}>
      <p>
        401 응답이 오면 axios 응답 인터셉터가 refresh token으로 새 토큰을 받고,
        이 요청을 자동으로 재시도합니다. 확인하기 쉽도록 3초마다 보호 API를
        자동 호출합니다.
      </p>
      <pre>{result}</pre>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button className="primary" onClick={requestProtectedApi} disabled={isLoading}>
        {isLoading ? "요청 중..." : "다시 요청하기"}
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

function getErrorMessage(error: unknown, fallbackMessage: string) {
  const axiosError = error as AxiosError<{ message?: string }>;

  return axiosError.response?.data?.message ?? fallbackMessage;
}

export default App;
