import { Box } from '@mui/material';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminContainer from './AdminContainer';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminHeader />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AdminContainer>{children}</AdminContainer>
      </Box>
      <AdminFooter />
    </Box>
  );
};

export default AdminLayout;
