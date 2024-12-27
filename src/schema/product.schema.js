import Schema from './Schema';
import useSchemaForm from '../hooks/useSchemaForm';

export const productFields = {
  name: { type: 'string', min: 2, max: 24 },
  description: { type: 'text', max: 128, required: true },
  images: {
    type: 'array',
    subtype: {
      src: { type: 'file', max: 256, required: true },
      alt: { type: 'string', max: 128 }
    }
  },
  category: { type: 'string', max: 24 },
  tags: { type: 'array', required: true, subtype: { type: 'string', max: 24 } },
  price: { type: 'number', min: 0, required: true },
  stock: { type: 'number', min: 0, required: true }
};

const productSchema = new Schema(productFields);

export const useProductForm = (opts) => useSchemaForm(productSchema, opts);

export default productSchema;
