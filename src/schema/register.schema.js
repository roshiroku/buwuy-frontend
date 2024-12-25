import Schema from './Schema';
import { loginFields } from './login.schema';

const nameField = { type: 'string', min: 2, max: 24 };

export const registerFields = {
  'name.first': { ...nameField, label: 'First Name' },
  'name.last': { ...nameField, label: 'Last Name' },
  avatar: { type: 'file' },
  ...loginFields,
};

export default new Schema(registerFields);
