import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

const UserMenu = () => {
  const userButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <IconButton ref={userButtonRef} onClick={() => setIsOpen(!isOpen)} color="inherit">
        <Avatar src={user.avatar} alt={user.name} />
      </IconButton>
      <Menu
        anchorEl={userButtonRef.current}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        slotProps={{ paper: { sx: { /* '& > .MuiMenu-list': { p: 0 },*/ backgroundColor: 'background.default' } } }}
      >
        <MenuItem component={Link} to="/profile" onClick={() => setIsOpen(false)}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders" onClick={() => setIsOpen(false)}>Orders</MenuItem>
        <Divider sx={{ borderColor: 'background.cardBorder' }} />
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
