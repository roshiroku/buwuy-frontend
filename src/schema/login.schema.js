import useSchemaForm from '../hooks/useSchemaForm';
import Schema from './Schema';

export const loginFields = {
  email: {
    type: 'email'
  },
  password: {
    type: 'password',
    min: 8,
    pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])',
    messages: {
      'string.pattern.base': 'Password must include at least one lowercase character, one uppercase character, one number, and one special character.',
    }
  }
};

const loginSchema = new Schema(loginFields);

export const useLoginForm = (opts) => useSchemaForm(loginSchema, opts);

export default loginSchema;
