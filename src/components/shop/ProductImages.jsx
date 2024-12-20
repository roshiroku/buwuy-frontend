import { useEffect, useState } from "react";
import { resolveUrl } from "../../utils/url.utils";

const ProductImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div>
      <img src={resolveUrl(selectedImage.src)} alt={selectedImage.alt} style={{ display: 'block', maxWidth: '100%' }} />
      <ul>
        {images.map((image, i) => (
          <li key={i}>
            <button onClick={() => setSelectedImage(image)}>
              <img src={resolveUrl(image.src)} alt={image.alt} style={{ display: 'block', maxWidth: '100%' }} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductImages;
