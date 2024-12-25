import Schema from './Schema';

export const categoryFields = {
  name: { type: 'string', min: 2, max: 24 },
  description: { type: 'text', max: 128, required: true },
  image: { type: 'file' }
};

export default new Schema(categoryFields);
