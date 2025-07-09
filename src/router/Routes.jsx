import { createBrowserRouter } from "react-router";
import Mainlayout from "../components/layouts/MainLayout";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import ErrorPage from "../pages/ErrorPage";
import Home from "../components/layouts/Home";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../components/Dashboard/DashboardLayout";
import AddProduct from "../pages/VendorPages/AddProduct";
import ForbiddenPage from "../pages/ForbiddenPage";
import VendorRoute from "./VendorRoute";
import MyProducts from "../pages/VendorPages/MyProducts";
import UpdateProduct from "../pages/VendorPages/UpdateProduct";


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
        path: "/forbidden",
        Component: ForbiddenPage
      },
      {
        path: "/dashboard",
        element: <PrivateRoute>
          <UserDashboard></UserDashboard>
        </PrivateRoute>,
        children:[
          {
            path: "add-product",
            element: 
            <VendorRoute>
              <AddProduct></AddProduct>
            </VendorRoute>
         },
          {
            path: "my-products",
            element: 
            <VendorRoute>
              <MyProducts></MyProducts>
            </VendorRoute>
         },
          {
            path: "update-product/:id",
            element: 
            <VendorRoute>
              <UpdateProduct></UpdateProduct>
            </VendorRoute>
         },
        ]
      },
    ],
  },
]);
