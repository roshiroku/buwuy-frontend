import useSchemaForm from '../hooks/useSchemaForm';
import Schema from './Schema';

export const contactFields = {
  'name.first': { type: 'string', min: 2, max: 24, required: true, label: 'First Name' },
  'name.last': { type: 'string', min: 2, max: 24, required: true, label: 'Last Name' },
  email: { type: 'email', required: true, label: 'Email' },
  phone: { type: 'string', max: 24, required: true, label: 'Phone' }
};

const contactSchema = new Schema(contactFields);

export const useContactForm = (opts) => useSchemaForm(contactSchema, opts);

export default contactSchema;
