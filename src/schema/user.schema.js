import useSchemaForm from '../hooks/useSchemaForm';
import { deflateObject } from '../utils/object.utils';
import Schema from './Schema';
import { addressFields } from './address.schema';
import { contactFields } from './contact.schema';
import { loginFields } from './login.schema';

export const userFields = {
  name: { type: 'string', min: 2, max: 24, required: true },
  ...loginFields,
  phone: { ...contactFields.phone, required: false },
  avatar: { type: 'file' },
  ...deflateObject({ address: addressFields }, 1),
  role: { type: 'enum', options: { user: 'User', moderator: 'Moderator', admin: 'Admin' }, required: true }
};

const userSchema = new Schema(userFields);

export const useUserForm = (opts) => useSchemaForm(userSchema, opts);

export default userSchema;
