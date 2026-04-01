import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home";
import MovieDetailPage from "./pages/movie-detail";
import NotFound from "./pages/not-found";
import Movies from "./pages/movies";
import RootLayout from "./layout/root-layout";

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
        path: "movies/popular",
        element: <Movies category="popular" />,
      },
      {
        path: "movies/now-playing",
        element: <Movies category="now_playing" />,
      },
      {
        path: "movies/top-rated",
        element: <Movies category="top_rated" />,
      },
      {
        path: "movies/upcoming",
        element: <Movies category="upcoming" />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
