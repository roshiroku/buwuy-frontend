export function toFormData(values, prefix = '') {
  let formData = {};

  for (const name in values) {
    const value = values[name];

    if (typeof value === 'object') {
      formData = {
        ...formData,
        ...toFormData(value, `${prefix}${name}.`)
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
    const path = name.split('.');
    let field = values;

    while (path.length > 1) {
      const part = path.shift();
      field[part] = field[part] || {};
      field = field[part];
    }

    field[path.shift()] = formData[name];
  }

  return values;
}
