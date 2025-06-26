import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const access_token = localStorage.getItem("access_token");
  const { token } = useAuth();

  if (!access_token || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
