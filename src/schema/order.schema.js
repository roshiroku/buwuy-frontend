import useSchemaForm from '../hooks/useSchemaForm';
import { deflateObject } from '../utils/object.utils';
import Schema from './Schema';
import { addressFields } from './address.schema';
import { contactFields } from './contact.schema';

export const orderFields = {
  items: {
    type: 'array',
    required: true,
    subtype: {
      product: { type: 'string' },
      name: { type: 'string', required: true },
      price: { type: 'number', required: true },
      amount: { type: 'number', required: true, min: 1 }
    }
  },
  ...deflateObject({ contact: contactFields, address: addressFields }, 1)
};

const orderSchema = new Schema(orderFields);

export const useOrderForm = (opts) => useSchemaForm(orderSchema, opts);

export default orderSchema;
