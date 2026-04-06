import "./App.css";
import { Link, Route, Routes } from "./router";

const HomePage = () => <h1>홈페이지</h1>;
const GromitPage = () => <h1>그로밋 페이지</h1>;
const WallacePage = () => <h1>월레스 페이지</h1>;
const McGrawPage = () => <h1>맥그로 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => {
  return (
    <div className="flex justify-center mb-8">
      <nav className="flex gap-6 bg-[#8b5e3c] px-6 py-3 rounded-full shadow-md">
        <Link
          to="/gromit"
          className="text-white px-3 py-1 rounded-full hover:bg-[#6f472c] transition"
        >
          GROMIT
        </Link>

        <Link
          to="/wallace"
          className="text-white px-3 py-1 rounded-full hover:bg-[#6f472c] transition"
        >
          WALLACE
        </Link>

        <Link
          to="/mcgraw"
          className="text-white px-3 py-1 rounded-full hover:bg-[#6f472c] transition"
        >
          MCGRAW
        </Link>

        <Link
          to="/not-found"
          className="text-white px-3 py-1 rounded-full hover:bg-[#a67c52] transition"
        >
          NOT FOUND
        </Link>
      </nav>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#3e2c23]">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Header />
        <Routes>
          <Route path="/" component={HomePage} />
          <Route path="/gromit" component={GromitPage} />
          <Route path="/wallace" component={WallacePage} />
          <Route path="/mcgraw" component={McGrawPage} />
          <Route path="/not-found" component={NotFoundPage} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
