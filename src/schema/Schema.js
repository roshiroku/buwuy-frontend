import { schemaValidator } from '../utils/validation.utils';

export default class Schema {
  constructor(fields) {
    this.fields = JSON.parse(JSON.stringify(fields));
    this.validator = schemaValidator(this.fields);
    this.validate = this.validator.validate;

    for (const name in this.fields) {
      const field = this.fields[name];
      field.validator = schemaValidator({ [name]: field });
      field.validate = (val) => field.validator.validate({ [name]: val });
    }
  }

  validateField(name, value) {
    return this.fields[name].validate(value);
  }

}
