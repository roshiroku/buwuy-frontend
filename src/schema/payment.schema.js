import useSchemaForm from '../hooks/useSchemaForm';
import Schema from './Schema';

export const paymentFields = {
  cc: { type: 'string', min: 2, max: 24, required: true, label: 'Card Number' },
  expiration: { type: 'string', min: 4, max: 4, required: true, label: 'Expiration Date' },
  cvv: { type: 'string', min: 3, max: 3, required: true, label: 'CVV' },
  name: { type: 'string', min: 4, max: 48, required: true, label: 'Cardholder Name' },
  identification: { type: 'string', min: 2, max: 24, required: true, label: 'Cardholder ID' }
};

const paymentSchema = new Schema(paymentFields);

export const usePaymentForm = (opts) => useSchemaForm(paymentSchema, opts);

export default paymentSchema;
