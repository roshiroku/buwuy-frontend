import { remoteAsset } from '../../utils/url.utils';

const ProductCard = ({ href, product }) => {
  const [primaryImage = {}] = product.images;
  const Component = href ? 'a' : 'div';

  return (
    <div>
      <Component href={href}>
        <img src={remoteAsset(primaryImage.src)} alt={primaryImage.alt || product.name} style={{
          display: 'block',
          maxWidth: '150px',
          objectFit: 'cover',
          aspectRatio: 1
        }} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>
          Price: {product.price},
          Stock: {product.stock}
        </p>
      </Component>
    </div>
  );
};

export default ProductCard;
