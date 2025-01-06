import Schema from './Schema';
import useSchemaForm from '../hooks/useSchemaForm';

export const contactFields = {
  name: { type: 'string', min: 2, max: 32, required: true, label: 'Name' },
  email: { type: 'email', required: true, label: 'Email' },
  subject: { type: 'string', max: 128, required: true, label: 'Subject' },
  message: { type: 'text', max: 1024, required: true, label: 'Message' }
};

const contactSchema = new Schema(contactFields);

export const useContactForm = (opts) => useSchemaForm(contactSchema, opts);

export default contactSchema;
