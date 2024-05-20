import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrentUserRole } from "../../store/selectors";
import { routePaths } from "../../routePaths";
import { userRoles } from "src/store/slices/constants";

export const PrivateRoute = ({ children }) => {
  const currentUserRole = useSelector(getCurrentUserRole);
  const isAdmin = currentUserRole === userRoles.admin;
  return isAdmin ? children : <Navigate to={routePaths.courses} />;
};
