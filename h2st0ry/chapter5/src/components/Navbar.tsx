import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#6f4e37] text-white">
      <Link to="/" className="text-xl font-bold">
        Gromit
      </Link>

      <Link
        to="/member"
        className={`hover:text-[#e6d3b3] ${
          !token ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        구독자 전용
      </Link>

      <div>
        {!token ? (
          <Link to="/login" className="hover:text-[#e6d3b3]">
            로그인
          </Link>
        ) : (
          <button onClick={handleLogout} className="hover:text-[#e6d3b3]">
            로그아웃
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
