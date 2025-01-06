import { Box } from '@mui/material';
import HeroSection from '../components/sections/HeroSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => {

  return (
    <>
      <Box component="section" sx={{ backgroundColor: 'background.default', color: 'text.primary' }}>
        <HeroSection />
      </Box>

      <Box component="section" sx={{ backgroundColor: 'background.paper', color: 'text.primary' }} >
        <BestSellersSection />
      </Box>

      <Box component="section" sx={{ backgroundColor: 'background.default', color: 'text.primary' }}>
        <FeaturesSection />
      </Box>

      <Box component="section" sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}>
        <ContactSection />
      </Box>
    </>
  );
};

export default HomePage;
