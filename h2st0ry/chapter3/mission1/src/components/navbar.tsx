import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center gap-10 w-100 h-15 bg-[#673e1f] text-white rounded-4xl mx-6 mt-4 shadow-md">
      <Link to="/">홈 페이지로 이동</Link>
      <Link to="/movies">영화 목록 페이지로 이동</Link>
    </nav>
  );
};

export default Navbar;
