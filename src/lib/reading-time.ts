export function calculateReadingTime(content: string): string {
  if (!content) return '1 Menit Membaca';
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} Menit Membaca`;
}
