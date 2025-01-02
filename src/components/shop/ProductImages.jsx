import { useEffect, useState } from 'react';
import { Box, Button, Grid2 as Grid, Typography } from '@mui/material';
import { remoteAsset } from '../../utils/url.utils';

const ProductImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || {});

  useEffect(() => {
    setSelectedImage(images[0] || {});
  }, [images]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        component="img"
        src={remoteAsset(selectedImage.src)}
        alt={selectedImage.alt || 'Product Image'}
        sx={{
          width: '100%',
          maxHeight: 400,
          objectFit: 'cover',
          borderRadius: 2,
          boxShadow: 1
        }}
      />
      {images.length > 1 && (
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
              <Button
                onClick={() => setSelectedImage(image)}
                sx={{
                  p: 0,
                  minWidth: 0,
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: selectedImage === image ? '2px solid' : 'none',
                }}
              >
                <Box
                  component="img"
                  src={remoteAsset(image.src)}
                  alt={image.alt || 'Thumbnail'}
                  sx={{
                    width: '100%',
                    aspectRation: 1,
                    objectFit: 'cover'
                  }}
                />
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductImages;
