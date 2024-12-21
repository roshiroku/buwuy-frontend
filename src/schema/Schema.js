import { capitalize } from '../utils/string.utils';
import { schemaValidator } from '../utils/validation.utils';

export default class Schema {
  constructor(fields) {
    this.fields = JSON.parse(JSON.stringify(fields));
    this.items = [];

    for (const name in this.fields) {
      const field = this.fields[name];
      field.name = name;
      field.label ??= capitalize(name);
      field.validator = schemaValidator({ [name]: field });
      field.validate = (val) => field.validator.validate({ [name]: val });
      this.items.push(field);
    }

    this.validator = schemaValidator(this.fields);
  }

  validate(values) {
    const errors = {};
    let hasErrors = false;
    for (const name in values) {
      const error = this.validateField(name, values[name]);
      if (error) {
        errors[name] = error;
        hasErrors = true;
      }
    }
    return hasErrors && errors;
  }

  validateField(name, value) {
    const { error } = this.fields[name].validate(value);
    return error?.details[0].message;
  }

  empty() {
    const res = {};
    this.items.forEach((field) => res[field.name] = '');
    return res;
  }
}
