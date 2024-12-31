export function toCurrency(value, currency = '$', decimal = 2) {
  return currency + (Math.round(value * 10 ** decimal) / 10 ** decimal).toLocaleString();
}
