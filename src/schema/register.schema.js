import useSchemaForm from '../hooks/useSchemaForm';
import Schema from './Schema';
import { loginFields } from './login.schema';

export const registerFields = {
  name: { type: 'string', min: 2, max: 24, required: true },
  avatar: { type: 'file' },
  ...loginFields,
};

const registerSchema = new Schema(registerFields);

export const useRegisterForm = (opts) => useSchemaForm(registerSchema, opts);

export default registerSchema;
