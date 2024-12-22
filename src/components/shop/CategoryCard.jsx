import { remoteAsset } from "../../utils/url.utils";

const CategoryCard = ({ href, category }) => {
  const Component = href ? 'a' : 'div';
  return (
    <Component href={href}>
      <img src={remoteAsset(category.image)} alt={category.name} style={{ display: 'block', maxWidth: '100%' }} />
      <h6>{category.name}</h6>
      <p>{category.description}</p>
    </Component>
  );
};

export default CategoryCard;
