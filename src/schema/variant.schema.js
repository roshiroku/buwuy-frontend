import Schema from './Schema';
import { productFields } from './product.schema';
import useSchemaForm from '../hooks/useSchemaForm';

export const variantFields = {
  name: productFields.name,
  description: productFields.description,
  images: productFields.images,
  price: productFields.price,
  stock: productFields.stock
};

const variantSchema = new Schema(variantFields);

export const useVariantForm = (opts) => useSchemaForm(variantSchema, opts);

export default variantSchema;
