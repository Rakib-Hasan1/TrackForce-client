
import React from "react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import LoadingEffect from "../Components/LoadingEffect";
import { Navigate } from "react-router";

const HRRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <LoadingEffect></LoadingEffect>;
  }

  if (!user || role?.toLowerCase() !== "hr") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default HRRoutes;
