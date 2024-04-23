import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Hero from "../components/Hero";
import Home from "../components/Home";
import Product from "../components/Product";
import AddSupplier from "../components/AddSupplier";
import Sidebar from "../components/Sidebar";
import DashboardMain from "../components/DashboardMain";
import HomeMain from "../components/HomeMain";
import Registration from "../components/Registration";
import UserDetailsPage from "../components/UserDetailsPage";
import UserListPage from "../components/UserListPage";
import Supplierdetails from "../components/Supplierdetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomeMain />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/profile",
        element: <UserDetailsPage />,
      },
      {
        path: "/user-list",
        element: <UserListPage />,
      },
      {
        path: "/dashboard",
        element: <Home />,
        children: [
          {
            path: "",
            element: <DashboardMain />,
          },

          {
            path: "supplier",
            element: <AddSupplier />,
          },
          {
            path: "product",
            element: <Product />,
          },
           {
            path: "supplier-details",
            element: <Supplierdetails />,
          },
        ],
      },
    ],
  },
]);
