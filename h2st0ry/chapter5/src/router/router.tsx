import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MemberPage from "../pages/MemberPage";
import ProtectedRoute from "../components/ProtectedRoute";
import GoogleCallbackPage from "../pages/GoogleCallbackPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "member",
        element: (
          <ProtectedRoute>
            <MemberPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/v1/auth/google/callback",
        element: <GoogleCallbackPage />,
      },
    ],
  },
]);

export default router;
