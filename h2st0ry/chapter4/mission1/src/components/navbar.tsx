import { NavLink } from "react-router-dom";

const menus = [
  { path: "/", name: "홈" },
  { path: "/movies/popular", name: "인기영화" },
  { path: "/movies/now-playing", name: "상영중" },
  { path: "/movies/top-rated", name: "평점높은" },
  { path: "/movies/upcoming", name: "개봉예정" },
] as const;

const Navbar = () => {
  const baseStyle = "px-2 py-1 rounded-lg transition";
  const activeStyle = "text-[#6f472c] underline";
  const inactiveStyle =
    "text-black hover:text-[#6f472c] hover:underline hover:decoration-[#6f472c]";

  return (
    <nav className="flex mt-20 ml-10 w-[100%] h-15 items-center">
      {menus.map((menu) => (
        <NavLink
          key={menu.path}
          to={menu.path}
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          {menu.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
