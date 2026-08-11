'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/i18n';
import { translateText } from '@/lib/translator';

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
    // Load language preference from localStorage
    const savedLang = localStorage.getItem('tauheed_news_lang') as Language;
    if (savedLang && (savedLang === 'id' || savedLang === 'en' || savedLang === 'ar')) {
      setLanguageState(savedLang);
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
