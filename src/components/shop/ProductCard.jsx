import { useCart } from '../../providers/CartProvider';
import { remoteAsset } from '../../utils/url.utils';

const ProductCard = ({ href, product }) => {
  const { updateCart, openCart } = useCart();
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
        <p>{product.byline}</p>
        <p>Price: {product.price}</p>
      </Component>
      <div>
        <button onClick={() => updateCart(product, 1) && openCart()}>
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
