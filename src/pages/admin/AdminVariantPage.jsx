import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../../services/product.service';
import { useVariantForm } from '../../schema/variant.schema';
import ImagesInput from '../../components/forms/ImagesInput';

const AdminVariantPage = () => {
  const { id, index } = useParams();
  const { product, saveProduct, isLoadingProduct } = useProduct(id);
  const [variant, setVariant] = useState(product?.variants[index]);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (index) {
      product.variants[index] = values;
    } else {
      product.variants.push(values);
    }

    await saveProduct();
    navigate(`/admin/products/${id}/variants`);
  };

  const {
    values,
    errors,
    handlers,
    inputs,
    onSubmit
  } = useVariantForm({ default: variant, handleSubmit });

  useEffect(() => {
    setVariant(product?.variants[index]);
  }, [product, index]);

  return !isLoadingProduct && (
    <form onSubmit={onSubmit}>
      {inputs.name}
      {inputs.description}
      {inputs.price}
      {inputs.stock}
      <ImagesInput value={values.images} onChange={handlers.images} />
      <button type="submit">Save</button>
    </form>
  );
};

export default AdminVariantPage;
