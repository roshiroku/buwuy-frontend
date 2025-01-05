import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import origamiMaster from '../assets/origami-master.webp';
import origamiCreations from '../assets/origami-creations.webp';
import buwuyStore from '../assets/buwuy-store.webp';

const AboutPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4, px: 2 }}>
      {/* Lore */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, textAlign: 'center', letterSpacing: -1 }}>
          Welcome to Buwuy
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.medium', textAlign: 'center' }}>
          "Where every fold tells a story."
        </Typography>
        <Typography variant="body1">
          In the hidden alleys of artistry, Buwuy was born from the passion of master origamist Akiro
          Tetsuyama, who once folded a 1,000-crane sculpture that came to life and granted him a wish:
          "Create a space where imagination takes shape." Today, we craft dreams with paper, offering
          everything from intricate dragon origami to playful paper foxes that enchant hearts.
        </Typography>
      </Box>

      {/* Images */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        <Box
          component="img"
          src={origamiMaster}
          alt="Origami Master"
          sx={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: 2, gridRow: 'span 2' }}
        />
        <Box
          component="img"
          src={origamiCreations}
          alt="Origami Creations"
          sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
        />
        <Box
          component="img"
          src={buwuyStore}
          alt="Buwuy Store"
          sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
        />
      </Box>

      {/* Store Info */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
          Store Information
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> 123 Paperfold Lane, Artistry District, Tokyo, Japan.
        </Typography>
        <Typography variant="body1">
          <strong>Working Hours:</strong> Monday - Saturday: 10 AM - 6 PM (Closed on Sundays)
        </Typography>
        <Typography variant="body1">
          <strong>Contact:</strong> +81-555-1234 | contact@buwuy.jp
        </Typography>
      </Box>

      {/* Map */}
      <iframe
        title="Store Location Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345097645!2d139.7354824156489!3d35.68963408019268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bf6da6f6c1b%3A0x7868c842b59c3f9f!2sTokyo%20Tower!5e0!3m2!1sen!2sjp!4v1696391723827!5m2!1sen!2sjp"
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: 8 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Call to Action */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Typography variant="h5" component="p" sx={{ fontWeight: 600, textAlign: 'center' }}>
          Ready to fold your dreams?
        </Typography>
        <Button
          component={Link}
          to="/shop"
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 2 }}
        >
          Visit Our Shop
        </Button>
      </Box>
    </Box>
  );
};

export default AboutPage;
