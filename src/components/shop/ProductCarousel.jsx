import { Box, Typography, Link as MuiLink, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { remoteAsset } from '../../utils/url.utils';
import { useCategories } from '../../providers/CategoryProvider';
import 'react-multi-carousel/lib/styles.css';

const ProductCarousel = ({ products }) => {
  const { getCategory } = useCategories();

  const getCategorySlug = (categoryId) => {
    const category = getCategory(categoryId);
    return category ? category.slug : 'unknown-category';
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={5000} showDots>
      {products.map((product) => {
        const categorySlug = getCategorySlug(product.category);
        const productLink = `/shop/${categorySlug}/${product.slug}`;

        return (
          <MuiLink
            key={product._id}
            component={Link}
            to={productLink}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 4,
              width: '100%',
              maxWidth: 1200,
              mx: 'auto',
              px: 2,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Box
              component="img"
              src={remoteAsset(product.images[0]?.src)}
              alt={product.images[0]?.alt || product.name}
              sx={{
                width: {
                  xs: '100%',
                  md: '50%'
                },
                maxWidth: 256,
                borderRadius: 2,
                objectFit: 'cover'
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start', textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {product.name}
              </Typography>
              <Typography variant="h6" component="p" color="text.medium" sx={{ fontWeight: 400, maxWidth: 480 }}>
                {product.description || 'A best-selling product loved by our customers.'}
              </Typography>
              <Button LinkComponent="div" variant="contained" size="large" sx={{ borderRadius: 2, mt: 1 }}>
                View Product
              </Button>
            </Box>
          </MuiLink>
        );
      })}
    </Carousel>
  );
};

export default ProductCarousel;
