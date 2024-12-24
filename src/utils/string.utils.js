export function ucFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export function capitalize(str) {
  return str ? str.split(' ').map(ucFirst).join(' ') : '';
}

export function isDate(str) {
  const [yyyy, MM, dd, HH, mm, ss, ms] = str?.split(/[-T:.Z]/) || [];
  return ![yyyy, MM, dd, HH, mm, ss, ms].some((num) => isNaN(num));
}
