export function pick(obj, ...props) {
  const res = {};
  props.forEach((name) => res[name] = obj[name]);
  return res;
}

export function omit(obj, ...props) {
  const res = {};
  const omit = new Set();

  props.forEach((name) => omit.add(name));

  for (const name in obj) {
    if (!omit.has(name)) {
      res[name] = obj[name];
    }
  }

  return res;
}

export function deflateObject(obj, depth = null, prefix = '') {
  let values = {};

  for (const name in obj) {
    const value = obj[name];

    if (typeof value === 'object' && depth) {
      values = {
        ...values,
        ...deflateObject(value, depth - 1, `${prefix}${name}.`)
      };
    } else {
      values[prefix + name] = value;
    }
  }

  return values;
}

export function inflateObject(obj) {
  const values = {};

  for (const name in obj) {
    const path = name.split('.');
    let field = values;

    while (path.length > 1) {
      const part = path.shift();
      field[part] = field[part] || {};
      field = field[part];
    }

    field[path.shift()] = obj[name];
  }

  return values;
}
