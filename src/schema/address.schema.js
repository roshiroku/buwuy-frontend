import useSchemaForm from '../hooks/useSchemaForm';
import Schema from './Schema';

export const addressFields = {
  country: { type: 'string', min: 2, max: 24, required: true, label: 'Country' },
  state: { type: 'string', max: 24, label: 'State' },
  city: { type: 'string', min: 2, max: 24, required: true, label: 'City' },
  street: { type: 'string', min: 2, max: 24, required: true, label: 'Street' },
  apt: { type: 'string', min: 1, max: 24, required: true, label: 'Apt. Number' },
  zip: { type: 'string', min: 2, max: 24, required: true, label: 'Zip Code' }
};

const addressSchema = new Schema(addressFields);

export const useAddressForm = (opts) => useSchemaForm(addressSchema, opts);

export default addressSchema;
