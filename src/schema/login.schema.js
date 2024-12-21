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

export default new Schema(loginFields);
