import { Language } from './i18n';

// Memory cache to store translated strings during session
const translationCache: Record<string, string> = {};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Translates dynamic text from Indonesian to target language (en or ar).
 * Priority:
 * 1. In-memory cache
 * 2. localStorage cache
 * 3. Next.js API route (which queries backend + Google GTX)
 * 4. Client-side Google GTX fallback
 */
export async function translateText(text: string, targetLang: Language): Promise<string> {
  if (!text || text.trim() === '' || targetLang === 'id') {
    return text;
  }

  const cleanText = text.trim();
  const cacheKey = `${targetLang}:${cleanText}`;

  // 1. Check in-memory cache (only if actually translated)
  if (translationCache[cacheKey] && translationCache[cacheKey] !== cleanText) {
    return translationCache[cacheKey];
  }

  // 2. Check localStorage cache (only if actually translated)
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(`trans_${cacheKey}`);
      if (stored && stored.trim() !== '' && stored !== cleanText) {
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

  // 4. Client-side fallback to Direct Google GTX (last resort)
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

/**
 * Batch translate multiple texts at once.
 * More efficient than translating one by one.
 */
export async function translateBatch(
  texts: string[],
  targetLang: Language
): Promise<Record<string, string>> {
  if (targetLang === 'id' || texts.length === 0) {
    const result: Record<string, string> = {};
    texts.forEach((t) => { result[t] = t; });
    return result;
  }

  const results: Record<string, string> = {};
  const uncached: string[] = [];

  // Check cache first
  for (const text of texts) {
    const cleanText = text.trim();
    if (!cleanText) {
      results[text] = text;
      continue;
    }
    const cacheKey = `${targetLang}:${cleanText}`;
    if (translationCache[cacheKey]) {
      results[text] = translationCache[cacheKey];
    } else if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`trans_${cacheKey}`);
        if (stored) {
          translationCache[cacheKey] = stored;
          results[text] = stored;
        } else {
          uncached.push(text);
        }
      } catch {
        uncached.push(text);
      }
    } else {
      uncached.push(text);
    }
  }

  // Translate uncached texts in parallel with concurrency limit
  if (uncached.length > 0) {
    const BATCH_SIZE = 5;
    for (let i = 0; i < uncached.length; i += BATCH_SIZE) {
      const batch = uncached.slice(i, i + BATCH_SIZE);
      const promises = batch.map(async (text) => {
        const translated = await translateText(text, targetLang);
        results[text] = translated;
      });
      await Promise.all(promises);
    }
  }

  return results;
}

function cacheTranslation(cacheKey: string, result: string) {
  if (!result || result.trim() === '') return;
  // Extract original text from cacheKey (format: "lang:cleanText")
  const colonIdx = cacheKey.indexOf(':');
  const originalText = colonIdx !== -1 ? cacheKey.substring(colonIdx + 1) : '';

  // Only store if the result is actually translated (different from original)
  if (result !== originalText) {
    translationCache[cacheKey] = result;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`trans_${cacheKey}`, result);
      } catch {
        // Ignore storage errors
      }
    }
  }
}

/**
 * Purge any stale untranslated strings (where stored value equals original text)
 */
export function purgeStaleCache() {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('trans_')) {
        const val = localStorage.getItem(key);
        const originalText = key.substring(key.indexOf(':') + 1);
        if (val === originalText) {
          keysToRemove.push(key);
        }
      }
    }
    keysToRemove.forEach((k) => {
      localStorage.removeItem(k);
      delete translationCache[k.substring(6)];
    });
  } catch {
    // Ignore storage errors
  }
}
