import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import Movies from "./pages/movies";
import RootLayout from "./layout/root-layout";
import NowPlayingPage from "./pages/now-playing";
import TopRatedPage from "./pages/top-rated";
import UpcomingPage from "./pages/upcoming";

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
        path: "popular",
        element: <Movies />,
      },
      {
        path: "now_playing",
        element: <NowPlayingPage />,
      },
      {
        path: "top_rated",
        element: <TopRatedPage />,
      },
      {
        path: "upcoming",
        element: <UpcomingPage />,
      },
      {
        path: "movies/:movieId",
        element: <Movies />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
