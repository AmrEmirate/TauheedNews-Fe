import { Language } from './i18n';

// Memory cache to store translated strings during session
const translationCache: Record<string, string> = {};

// Tier 1: Static Dictionary for Seeded & Popular Articles / Expressions
const staticArticleDictionary: Record<string, { en: string; ar: string }> = {
  'Peran Tauhid dalam Membangun Peradaban Islam': {
    en: 'The Role of Tauheed in Building Islamic Civilization',
    ar: 'دور التوحيد في بناء الحضارة الإسلامية',
  },
  'Tauhid bukan hanya keyakinan, tetapi fondasi utama dalam membangun peradaban yang mulia dan bermartabat.': {
    en: 'Tauheed is not just a belief, but the main foundation in building a noble and dignified civilization.',
    ar: 'التوحيد ليس مجرد عقيدة، بل هو الأساس الرئيسي لبناء حضارة كريمة وكريمة.',
  },
  'Arab Saudi Tegaskan Komitmen pada Al-Qur\'an dan Sunnah': {
    en: 'Saudi Arabia Reaffirms Commitment to Quran and Sunnah',
    ar: 'المملكة العربية السعودية تؤكد التزامها بالقرآن والسنة',
  },
  'Mengenal Biografi Syaikh \'Abdul \'Aziz bin Baz: Mufti Agung Pendukung Sunnah': {
    en: 'Biography of Sheikh \'Abdul \'Aziz bin Baz: Grand Mufti and Supporter of Sunnah',
    ar: 'التعرف على سيرة الشيخ عبد العزيز بن باز: المفتي العام والداعم للسنة',
  },
  'Landasan Utama Aqidah Ahlussunnah wal Jamaah': {
    en: 'Main Foundations of the Aqidah of Ahlussunnah wal Jamaah',
    ar: 'الأسس الرئيسية لعقيدة أهل السنة والجماعة',
  },
  'Tauhid: Fondasi Agama': {
    en: 'Tauheed: Foundation of Religion',
    ar: 'التوحيد: أساس الدين',
  },
  'Tafsir Surah Al-Fatihah': {
    en: 'Exegesis of Surah Al-Fatihah',
    ar: 'تفسير سورة الفاتحة',
  },
  'Kitab Riyadush Shalihin: Bab Ikhlas': {
    en: 'Book of Riyadush Shalihin: Chapter of Sincerity',
    ar: 'كتاب رياض الصالحين: باب الإخلاص',
  },
  'Tauhid adalah hak Allah yang paling agung atas hamba-Nya.': {
    en: 'Tauheed is the greatest right of Allah over His servants.',
    ar: 'التوحيد هو أعظم حق لله على عباده.',
  },
  'Barangsiapa memurnikan tauhidnya, niscaya Allah akan melapangkan dadanya dan menenangkan jiwanya.': {
    en: 'Whoever purifies his Tauheed, Allah will surely expand his chest and calm his soul.',
    ar: 'من خلص توحيده شرح الله صدره وطمأن نفسه.',
  },
  'Ilmu itu diambil dari lisan para ulama, bukan hanya dari membaca lembaran buku.': {
    en: 'Knowledge is taken from the tongues of scholars, not just from reading book pages.',
    ar: 'إنما العلم يؤخذ من أفواه العلماء لا من صحف الكتب.',
  },
  'Istiqamah di atas sunnah adalah kemuliaan tertinggi yang dikejar oleh setiap mukmin.': {
    en: 'Steadfastness upon the Sunnah is the highest honor pursued by every believer.',
    ar: 'الاستقامة على السنة هي أعلى شرف يسعى إليه كل مؤمن.',
  },
  'Redaksi Tauheed News': {
    en: 'Tauheed News Editorial',
    ar: 'هيئة تحرير أخبار التوحيد',
  },
  'Ust. Firanda Andirja': {
    en: 'Ust. Firanda Andirja',
    ar: 'الشيخ فيراندا أنديرجا',
  },
  'Ust. Syafiq Riza Basalamah': {
    en: 'Ust. Syafiq Riza Basalamah',
    ar: 'الشيخ شفيق رزا باسلامة',
  },
  'Ust. Muhammad Nuzul Dzulqarnain': {
    en: 'Ust. Muhammad Nuzul Dzulqarnain',
    ar: 'الشيخ محمد نزل ذو القرنين',
  },
};

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

  // 2. Check Static Dictionary
  if (staticArticleDictionary[cleanText] && staticArticleDictionary[cleanText][targetLang]) {
    const dictResult = staticArticleDictionary[cleanText][targetLang];
    cacheTranslation(cacheKey, dictResult);
    return dictResult;
  }

  // 3. Check localStorage cache
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

  // 4. Try Google Translate GTX Endpoint (Fast & Reliable)
  try {
    const gtxResult = await translateWithGoogleGTX(cleanText, targetLang);
    if (gtxResult && gtxResult !== cleanText) {
      cacheTranslation(cacheKey, gtxResult);
      return gtxResult;
    }
  } catch (err) {
    console.warn('Google GTX Translation failed, trying fallback...', err);
  }

  // 5. Fallback to MyMemory API
  try {
    const myMemoryResult = await translateWithMyMemory(cleanText, targetLang);
    if (myMemoryResult && myMemoryResult !== cleanText) {
      cacheTranslation(cacheKey, myMemoryResult);
      return myMemoryResult;
    }
  } catch (err) {
    console.warn('MyMemory Translation failed:', err);
  }

  return cleanText;
}

/**
 * Google Translate GTX Free Web Endpoint
 */
async function translateWithGoogleGTX(text: string, targetLang: Language): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) return text;

  const data = await response.json();
  if (Array.isArray(data) && Array.isArray(data[0])) {
    const translatedParts = data[0].map((item: any) => item[0]).filter(Boolean);
    const result = translatedParts.join('');
    return result || text;
  }

  return text;
}

/**
 * MyMemory Translation API Endpoint (Backup)
 */
async function translateWithMyMemory(text: string, targetLang: Language): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${targetLang}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) return text;

  const data = await response.json();
  if (data?.responseData?.translatedText) {
    const translated = data.responseData.translatedText;
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
