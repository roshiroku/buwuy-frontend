import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const Header = () => {
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
      ) : (
        user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
          </>
        )
      )}
    </header>
  );
};

export default Header;
