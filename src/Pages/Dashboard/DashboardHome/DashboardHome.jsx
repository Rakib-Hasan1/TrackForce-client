import React from "react";
import useUserRole from "../../../Hooks/useUserRole";
import LoadingEffect from "../../../Components/LoadingEffect";
import EmployeeDashboard from "./EmployeeDashboard";
import HRDashboard from "./HRDashboard";
import AdminDashboard from "./AdminDashboard";
import Forbidden from "../../Forbidden/Forbidden";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading) {
    return <LoadingEffect></LoadingEffect>;
  }

  if (role === "employee") {
    return <EmployeeDashboard></EmployeeDashboard>;
  } else if (role === "hr") {
    return <HRDashboard></HRDashboard>;
  } else if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashboardHome;
