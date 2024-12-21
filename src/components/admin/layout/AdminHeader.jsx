import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";

const AdminHeader = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div>logo</div>
      {isLoading ? (
        'loading...'
      ) : user && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </header>
  );
};

export default AdminHeader;
