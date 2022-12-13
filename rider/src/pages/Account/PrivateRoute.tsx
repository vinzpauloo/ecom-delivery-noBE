import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

type Props = {};

const PrivateRoute = (props: Props) => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
