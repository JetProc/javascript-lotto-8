export function splitBySeparator(string, separator) {
  return string.trim().split(separator);
}

export function formatNumber(number) {
  return number.toLocaleString('ko-KR', {
    maximumFractionDigits: 1,
  });
}
