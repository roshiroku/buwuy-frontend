import Schema from './Schema';
import { loginFields } from './LoginSchema';

export const registerFields = {
  'name.first': {
    min: 2,
    max: 32,
    required: true,
    label: 'First Name',
  },
  'name.last': {
    min: 2,
    max: 32,
    required: true,
    label: 'Last Name',
  },
  email: loginFields.email,
  password: loginFields.password,
};

export default class RegisterSchema extends Schema {
  constructor() {
    super(registerFields);
  }
}
