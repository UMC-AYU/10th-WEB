import Header from "./header/header";
import { Route } from "./router/route";
import { Routes } from "./router/router";

const TwossuPage = () => <h1>이수 페이지</h1>;
const AeongPage = () => <h1>애옹 페이지</h1>;
const JoyPage = () => <h1>조이 페이지</h1>;
const NotFoundPage = () => <h1>Not Found</h1>;

function App() {
  return (
    <>
      <>
        <Header />
        <Routes>
          <Route path="/twossu" component={TwossuPage} />
          <Route path="/aeong" component={AeongPage} />
          <Route path="/joy" component={JoyPage} />
          <Route path="/not-found" component={NotFoundPage} />
        </Routes>
      </>
    </>
  );
}

export default App;
