import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { remoteAsset } from '../../utils/url.utils';

const CategoryCard = ({ to, category }) => {
  const cardContent = (
    <>
      <CardMedia
        component="img"
        image={remoteAsset(category.image)}
        alt={category.name}
        sx={{
          display: 'block',
          objectFit: 'cover',
          aspectRatio: 3 / 2,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" component="h4" gutterBottom fontWeight={600} noWrap>
          {category.name}
        </Typography>
        <Typography variant="body1" color="text.medium">
          {category.byline}
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
      borderStyle: 'solid'
    }}>
      {to ? (
        <CardActionArea LinkComponent={Link} to={to} sx={{ flexGrow: 1 }}>
          {cardContent}
        </CardActionArea>
      ) : (
        cardContent
      )}
    </Card>
  );
};

export default CategoryCard;
