export function toFormData(values, prefix = '') {
  let formData = {};

  for (const name in values) {
    const value = values[name];

    if (typeof value === 'object') {
      formData = {
        ...formData,
        ...this.formData(value, `${prefix}${name}.`)
      };
    } else {
      formData[prefix + name] = value;
    }
  }

  return formData;
}

export function fromFormData(formData) {
  const values = {};

  for (const name in formData) {
    const value = formData[name];
    const path = name.split('.');

    while (path.length) {
      const part = path.shift();

      if (path.legth) {

      } else {
        
      }
    }
  }
}
