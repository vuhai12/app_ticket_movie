import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoutes;
