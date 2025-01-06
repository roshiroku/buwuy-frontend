import { Box, Typography } from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';
import LinkButton from '../buttons/LinkButton';
import Container from '../layout/Container';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      gap: 4,
      py: 8
    }}>
      <Typography variant="h2" sx={{ fontWeight: 600, letterSpacing: -1 }}>
        Welcome to Buwuy
      </Typography>
      <Typography variant="h6" sx={{ maxWidth: 800, color: 'text.medium' }}>
        Discover the art of origami and explore our collection of unique paper products designed with precision and love.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <LinkButton
          to="/shop"
          variant="contained"
          color="link"
          size="large"
          sx={{
            borderRadius: 2,
            backgroundColor: 'background.contrast',
            color: 'background.default'
          }}
        >
          Shop Now
        </LinkButton>
        {!user && (
          <LinkButton
            to="/register"
            variant="outlined"
            size="large"
            color="link"
            sx={{
              borderRadius: 2,
              borderColor: 'currentcolor',
              color: 'text.primary'
            }}
          >
            Sign Up
          </LinkButton>
        )}
      </Box>
    </Container>
  );
};

export default HeroSection;
