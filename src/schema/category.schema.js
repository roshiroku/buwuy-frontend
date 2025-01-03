import useSchemaForm from '../hooks/useSchemaForm';
import Schema from './Schema';

export const categoryFields = {
  name: { type: 'string', min: 2, max: 24 },
  byline: { type: 'string', max: 128, required: true },
  description: { type: 'text', max: 256, required: true },
  image: { type: 'file' }
};

const categorySchema = new Schema(categoryFields);

export const useCategoryForm = (opts) => useSchemaForm(categorySchema, opts);

export default categorySchema;
