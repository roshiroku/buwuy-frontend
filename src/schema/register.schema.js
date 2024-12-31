import useSchemaForm from '../hooks/useSchemaForm';
import Schema from './Schema';
import { contactFields } from './contact.schema';
import { loginFields } from './login.schema';

export const registerFields = {
  'name.first': contactFields['name.first'],
  'name.last': contactFields['name.last'],
  avatar: { type: 'file' },
  ...loginFields,
};

const registerSchema = new Schema(registerFields);

export const useRegisterForm = (opts) => useSchemaForm(registerSchema, opts);

export default registerSchema;
