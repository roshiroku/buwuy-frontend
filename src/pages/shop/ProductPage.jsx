import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { useProduct, useProducts } from '../../services/product.service';
import { useCart } from '../../providers/CartProvider';
import ProductImages from '../../components/shop/ProductImages';

const ProductPage = () => {
  const { updateCart, openCart } = useCart();
  const { productSlug: slug } = useParams();
  const { products } = useProducts({ slug, limit: 1 });
  const { product } = useProduct(products[0]);
  const isLoading = useMemo(() => !product, [product]);

  return (
    <div>
      <div>
        {isLoading ? 'loading...' : (
          <ProductImages images={product.images || []} />
        )}
      </div>
      <div>
        <h1>{isLoading ? 'loading...' : product.name}</h1>
        <div>
          {isLoading ? (
            'loading...'
          ) : (
            <Markdown>
              {product.description}
            </Markdown>
          )}
        </div>
        <div>
          {isLoading ? (
            'loading...'
          ) : (
            <>
              <div>
                <b>Price:</b>
                {product.price}
              </div>
              <button disabled={!product.stock} onClick={() => updateCart(product, 1) && openCart()}>
                {product.stock ? 'Add To Cart' : 'Out Of Stock'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
