import { Language } from './i18n';

export function calculateReadingTime(content: string, lang: Language = 'id'): string {
  if (!content) {
    if (lang === 'ar') return '١ دقيقة قراءة';
    if (lang === 'en') return '1 min read';
    return '1 Menit Membaca';
  }
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  if (lang === 'ar') return `${minutes} دقيقة قراءة`;
  if (lang === 'en') return `${minutes} min read`;
  return `${minutes} Menit Membaca`;
}
