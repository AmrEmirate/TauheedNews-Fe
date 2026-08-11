import { Language } from './i18n';

// Memory cache to store translated strings during session
const translationCache: Record<string, string> = {};

/**
 * Translates dynamic text from Indonesian to target language (en or ar)
 */
export async function translateText(text: string, targetLang: Language): Promise<string> {
  if (!text || text.trim() === '' || targetLang === 'id') {
    return text;
  }

  const cleanText = text.trim();
  const cacheKey = `${targetLang}:${cleanText}`;

  // 1. Check in-memory cache
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  // 2. Check localStorage cache
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(`trans_${cacheKey}`);
      if (stored) {
        translationCache[cacheKey] = stored;
        return stored;
      }
    } catch {
      // localStorage read failed
    }
  }

  // 3. Call Internal Next.js Server Translation API (/api/translate)
  try {
    const response = await fetch(`/api/translate?text=${encodeURIComponent(cleanText)}&target=${targetLang}`);
    if (response.ok) {
      const data = await response.json();
      if (data?.translatedText && data.translatedText.trim() !== '') {
        const result = data.translatedText;
        cacheTranslation(cacheKey, result);
        return result;
      }
    }
  } catch (error) {
    console.warn('Internal server translation API error, trying client fallback...', error);
  }

  // 4. Client-side fallback to Direct Google GTX
  try {
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=${targetLang}&dt=t&q=${encodeURIComponent(cleanText)}`;
    const response = await fetch(gtxUrl);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translatedParts = data[0].map((item: any) => item[0]).filter(Boolean);
        const result = translatedParts.join('');
        if (result && result.trim() !== '') {
          cacheTranslation(cacheKey, result);
          return result;
        }
      }
    }
  } catch (error) {
    console.warn('Client Google GTX fallback error:', error);
  }

  return cleanText;
}

function cacheTranslation(cacheKey: string, result: string) {
  translationCache[cacheKey] = result;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`trans_${cacheKey}`, result);
    } catch {
      // Ignore storage errors
    }
  }
}
