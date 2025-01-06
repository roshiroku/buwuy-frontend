import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useContactForm } from '../schema/contact.schema';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    // Simulate form submission with random delay
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 500));
    setIsLoading(false);
    navigate('/contact/success');
  };

  const { inputs, onSubmit, isSubmitting } = useContactForm({ handleSubmit });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4, px: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Contact Us
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.medium' }}>
          We'd love to hear from you! Please fill out the form below.
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, mx: 'auto' }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          {inputs.name}
          {inputs.email}
        </Box>
        {inputs.subject}
        {inputs.message}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting || isLoading}
          fullWidth
          sx={{ borderRadius: 2, mt: 2 }}
        >
          {isSubmitting || isLoading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>
    </Box>
  );
};

export default ContactPage;
