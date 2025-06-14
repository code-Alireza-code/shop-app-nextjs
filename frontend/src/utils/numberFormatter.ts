type InputType = string | number;

export function toPersianDigits(n: InputType) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n.toString().replace(/\d/g, (x: string) => persianDigits[parseInt(x)]);
}
