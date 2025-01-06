import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCategories } from '../../providers/CategoryProvider';
import LogoText from './LogoText';

const linkStyle = {
  color: 'text.medium',
  textDecoration: 'none',
  '&:hover': {
    color: 'text.primary'
  }
};

const Footer = () => {
  const { categories, isLoadingCategories } = useCategories();

  return (
    <Box
      component="footer"
      sx={({ palette }) => ({
        py: 4,
        px: { xs: 2, sm: 3 },
        backgroundColor: 'background.default',
        color: 'text.header',
        boxShadow: palette.mode === 'dark' ? (
          '0px 256px 512px rgba(255, 255, 255, 0.16), 0px 128px 256px rgba(255, 255, 255, 0.08)'
        ) : (
          '0px 256px 512px rgba(0, 0, 0, 0.48), 0px 128px 256px rgba(0, 0, 0, 0.24)'
        )
      })}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          <LogoText />
          <Typography variant="body1" sx={{ maxWidth: 300 }}>
            Discover unique origami and paper products. Built with ❤️.
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.medium">
            © Buwuy {new Date().getFullYear()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>Visit</Typography>
          <MuiLink component={Link} to="/" sx={linkStyle}>
            Home
          </MuiLink>
          <MuiLink component={Link} to="/shop" sx={linkStyle}>
            Shop
          </MuiLink>
          <MuiLink component={Link} to="/about" sx={linkStyle}>
            About
          </MuiLink>
          <MuiLink component={Link} to="/contact" sx={linkStyle}>
            Contact
          </MuiLink>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>Shop</Typography>
          {isLoadingCategories ? (
            <Typography variant="body2" color="text.medium">Loading categories...</Typography>
          ) : (
            categories.map((category) => (
              <MuiLink
                key={category._id}
                component={Link}
                to={`/shop/${category.slug}`}
                sx={linkStyle}
              >
                {category.name}
              </MuiLink>
            ))
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>Support</Typography>
          <MuiLink component={Link} to="/faq" sx={linkStyle}>
            FAQ
          </MuiLink>
          <MuiLink component={Link} to="/shipping" sx={linkStyle}>
            Shipping & Returns
          </MuiLink>
          <MuiLink component={Link} to="/privacy" sx={linkStyle}>
            Privacy Policy
          </MuiLink>
          <MuiLink component={Link} to="/terms" sx={linkStyle}>
            Terms of Service
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
