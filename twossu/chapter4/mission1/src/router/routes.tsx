import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root-layout";
import NotFound from "../pages/not-found";
import HomePage from "../pages/home";
import Movies from "../pages/movies";
import NowPlayingPage from "../pages/now-playing";
import TopRatedPage from "../pages/top-rated";
import UpcomingPage from "../pages/upcoming";
import MovieDetailPage from "../pages/movie-detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "popular", element: <Movies /> },
      { path: "now_playing", element: <NowPlayingPage /> },
      { path: "top_rated", element: <TopRatedPage /> },
      { path: "upcoming", element: <UpcomingPage /> },
      { path: "movies/:movieId", element: <MovieDetailPage /> },
    ],
  },
]);
