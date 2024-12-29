import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useProducts } from '../../services/product.service';
import { useCategories } from '../../providers/CategoryProvider';
import Pagination from '../../components/layout/Pagination';
import ProductCard from '../../components/shop/ProductCard';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;
  const sort = searchParams.get('sort') || 'name';
  const { categories, isLoadingCategories } = useCategories();
  const { products, countProducts, isLoadingProducts } = useProducts({
    categorySlug,
    skip: (page - 1) * limit,
    limit,
    sort
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
      <div>
        {isLoadingCategories || isLoadingProducts ? 'loading...' : (
          <>
            <ul>
              {products.map((product) => (
                <li key={product._id}>
                  <ProductCard href={`/shop/${category.slug}/${product.slug}`} product={product} />
                </li>
              ))}
            </ul>
            <Pagination count={countProducts} />
          </>
        )}
      </div>
    </div>
  )
};

export default CategoryPage;
