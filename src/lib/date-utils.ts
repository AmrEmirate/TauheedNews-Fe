export function getFormattedDates(dateInput?: Date | string) {
  const date = dateInput ? new Date(dateInput) : new Date();

  const gregorianFormatter = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const gregorianStr = gregorianFormatter.format(date);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const hijriYears = Math.floor((year - 622) * 1.03068);
  const hijriMonths = [
    'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
    'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
    'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'
  ];
  const currentHijriMonth = hijriMonths[(month + 2) % 12];
  const currentHijriDay = (day + 1) % 30 || 1;

  const hijriStr = `${currentHijriDay} ${currentHijriMonth} ${hijriYears} H`;

  return `${gregorianStr} | ${hijriStr}`;
}

export function formatDateIndonesian(dateInput: Date | string) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
