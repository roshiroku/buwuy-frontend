import { useCategories } from '../../providers/CategoryProvider';
import CategoryCard from '../../components/shop/CategoryCard';

const ShopPage = () => {
  const { categories, isLoadingCategories } = useCategories();

  return (
    <div>
      <h1>Shop Categories</h1>
      <ul>
        {isLoadingCategories ? (
          <></>
        ) : (
          categories.map((category) => (
            <li key={category._id}>
              <CategoryCard href={`/shop/${category.slug}`} category={category} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ShopPage;
