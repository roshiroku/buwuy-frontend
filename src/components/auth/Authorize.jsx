import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const Authorize = ({ roles = 'admin', redirect = '/', children }) => {
  const { user, isLoading } = useAuth();
  roles = Array.isArray(roles) ? roles : [roles];

  if (!isLoading && !roles.includes(user?.role)) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

export default Authorize;
