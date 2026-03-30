import "./App.css";
import { Route } from "./Route";
import { Link, Routes } from "./Router";

const Header = () => {
  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <Link to="/taek">TAEK</Link>
      <Link to="/aeong">AEONG</Link>
      <Link to="/joy">JOY</Link>
      <Link to="/not-found">NOT FOUND</Link>
    </nav>
  );
};

const MatthewPage = () => <h1>택이 페이지</h1>;
const AeongPage = () => <h1>애옹 페이지</h1>;
const JoyPage = () => <h1>조이 페이지</h1>;
const NotFoundPage = () => <h1>Not Found 페이지</h1>;

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/taek" component={MatthewPage} />
        <Route path="/aeong" component={AeongPage} />
        <Route path="/joy" component={JoyPage} />
        <Route path="/not-found" component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;
