import useSchemaForm from '../hooks/useSchemaForm';
import { deflateObject } from '../utils/object.utils';
import Schema from './Schema';
import { addressFields } from './address.schema';
import { clientFields } from './client.schema';
import { loginFields } from './login.schema';

export const userFields = {
  name: { type: 'string', min: 2, max: 24, required: true },
  ...loginFields,
  phone: { ...clientFields.phone, required: false },
  avatar: { type: 'file' },
  ...deflateObject({ address: addressFields }, 1),
  role: { type: 'enum', options: { user: 'User', moderator: 'Moderator', admin: 'Admin' }, required: true }
};

const userSchema = new Schema(userFields);

export const useUserForm = (opts) => useSchemaForm(userSchema, opts);

export default userSchema;
