import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct, useProducts } from '../../services/product.service';
import Markdown from 'react-markdown';
import { resolveUrl } from '../../utils/url.utils';

const ProductPage = () => {
  const { productSlug: slug } = useParams();
  const { products, isLoadingProducts } = useProducts({ slug, limit: 1 });
  const { product } = useProduct(products[0]);
  const primaryImage = useMemo(() => product?.images[0], [product]);

  return (
    <div>
      <div>
        {isLoadingProducts ? 'loading...' : primaryImage && (
          <img src={resolveUrl(primaryImage.src)} alt={primaryImage.alt || product.name} style={{ display: 'block', maxWidth: '100%' }} />
        )}
      </div>
      <div>
        <h1>{isLoadingProducts ? 'loading...' : product?.name}</h1>
        <div>
          {isLoadingProducts ? (
            'loading...'
          ) : (
            <Markdown>
              {product?.description}
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
                {product?.price}
              </div>
              <button disabled={!product?.stock}>
                {product?.stock ? 'Add To Cart' : 'Out Of Stock'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
