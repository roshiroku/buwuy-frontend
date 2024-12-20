import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useCategories } from '../../providers/CategoryProvider';
import { useProducts } from '../../services/product.service';
import ProductCard from '../../components/shop/ProductCard';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { page = 1, limit = 5 } = useSearchParams();
  const { categories, isLoadingCategories } = useCategories();
  const { products, isLoadingProducts } = useProducts({
    categorySlug,
    limit,
    skip: (page - 1) * limit
  });

  const category = useMemo(() => categories.find(({ slug }) => slug === categorySlug), [
    categories,
    categorySlug
  ]);

  return (
    <div>
      <h1>{isLoadingCategories ? 'loading...' : category.name}</h1>
      <div>
        {isLoadingCategories ? 'loading...' : category.description}
      </div>
      <ul>
        {isLoadingProducts ? (
          <></>
        ) : (
          products.map((product) => (
            <li key={product._id}>
              <ProductCard href={`/shop/${category.slug}/${product.slug}`} product={product} />
            </li>
          ))
        )}
      </ul>
    </div>
  )
};

export default CategoryPage;
