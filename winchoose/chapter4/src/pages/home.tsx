import { Link, useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const authMessage = (
    location.state as { authMessage?: string; loginMessage?: string } | null
  )?.authMessage
    ?? (location.state as { loginMessage?: string } | null)?.loginMessage;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,63,156,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.14),_transparent_30%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {authMessage ? (
            <div className="mb-6 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
              {authMessage}
            </div>
          ) : null}

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ff67b8]">
            Chapter 4 Mission
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl">
            커스텀 훅으로
            <br />
            로그인 경험까지 직접 만들기
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">
            영화 페이지에 이어 이번에는 로그인과 회원가입 흐름까지 연결해서,
            폼 상태 관리와 유효성 검사를 더 견고하게 다듬어 보세요.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="rounded-xl bg-[#ff3fa2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff5bb0]"
            >
              회원가입하러 가기
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              로그인하러 가기
            </Link>
            <Link
              to="/movies/popular"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              영화 페이지 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
