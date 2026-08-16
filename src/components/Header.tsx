'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFormattedDates } from '@/lib/date-utils';
import SearchModal from './SearchModal';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const [dateStr, setDateStr] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { language, t } = useLanguage();

  useEffect(() => {
    setDateStr(getFormattedDates(undefined, language));
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, [language]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: t('navHome'), href: '/', icon: 'home' },
    { name: t('saudiNews'), href: '/kategori/saudi-arabia-terkini', icon: 'flag' },
    { name: t('islamicWorld'), href: '/kategori/dunia-islam', icon: 'public' },
    { name: t('fatwaLajnah'), href: '/kategori/fatwa-fikih', icon: 'gavel' },
    { name: t('islamicGuidance'), href: '/kategori/tuntunan-islam', icon: 'menu_book' },
    { name: t('sunnahLecturesVideos'), href: '/multimedia', icon: 'play_circle' },
    { name: t('aqidahTauhid'), href: '/kategori/aqidah-tauhid', icon: 'auto_stories' },
    { name: t('opinionSection'), href: '/kategori/opini', icon: 'rate_review' },
  ];

  return (
    <>
      {/* Top Utility Bar - DESKTOP ONLY */}
      <div className="bg-deep-green text-on-primary py-2 px-4 md:px-6 hidden md:block">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center text-xs font-semibold">
          <span className="tracking-wide">{dateStr || 'Jumat, 9 Mei 2026 | 10 Dzulqa\'dah 1447 H'}</span>
          
          <div className="flex space-x-4 rtl:space-x-reverse items-center">
            <Link href="/tentang-kami" className="hover:text-brass-gold transition-colors">
              {t('navAbout')}
            </Link>
            <Link href="/tentang-kami#pedoman" className="hover:text-brass-gold transition-colors">
              {t('navMediaGuidelines')}
            </Link>
            <Link href="/tentang-kami#kontak" className="hover:text-brass-gold transition-colors">
              {t('navContact')}
            </Link>

            <div className="flex space-x-3 rtl:space-x-reverse ml-4 rtl:ml-0 rtl:mr-4 border-l rtl:border-l-0 rtl:border-r border-white/20 pl-4 rtl:pl-0 rtl:pr-4 items-center">
              <LanguageSelector variant="compact" />

              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-brass-gold flex items-center gap-1"
                aria-label={t('searchBtn')}
              >
                <span className="material-symbols-outlined text-[16px]">search</span>
              </button>
              <button
                onClick={toggleDarkMode}
                className="hover:text-brass-gold flex items-center"
                aria-label="Toggle Dark Mode"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <Link href="/bookmark" className="hover:text-brass-gold transition-colors flex items-center">
                <span className="material-symbols-outlined text-[16px]">bookmark</span>
              </Link>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-brass-gold transition-colors flex items-center">
                <span className="material-symbols-outlined text-[16px]">play_circle</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-paper-white dark:bg-deep-navy border-b border-outline-variant/30 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-2 md:py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hidden text-primary dark:text-white p-1"
                aria-label="Menu Mobile"
              >
                <span className="material-symbols-outlined text-2xl">
                  {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>

              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 md:w-12 md:h-12 relative flex-shrink-0">
                  <Image
                    src="/logo-tauheed.png"
                    alt="Tauheed News Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-extrabold text-primary dark:text-white tracking-tight font-headline group-hover:text-brass-gold transition-colors">
                    {t('siteTitle')}
                  </h1>
                  <p className="text-[10px] md:text-xs font-semibold text-on-surface-variant dark:text-gray-300 flex gap-1.5 items-center">
                    <span className="w-1 h-1 bg-brass-gold rounded-full"></span> {t('taglineTruth')}
                    <span className="w-1 h-1 bg-brass-gold rounded-full"></span> {t('taglineSunnah')}
                    <span className="w-1 h-1 bg-brass-gold rounded-full"></span> {t('taglineInsight')}
                  </p>
                </div>
              </Link>
            </div>

            {/* Language & Search icon - MOBILE ONLY */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSelector variant="compact" />
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-primary dark:text-white p-2 hover:text-brass-gold transition-colors"
                aria-label={t('searchBtn')}
              >
                <span className="material-symbols-outlined text-2xl">search</span>
              </button>
            </div>

            {/* Arabic quote - DESKTOP ONLY */}
            <div className="hidden lg:block text-right rtl:text-left max-w-md">
              <p className="font-arabic text-lg text-on-surface dark:text-gray-200 italic leading-relaxed">
                &ldquo;وَأَنَّ هَٰذَا صِرَاطِي مُسْتَقِيمًا فَاتَّبِعُوهُ&rdquo;
              </p>
              <p className="text-[11px] text-on-surface-variant dark:text-gray-400 font-medium mt-0.5">
                {t('headerVerseTranslation')}
              </p>
            </div>
          </div>
        </div>


        {/* Desktop Navigation Bar */}
        <div className="bg-deep-green text-white hidden md:block">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <nav className="flex items-center overflow-x-auto py-0.5">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.href + idx}
                  href={link.href}
                  className={`text-xs font-bold whitespace-nowrap px-3 py-2.5 hover:text-brass-gold hover:bg-black/20 rounded transition-colors duration-150 tracking-wider flex items-center gap-1.5 ${idx === 0 ? 'bg-black/10' : ''}`}
                >
                  {link.icon && <span className="material-symbols-outlined text-[16px]">{link.icon}</span>}
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
