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
import AddAdvertisement from "../pages/VendorPages/AddAdvertisement";
import MyAdvertisements from "../pages/VendorPages/MyAdvertisements";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/AdminPages/AllUsers";
import AllProducts from "../pages/AdminPages/AllProducts";
import AllAdvertisements from "../pages/AdminPages/AllAdvertisements";
import AllOrders from "../pages/AdminPages/AllOrders";
import Products from "../pages/Products";
import PriceTrends from "../pages/UserPages/PriceTrends";
import WatchLists from "../pages/UserPages/WatchLists";
import MyOrders from "../pages/UserPages/MyOrders";
import ProductDetails from "../pages/ProductDetails";
import PaymentSuccess from "../pages/PaymentSuccess";
import AddOffer from "../pages/AdminPages/AddOffer";
import Offers from "../pages/Offers";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/products",
        Component: Products
      },
      {
        path: "/product-details/:id",
        element: <PrivateRoute>
          <ProductDetails></ProductDetails>
        </PrivateRoute>
      },
      {
        path: "/payment-success",
        Component: PaymentSuccess
      },
      {
        path: "/offers",
        Component: Offers
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
          {
            path: "add-advertisement",
            element: 
            <VendorRoute>
              <AddAdvertisement></AddAdvertisement>
            </VendorRoute>
         },
          {
            path: "my-ads",
            element: 
            <VendorRoute>
              <MyAdvertisements></MyAdvertisements>
            </VendorRoute>
         },
         {
          path: "all-users",
          element: <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
         },
         {
          path: "all-products",
          element: <AdminRoute>
            <AllProducts></AllProducts>
          </AdminRoute>
         },
         {
          path: "all-ads",
          element: <AdminRoute>
            <AllAdvertisements></AllAdvertisements>
          </AdminRoute>
         },
         {
          path: "all-orders",
          element: <AdminRoute>
            <AllOrders></AllOrders>
          </AdminRoute>
         },
         {
          path: "add-offer",
          element: <AdminRoute>
            <AddOffer></AddOffer>
          </AdminRoute>
         },
         {
          path: "price-trends",
          Component: PriceTrends
         },
         {
          path: "watchlist",
          Component: WatchLists
         },
         {
          path: "my-orders",
          Component: MyOrders
         },
        ]
      },
    ],
  },
]);
