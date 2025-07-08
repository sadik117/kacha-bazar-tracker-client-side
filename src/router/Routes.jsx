import { createBrowserRouter } from "react-router";
import Mainlayout from "../components/layouts/MainLayout";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import ErrorPage from "../pages/ErrorPage";
import Home from "../components/layouts/Home";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../components/Dashboard/DashboardLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    errorElement: ErrorPage,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/auth",
        children: [
          {
            path: "/auth/login",
            Component: Login,
          },
          {
            path: "/auth/signup",
            Component: Registration,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <PrivateRoute>
          <UserDashboard></UserDashboard>
        </PrivateRoute>
      },
    ],
  },
]);
