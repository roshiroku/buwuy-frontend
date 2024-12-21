import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const GuestOnly = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (!isLoading && user) {
    return <Navigate to='/' />
  }

  return children;
};

export default GuestOnly;
