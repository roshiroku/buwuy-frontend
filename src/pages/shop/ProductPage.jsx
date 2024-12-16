import { useParams } from 'react-router-dom';
import { useProduct, useProducts } from '../../services/product.service';
import Markdown from 'react-markdown';

const ProductPage = () => {
  const { productSlug: slug } = useParams();
  const { products, isLoadingProducts } = useProducts({ slug, limit: 1 });
  const { product } = useProduct(products[0]);

  return (
    <div>
      <div>
        {isLoadingProducts ? 'loading...' : <img src="" />}
      </div>
      <div>
        <h1>{isLoadingProducts ? 'loading...' : product.name}</h1>
        <div>
          {isLoadingProducts ? (
            'loading...'
          ) : (
            <Markdown>
              {product.description}
            </Markdown>
          )}
        </div>
        <div>
          {isLoadingProducts ? (
            'loading...'
          ) : (
            <>
              <div>
                <b>Price:</b>
                {product.price}
              </div>
              <button disabled={product.stock}>
                {product.stock ? 'Out Of Stock' : 'Add To Cart'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
