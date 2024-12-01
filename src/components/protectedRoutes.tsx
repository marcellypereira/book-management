import React, { useEffect } from "react";
import { checkAuthentication } from "../utils/authMiddleware";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

  useEffect(() => {
    checkAuthentication();
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;