export default function formatDate(
  dateStr,
  locale = 'ru'
) {
  const date = new Date(dateStr);

  const formattedDate = new Intl.DateTimeFormat(
    locale,
    {
      month: 'long',
      day: 'numeric',
    }
  ).format(date);

  const formattedTime = new Intl.DateTimeFormat(
    locale,
    {
      hour: 'numeric',
      minute: 'numeric',
    }
  ).format(date);

  const year = date.getFullYear();

  return `${formattedDate} ${year} в ${formattedTime}`;
}
