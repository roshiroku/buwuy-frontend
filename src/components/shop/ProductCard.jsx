import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useCart } from '../../providers/CartProvider';
import { remoteAsset } from '../../utils/url.utils';

const ProductCard = ({ to, product }) => {
  const { updateCart, openCart } = useCart();
  const [primaryImage = {}] = product.images;

  const cardContent = (
    <>
      <CardMedia
        component="img"
        image={remoteAsset(primaryImage.src)}
        alt={primaryImage.alt || product.name}
        sx={{
          display: 'block',
          objectFit: 'cover',
          aspectRatio: '3 / 2',
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" component="h3" gutterBottom fontWeight={600} noWrap>
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.medium">
          {product.byline}
        </Typography>
        <Typography variant="body2" color="text.primary" fontWeight={600}>
          Price: ${product.price}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <Card elevation={0} sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      textDecoration: 'none',
      color: 'inherit',
      borderRadius: 3,
      borderWidth: 1,
      borderColor: 'background.cardBorder',
      borderStyle: 'solid',
    }}>
      {to ? (
        <CardActionArea LinkComponent={Link} to={to} sx={{
          flexGrow: 1,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }}>
          {cardContent}
        </CardActionArea>
      ) : (
        cardContent
      )}
      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
          fullWidth
          disabled={!product.stock}
          onClick={() => {
            updateCart(product, 1);
            openCart();
          }}
        >
          {product.stock ? 'Add To Cart' : 'Out Of Stock'}
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
