import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentications/Login";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Registration from "../Pages/Authentications/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Registration,
      },
    ],
  },
]);
