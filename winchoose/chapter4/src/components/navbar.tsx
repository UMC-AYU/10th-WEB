import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "홈", end: true },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now-playing", label: "상영 중" },
  { to: "/movies/top-rated", label: "평점 높은" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#121212]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className="text-lg font-extrabold tracking-tight text-[#ff3fa2]"
          >
            돌려돌려LP판
          </NavLink>

          <div className="hidden items-center gap-4 text-sm font-semibold text-zinc-400 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "transition-colors duration-200 hover:text-zinc-200"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              [
                "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                isActive
                  ? "bg-black text-white"
                  : "bg-black/80 text-white hover:bg-black",
              ].join(" ")
            }
          >
            로그인
          </NavLink>
          <NavLink
            to="/"
            className="rounded-md bg-[#ff3fa2] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#ff5bb0]"
          >
            회원가입
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
