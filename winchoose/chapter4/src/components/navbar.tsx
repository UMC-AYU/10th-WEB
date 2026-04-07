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
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 text-sm font-semibold text-zinc-400 sm:px-6 lg:px-8">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              isActive
                ? "text-lime-600"
                : "transition-colors duration-200 hover:text-zinc-700"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
