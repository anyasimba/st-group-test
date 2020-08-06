export function formatDate (date: Date) {
  const dateTimeFormat = new Intl.DateTimeFormat('ru', {year: 'numeric', month: 'short', day: 'numeric'})
  const [{value: day},,{value: month},,{value: year}] = dateTimeFormat.formatToParts(date)
  return `${day} ${month} ${year}`
}
