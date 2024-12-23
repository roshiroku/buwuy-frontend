export function ucFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export function capitalize(str) {
  return str ? str.split(' ').map(ucFirst).join(' ') : '';
}

export function isDate(str) {
  return new Date(str).toString() !== 'Invalid Date';
}
