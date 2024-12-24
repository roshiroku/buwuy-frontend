import Schema from './Schema';

export const productFields = {
  name: { min: 2, max: 24 },
  description: { type: 'text', max: 128, required: true },
  category: {},
  tags: { type: 'array', required: true }
  // image: { type: 'file' }
};

export default new Schema(productFields);
