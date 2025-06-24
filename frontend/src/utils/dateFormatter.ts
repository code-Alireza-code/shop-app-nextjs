export default function toLocaleDateString(
  date: string,
  locale: Intl.LocalesArgument = "fa-IR",
  options: Intl.DateTimeFormatOptions = {}
) {
  return new Date(date).toLocaleDateString(locale, options);
}
