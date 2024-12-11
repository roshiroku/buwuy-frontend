import Schema from './Schema';
import { loginFields } from './login.schema';

const nameField = { min: 2, max: 32, required: true };

export const registerFields = {
  'name.first': { ...nameField, label: 'First Name' },
  'name.last': { ...nameField, label: 'Last Name' },
  ...loginFields,
};

export default new Schema(registerFields);
