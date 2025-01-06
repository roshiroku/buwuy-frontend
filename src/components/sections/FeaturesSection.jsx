import { Box, Typography } from '@mui/material';
import Container from '../layout/Container';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import BrushIcon from '@mui/icons-material/Brush';

const containerStyle = ({ palette }) => ({
  textAlign: 'center',
  color: palette.mode === 'dark' ? 'text.medium' : 'secondary.main',
  backgroundColor: palette.mode === 'dark' ? 'background.paper' : 'secondary.light',
  border: '1px solid',
  borderColor: 'divider',
  p: 2,
  borderRadius: 3,
  minWidth: 192,
  maxWidth: 232
});

const featureStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  aspectRatio: 1
};

const FeaturesSection = () => {
  return (
    <Container sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h3" sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
        Our Best Features
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4 }}>
        <Box sx={containerStyle}>
          <Box sx={featureStyle}>
            <PublicIcon fontSize="large" />
            <Typography variant="h6">
              Worldwide Shipping
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              We deliver to your doorstep, no matter where you are.
            </Typography>
          </Box>
        </Box>
        <Box sx={containerStyle}>
          <Box sx={featureStyle}>
            <LocationOnIcon fontSize="large" />
            <Typography variant="h6">
              Store Location
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              123 Paperfold Lane, Artistry District, Tokyo, Japan.
            </Typography>
          </Box>
        </Box>
        <Box sx={containerStyle}>
          <Box sx={featureStyle}>
            <AccessTimeIcon fontSize="large" />
            <Typography variant="h6">
              Working Hours
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              Monday - Saturday: 10 AM - 6 PM (Closed on Sundays).
            </Typography>
          </Box>
        </Box>
        <Box sx={containerStyle}>
          <Box sx={featureStyle}>
            <DescriptionIcon fontSize="large" />
            <Typography variant="h6">
              Premium Paper
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              All origami products are crafted using high-quality, eco-friendly paper.
            </Typography>
          </Box>
        </Box>
        <Box sx={containerStyle}>
          <Box sx={featureStyle}>
            <BrushIcon fontSize="large" />
            <Typography variant="h6">
              Handcrafted Art
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              Every piece is uniquely designed by master origamists.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FeaturesSection;
