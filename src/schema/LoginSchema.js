import Schema from './Schema';

export const loginFields = {
  email: {
    email: true,
    required: true,
  },
  password: {
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
    required: true,
    messages: {
      'string.pattern.base': 'Password must be at least 8 characters long, and include at least one lowercase character, one uppercase character, one number, and one special character.'
    },
  },
};

export default class LoginSchema extends Schema {
  constructor() {
    super(loginFields);
  }
}
