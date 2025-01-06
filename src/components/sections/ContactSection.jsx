import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useContactForm } from '../../schema/contact.schema';
import Container from '../layout/Container';

const ContactSection = () => {
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
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 8, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ fontWeight: 600 }}>
        Contact & Inquiries
      </Typography>
      <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', color: 'text.medium' }}>
        Have any questions or inquiries? Reach out to us, and we’ll get back to you as soon as possible.
      </Typography>
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
    </Container>
  );
};

export default ContactSection;
