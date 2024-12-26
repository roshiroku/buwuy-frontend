import useSchemaForm from '../hooks/useSchemaForm';
import Schema from './Schema';

export const categoryFields = {
  name: { type: 'string', min: 2, max: 24 },
  description: { type: 'text', max: 128, required: true },
  image: { type: 'file' }
};

const categorySchema = new Schema(categoryFields);

export const useCategoryForm = (opts) => useSchemaForm(categorySchema, opts);

export default categorySchema;
