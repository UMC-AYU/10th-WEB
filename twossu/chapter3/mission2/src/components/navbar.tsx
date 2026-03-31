import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="">
      <Link to="/">홈</Link>
      <Link to="/movies">인기 영화</Link>
      <Link to="/now-playing">상영 중</Link>
      <Link to="/top-rated">평점 높은</Link>
      <Link to="/upcoming">개봉 예정</Link>
    </nav>
  );
};

export default Navbar;
