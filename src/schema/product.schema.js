import Schema from './Schema';
import useSchemaForm from '../hooks/useSchemaForm';

export const productFields = {
  name: { type: 'string', min: 2, max: 24 },
  description: { type: 'text', max: 128, required: true },
  images: {
    type: 'array',
    subtype: {
      src: { type: 'string', max: 256 },
      alt: { type: 'string', max: 128 },
      description: { type: 'string', max: 128 }
    }
  },
  category: { type: 'string', max: 24 },
  tags: { type: 'array', required: true, subtype: { type: 'string', max: 24 } }
};

const productSchema = new Schema(productFields);

export const useProductForm = (opts) => useSchemaForm(productSchema, opts);

export default productSchema;
