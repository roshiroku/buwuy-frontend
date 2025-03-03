import { Box } from '@mui/material';

const Container = ({ sx, children }) => {
  return (
    <Box sx={{
      px: 6,
      width: '100%',
      maxWidth: '1440px',
      mx: 'auto',
      boxSizing: 'border-box',
      ...sx
    }}>
      {children}
    </Box>
  );
};

export default Container;
