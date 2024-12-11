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
    this.validate = this.validator.validate;
  }

  validateField(name, value) {
    return this.fields[name].validate(value);
  }

  empty() {
    const res = {};
    this.items.forEach((field) => res[field.name] = '');
    return res;
  }
}
