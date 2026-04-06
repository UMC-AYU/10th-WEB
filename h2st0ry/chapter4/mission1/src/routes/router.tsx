import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root-layout";
import HomePage from "../pages/Home";
import MoviesPage from "../pages/Movies";
import MovieDetailPage from "../pages/Movie-Detail";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies/:category", element: <MoviesPage /> },
      { path: "movies/detail/:movieId", element: <MovieDetailPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
