import Joi from "joi";
import { ucFirst } from "./string.utils";

export function fieldValidator(name, field) {
  let validator = Joi[field.type || 'string']();

  // Apply additional constraints
  if (field.email) {
    validator = validator.email({ tlds: { allow: false } });
  }

  if (field.pattern) {
    validator = validator.pattern(new RegExp(field.pattern, field.flags));
  }

  if (field.required) {
    validator = validator.required();
  }

  if ('min' in field) {
    validator = validator.min(field.min);
  }

  if (field.max) {
    validator = validator.max(field.max);
  }

  validator = validator.label(field.label || ucFirst(name));

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
