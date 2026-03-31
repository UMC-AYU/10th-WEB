import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import RootLayout from "./layout/root-layout";
import MoviesPage from "./pages/Movies";
import MovieDetailPage from "./pages/Movie-Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies/:category",
        element: <MoviesPage />,
      },
      {
        path: "movies/detail/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
