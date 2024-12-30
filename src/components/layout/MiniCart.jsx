import { Link } from 'react-router-dom';
import { useCart } from '../../providers/CartProvider';
import { useCategories } from '../../providers/CategoryProvider';
import { remoteAsset } from '../../utils/url.utils';

const MiniCart = () => {
  const { getCategory } = useCategories();
  const { cart, updateCart, isLoadingCart } = useCart();

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
              <Link to={`/shop/${getCategory(product.category)?.slug}/${product.slug}`}>
                {product.name}
              </Link>
            </div>
            <div>
              <input type="number" min="1" max={product.stock} value={amount} onChange={(e) => {
                const { value } = e.target;
                if (value > 0 && value <= product.stock) {
                  updateCart(product, value - amount);
                }
              }} />
            </div>
            <div>
              {(Math.round(product.price * amount * 100) / 100).toLocaleString()}
            </div>
            <div>
              <button onClick={() => updateCart(product, -amount)}>x</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniCart;
