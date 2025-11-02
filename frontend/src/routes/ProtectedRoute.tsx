import React from "react";
import { Navigate } from "react-router";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userCookie = Cookies.get("user");

  if (!userCookie) return <Navigate to="/signin" replace />;

  try {
    JSON.parse(userCookie); // sanity check
    return <>{children}</>;
  } catch {
    Cookies.remove("user");
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;
