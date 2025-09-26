import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !user.roles?.some(r => roles.includes(r))) {
    return <Navigate to="/unauthorized" replace />; // redirect jika role tidak cocok
  }

  return children; // user valid → render children
};

export default ProtectedRoute;
