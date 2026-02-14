type DateInput = Date | string | number

export function formatDate(
  date: DateInput,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'en-US',
): string {
  const d = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat(locale, options).format(d)
}
