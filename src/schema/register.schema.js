import useSchemaForm from '../hooks/useSchemaForm';
import Schema from './Schema';
import { loginFields } from './login.schema';

const nameField = { type: 'string', min: 2, max: 24 };

export const registerFields = {
  'name.first': { ...nameField, label: 'First Name' },
  'name.last': { ...nameField, label: 'Last Name' },
  avatar: { type: 'file' },
  ...loginFields,
};

const registerSchema = new Schema(registerFields);

export const useRegisterForm = (opts) => useSchemaForm(registerSchema, opts);

export default registerSchema;
