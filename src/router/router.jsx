import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentications/Login";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Registration from "../Pages/Authentications/Registration";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import WorkSheet from "../Pages/Dashboard/WorkSheet";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import PrivateRoute from "../Routes/PrivateRoutes";
import EmployeeList from "../Pages/Dashboard/EmployeeList";
import HRRoutes from "../Routes/HRRoutes";
import Forbidden from "../Pages/Forbidden/Forbidden";
import EmployeeDetails from "../Pages/Dashboard/EmployeeDetails";
import Progress from "../Pages/Dashboard/Progress";

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
      {
        path: "/forbidden",
        Component: Forbidden,
      },
    ],
  },
  {
    path: "/dashboard",
    // Component: DashboardLayouts,
    element: (
      <PrivateRoute>
        <DashboardLayouts></DashboardLayouts>
      </PrivateRoute>
    ),
    children: [
      {
        path: "work-sheet",
        Component: WorkSheet,
      },
      {
        path: "Payment-history",
        Component: PaymentHistory,
      },
      {
        path: "employee-list",
        element: (
          <HRRoutes>
            <EmployeeList></EmployeeList>
          </HRRoutes>
        ),
      },
      {
        path: "progress",
        element: (
          <HRRoutes>
            <Progress></Progress>
          </HRRoutes>
        ),
      },
      {
        path: "/dashboard/employee-list/:id",
        element: <EmployeeDetails />,
      },
    ],
  },
]);
