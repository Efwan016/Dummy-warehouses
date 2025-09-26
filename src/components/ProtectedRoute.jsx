import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login", { replace: true });
    else if (roles && !user.roles?.some(r => roles.includes(r))) navigate("/unauthorized", { replace: true });
  }, [user, roles, loading, navigate]);

  if (loading || !user || (roles && !user.roles?.some(r => roles.includes(r)))) return null;

  return children;
};

export default ProtectedRoute;
