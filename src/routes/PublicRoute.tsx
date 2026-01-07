import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const access_token = localStorage.getItem("access_token");
  // Nếu đã login, chuyển về home
  if (access_token) {
    return <Navigate to="/" replace />;
  }

  // Nếu chưa login, cho phép vào
  return <>{children}</>;
};

export default PublicRoute;
