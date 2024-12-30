import { useCart } from '../../providers/CartProvider';
import { remoteAsset } from '../../utils/url.utils';

const MiniCart = () => {
  const { cart, isLoadingCart } = useCart();

  return (
    <div>
      <ul>
        {!isLoadingCart && cart.products.map(({ product, amount }) => (
          <li key={product._id} style={{ display: 'flex' }}>
            <img src={remoteAsset(product.images[0]?.src)} alt={product.name} style={{
              display: 'block',
              maxWidth: '150px',
              objectFit: 'cover',
              aspectRatio: 1
            }} />
            <div>
              {product.name}
            </div>
            <div>
              {amount}
            </div>
            <div>
              {product.price * amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniCart;
