import { Language } from './i18n';

export function getFormattedDates(dateInput?: Date | string, lang: Language = 'id') {
  const date = dateInput ? new Date(dateInput) : new Date();

  const locale = lang === 'ar' ? 'ar-SA' : lang === 'en' ? 'en-US' : 'id-ID';

  const gregorianFormatter = new Intl.DateTimeFormat(locale, {
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
  const hijriMonths: Record<Language, string[]> = {
    id: [
      'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
      'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
      'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'
    ],
    en: [
      'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
      'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
      'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
    ],
    ar: [
      'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر',
      'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
      'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ],
  };

  const currentHijriMonth = hijriMonths[lang][(month + 2) % 12];
  const currentHijriDay = (day + 1) % 30 || 1;

  const hijriSuffix = lang === 'ar' ? 'هـ' : 'H';
  const hijriStr = `${currentHijriDay} ${currentHijriMonth} ${hijriYears} ${hijriSuffix}`;

  return `${gregorianStr} | ${hijriStr}`;
}

export function formatDateIndonesian(dateInput: Date | string, lang: Language = 'id') {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  const locale = lang === 'ar' ? 'ar-SA' : lang === 'en' ? 'en-US' : 'id-ID';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
