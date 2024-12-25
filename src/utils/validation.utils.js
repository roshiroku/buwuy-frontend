import Joi from 'joi';
import { capitalize } from './string.utils';

export function fieldValidator(name, { type = 'object', ...field }) {
  let validator;

  switch (type) {
    case 'number':
      validator = Joi.number();
      break;
    case 'email':
      validator = Joi.string().email({ tlds: { allow: false } });
      break;
    case 'file':
      validator = Joi.alternatives().try(Joi.object(), Joi.string());
      break;
    case 'array':
      validator = Joi.array().items(fieldValidator(null, field.subtype));
      break;
    case 'object':
      const schema = {};
      for (const name in field) {
        schema[name] = fieldValidator(name, field[name]);
      }
      validator = Joi.object(schema);
      break;
    default:
      validator = Joi.string();
  }

  if (field.pattern) {
    validator = validator.pattern(new RegExp(field.pattern, field.flags));
  }

  if (field.required) {
    validator = validator.required();
  } else {
    validator = validator.allow('');
  }

  if ('min' in field) {
    validator = validator.min(field.min);
  }

  if ('max' in field) {
    validator = validator.max(field.max);
  }

  if (field.label || name) {
    validator = validator.label(field.label || capitalize(name));
  }

  if (field.messages) {
    validator = validator.messages(field.messages);
  }

  return validator;
}

export function schemaValidator(fields) {
  const schema = {};

  for (const name in fields) {
    schema[name] = fieldValidator(name, fields[name]);
  }

  return Joi.object(schema);
}
