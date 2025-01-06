import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ContactSuccessPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 4, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
        Thank You!
      </Typography>
      <Typography variant="h6" sx={{ color: 'text.medium', maxWidth: 600 }}>
        Your message has been successfully sent. We appreciate you reaching out and will get back to you as soon as possible.
      </Typography>
      <Button
        LinkComponent={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ borderRadius: 2, mt: 2 }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default ContactSuccessPage;
