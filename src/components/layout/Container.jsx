import { Box } from '@mui/material';

const Container = ({ children }) => {
  return (
    <Box sx={{
      px: 6,
      width: '100%',
      maxWidth: '1440px',
      mx: 'auto',
      boxSizing: 'border-box'
    }}>
      {children}
    </Box>
  );
};

export default Container;
