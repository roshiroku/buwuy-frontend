import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        py: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="h6" sx={{ color: 'text.medium', maxWidth: 600 }}>
        The page you are looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 2 }}
        >
          Go to Homepage
        </Button>
        <Button
          component={Link}
          to="/shop"
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ borderRadius: 2 }}
        >
          Browse Products
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
