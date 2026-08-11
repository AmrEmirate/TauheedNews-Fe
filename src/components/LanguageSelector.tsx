'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/i18n';

const languages: { code: Language; label: string; flag: string; short: string }[] = [
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩', short: 'ID' },
  { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', short: 'AR' },
];

export default function LanguageSelector({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'full') {
    return (
      <div className="w-full space-y-2">
        <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 uppercase tracking-wider">
          <span className="material-symbols-outlined text-base text-brass-gold">translate</span>
          Pilihan Bahasa / Select Language / اختر اللغة
        </label>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all border ${
                language === lang.code
                  ? 'bg-brass-gold text-deep-navy border-brass-gold shadow-md'
                  : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.short}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 text-white text-xs font-bold transition-colors shadow-xs"
        aria-label="Change Language"
        title="Ubah Bahasa / Change Language"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="font-semibold tracking-wide uppercase text-[11px]">{currentLang.short}</span>
        <span className="material-symbols-outlined text-[14px] transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-44 rounded-xl bg-deep-navy text-white shadow-2xl border border-brass-gold/30 z-50 overflow-hidden animate-fadeIn backdrop-blur-md">
          <div className="py-1">
            <div className="px-3 py-1.5 text-[10px] uppercase font-extrabold text-brass-gold tracking-wider border-b border-white/10">
              Bahasa / Language
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors ${
                  language === lang.code
                    ? 'bg-brass-gold/20 text-brass-gold font-bold border-l-2 border-brass-gold'
                    : 'hover:bg-white/10 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                {language === lang.code && (
                  <span className="material-symbols-outlined text-brass-gold text-[16px]">check</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
