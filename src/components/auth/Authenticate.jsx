import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const Authenticate = ({ redirect = '/login', children }) => {
  const { user, isLoading } = useAuth();

  if (!isLoading && !user) {
    return (
      <Navigate
        to={typeof redirect === 'function' ? redirect(user) : redirect}
        replace
      />
    );
  }

  return children;
};

export default Authenticate;
