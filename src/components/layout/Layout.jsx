import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box component="main">
        <Container>{children}</Container>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
