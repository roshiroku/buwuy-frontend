import { Box } from '@mui/material';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminContainer from './AdminContainer';

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <Box component="main">
        <AdminContainer>{children}</AdminContainer>
      </Box>
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
