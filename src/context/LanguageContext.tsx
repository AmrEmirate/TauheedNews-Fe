'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/i18n';
import { translateText, purgeStaleCache } from '@/lib/translator';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
  translateDynamic: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'id',
  setLanguage: () => {},
  dir: 'ltr',
  t: (key: string) => key,
  translateDynamic: async (text: string) => text,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    purgeStaleCache();
    // 1. Check saved preference in localStorage
    const savedLang = localStorage.getItem('tauheed_news_lang') as Language;
    if (savedLang && (savedLang === 'id' || savedLang === 'en' || savedLang === 'ar')) {
      setLanguageState(savedLang);
      return;
    }

    // 2. Auto-detect from Browser System Language
    const sysLangs = typeof navigator !== 'undefined'
      ? [navigator.language, ...(navigator.languages || [])].map((l) => l.toLowerCase())
      : [];

    const isSystemArabic = sysLangs.some((l) => l.startsWith('ar'));
    const isSystemEnglish = sysLangs.some((l) => l.startsWith('en'));
    const isSystemIndonesian = sysLangs.some((l) => l.startsWith('id') || l.startsWith('ms'));

    if (isSystemArabic) {
      setLanguageState('ar');
      return;
    }
    if (isSystemEnglish) {
      setLanguageState('en');
      return;
    }
    if (isSystemIndonesian) {
      setLanguageState('id');
      return;
    }

    // 3. Fallback: Auto-detect from System Timezone
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const arabTimezones = [
        'Riyadh', 'Dubai', 'Cairo', 'Kuwait', 'Qatar', 'Amman',
        'Muscat', 'Bahrain', 'Baghdad', 'Damascus', 'Casablanca',
        'Tunis', 'Algiers', 'Khartoum', 'Aden', 'Gaza', 'Hebron'
      ];
      const isArabRegion = arabTimezones.some((tz) => timeZone.includes(tz));
      if (isArabRegion) {
        setLanguageState('ar');
        return;
      }
    } catch (e) {
      console.error('Timezone detection error:', e);
    }

    // 4. Asynchronous IP Geolocation Detection (Fast Fetch)
    if (typeof window !== 'undefined') {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      fetch('https://ipapi.co/json/', { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          clearTimeout(timeoutId);
          const country = (data.country_code || '').toUpperCase();
          const arabCountries = ['SA', 'AE', 'EG', 'KW', 'QA', 'OM', 'BH', 'JO', 'LB', 'IQ', 'YE', 'MA', 'DZ', 'TN', 'LY', 'SD', 'SY', 'PS'];
          const englishCountries = ['US', 'GB', 'AU', 'CA', 'NZ', 'IE', 'SG', 'PH'];

          if (arabCountries.includes(country)) {
            setLanguageState('ar');
          } else if (englishCountries.includes(country)) {
            setLanguageState('en');
          }
        })
        .catch(() => {
          clearTimeout(timeoutId);
        });
    }
  }, []);

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Update HTML element attributes for RTL and Lang
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', language);

      if (language === 'ar') {
        document.documentElement.classList.add('rtl-active');
      } else {
        document.documentElement.classList.remove('rtl-active');
      }
    }
  }, [language, dir]);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    purgeStaleCache();
    if (typeof window !== 'undefined') {
      localStorage.setItem('tauheed_news_lang', newLang);
    }
  };

  const t = (key: string): string => {
    const item = translations[key];
    if (!item) return key;
    return item[language] || item.id || key;
  };

  const translateDynamic = async (text: string): Promise<string> => {
    return translateText(text, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t, translateDynamic }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
