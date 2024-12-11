export function ucFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export function capitalize(str) {
  return str ? str.split(' ').map(ucFirst).join(' ') : '';
}
