import Schema from './Schema';
import { addressFields } from './address.schema';
import { contactFields } from './contact.schema';
import useSchemaForm from '../hooks/useSchemaForm';
import { deflateObject } from '../utils/object.utils';

export const shipmentFields = deflateObject({ contact: contactFields, address: addressFields }, 1);

const shipmentSchema = new Schema(shipmentFields);

export const useShipmentForm = (opts) => useSchemaForm(shipmentSchema, opts);

export default shipmentSchema;
