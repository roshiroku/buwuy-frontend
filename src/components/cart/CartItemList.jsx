import { Link } from 'react-router-dom';
import { useCategories } from '../../providers/CategoryProvider';
import { useCart } from '../../providers/CartProvider';
import { remoteAsset } from '../../utils/url.utils';

const CartItemList = ({ items = [], onChange }) => {
  const { getCategory } = useCategories();
  const { updateCart } = useCart();
  onChange ||= updateCart;
  return (
    <ul>
      {items.map(({ product, amount }) => (
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
                onChange(product, value - amount);
              }
            }} />
          </div>
          <div>
            {(Math.round(product.price * amount * 100) / 100).toLocaleString()}
          </div>
          <div>
            <button onClick={() => onChange(product, -amount)}>x</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartItemList;
