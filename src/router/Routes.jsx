import {createBrowserRouter} from "react-router";
import Mainlayout from "../components/layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    
  },
]);