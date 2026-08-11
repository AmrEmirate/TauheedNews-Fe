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

  const cacheKey = `${targetLang}:${text}`;

  // 1. Check in-memory cache
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  // 2. Check localStorage cache if available
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(`trans_${cacheKey}`);
      if (stored) {
        translationCache[cacheKey] = stored;
        return stored;
      }
    } catch {
      // localStorage read failed, continue
    }
  }

  try {
    // Break large text into chunks if necessary (max ~450 chars per request for free MyMemory API)
    if (text.length > 500) {
      const paragraphs = text.split('\n\n');
      const translatedParagraphs = await Promise.all(
        paragraphs.map(p => translateShortText(p, targetLang))
      );
      const result = translatedParagraphs.join('\n\n');
      cacheTranslation(cacheKey, result);
      return result;
    } else {
      const result = await translateShortText(text, targetLang);
      cacheTranslation(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.warn(`Translation error for target [${targetLang}]:`, error);
    return text; // Return original text as fallback
  }
}

async function translateShortText(text: string, targetLang: Language): Promise<string> {
  if (!text.trim()) return text;

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=id|${targetLang}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    return text;
  }

  const data = await response.json();
  if (data?.responseData?.translatedText) {
    const translated = data.responseData.translatedText;
    // Filter out MyMemory warning messages if quota reached
    if (translated.includes('MYMEMORY WARNING') || translated.includes('QUERY LENGTH LIMIT EXCEEDED')) {
      return text;
    }
    return translated;
  }

  return text;
}

function cacheTranslation(cacheKey: string, result: string) {
  translationCache[cacheKey] = result;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`trans_${cacheKey}`, result);
    } catch {
      // Ignore quota errors
    }
  }
}
