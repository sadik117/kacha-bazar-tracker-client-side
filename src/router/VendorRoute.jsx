import React, { Children, useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Authentication/AuthProvider";
import useUserRole from "../components/hooks/useUserRole";

const VendorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user || (role !== "vendor" && role !== "admin")) {
    return (
      <Navigate to="/forbidden" state={{ from: location.pathname }} replace />
    );
 }

  return children;
};

export default VendorRoute;
