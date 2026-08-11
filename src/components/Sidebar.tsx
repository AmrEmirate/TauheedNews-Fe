'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { translateCategory } from '@/lib/i18n';
import AutoTranslate from './AutoTranslate';

interface PopularArticle {
  id: number;
  title: string;
  slug: string;
  views: number;
  coverImage?: string | null;
  createdAt: Date | string;
  category: {
    name: string;
  };
}

interface KajianItem {
  id: number;
  title: string;
  speaker: string;
  dateTime: string;
  location: string;
}

interface SidebarProps {
  popularArticles?: PopularArticle[];
  upcomingKajian?: KajianItem[];
}

export default function Sidebar({ popularArticles = [], upcomingKajian = [] }: SidebarProps) {
  const { language, t } = useLanguage();

  return (
    <aside className="space-y-8">
      {/* Artikel Terpopuler */}
      <div className="bg-news-gray dark:bg-slate-900 p-6 rounded-lg border border-outline-variant/40 shadow-sm">
        <h3 className="font-headline font-bold text-lg text-primary dark:text-white uppercase border-b-2 border-brass-gold pb-2 mb-4 tracking-wide">
          {t('popularArticles')}
        </h3>
        <div className="space-y-4">
          {popularArticles.map((art, index) => (
            <div key={art.id} className="flex gap-3 items-start group">
              <span className="text-xl font-headline font-extrabold text-brass-gold w-6 text-center leading-none flex-shrink-0">
                {index + 1}
              </span>
              {art.coverImage && (
                <div className="w-16 h-12 relative rounded overflow-hidden flex-shrink-0 bg-news-gray">
                  <Image src={art.coverImage} alt={art.title} fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="space-y-0.5 flex-grow min-w-0">
                <h4 className="text-xs font-bold text-primary dark:text-white leading-snug group-hover:text-brass-gold transition-colors line-clamp-2">
                  <Link href={`/artikel/${art.slug}`}>
                    <AutoTranslate text={art.title} />
                  </Link>
                </h4>
                <span className="text-[10px] text-outline dark:text-gray-400">
                  {translateCategory(art.category, language)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kutipan Hari Ini */}
      <div className="bg-paper-white dark:bg-slate-900 p-6 rounded-lg border-2 border-brass-gold/40 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-brass-gold text-[18px]">format_quote</span>
          <span className="text-xs font-bold uppercase text-brass-gold tracking-widest">
            {t('fixedAdvice')}
          </span>
        </div>
        <p className="font-arabic text-xl text-primary dark:text-white leading-loose mb-3 text-center">
          طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
        </p>
        <p className="text-sm text-on-surface-variant dark:text-gray-300 italic text-center leading-relaxed mb-3">
          &ldquo;<AutoTranslate text="Tauhid adalah hak Allah yang paling agung atas hamba-Nya." />&rdquo;
        </p>
        <div className="flex items-center gap-2 justify-center pt-2 border-t border-outline-variant/30">
          <div className="w-8 h-8 rounded-full bg-deep-navy flex items-center justify-center text-brass-gold text-[10px] font-bold flex-shrink-0">
            <span className="material-symbols-outlined text-[16px]">person</span>
          </div>
          <div>
            <p className="text-xs font-bold text-primary dark:text-white">
              <AutoTranslate text="Syaikh 'Abdul 'Aziz bin Baz" />
            </p>
            <p className="text-[10px] text-brass-gold italic">
              <AutoTranslate text="Rahimahullah" />
            </p>
          </div>
        </div>
      </div>

      {/* Jadwal Kajian */}
      <div className="bg-deep-green text-white p-6 rounded-lg border border-brass-gold/50 shadow-md">
        <h3 className="font-headline font-bold text-lg text-white uppercase tracking-wide mb-4 border-b border-brass-gold/40 pb-2">
          {t('navSchedule')}
        </h3>

        <div className="space-y-4 text-xs">
          {upcomingKajian.slice(0, 3).map((k) => (
            <div key={k.id} className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-brass-gold text-[18px] flex-shrink-0 mt-0.5">event</span>
              <div className="space-y-0.5">
                <h4 className="font-bold text-white text-sm line-clamp-1">
                  <AutoTranslate text={k.title} />
                </h4>
                <p className="text-gray-300">
                  <AutoTranslate text={k.speaker} />
                </p>
                <p className="text-gray-400">
                  <AutoTranslate text={k.dateTime} />
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/jadwal-kajian"
          className="block mt-4 w-full bg-brass-gold hover:bg-yellow-600 text-deep-navy text-center font-bold text-xs py-2.5 rounded uppercase tracking-wider transition-colors"
        >
          {t('readMore')}
        </Link>
      </div>

      {/* E-Book Gratis */}
      <div className="bg-news-gray dark:bg-slate-900 p-6 rounded-lg border border-outline-variant/40 shadow-sm">
        <h3 className="font-headline font-bold text-lg text-primary dark:text-white uppercase tracking-wide mb-3">
          {t('freeEbookTitle')}
        </h3>
        <div className="flex gap-3 items-start">
          <div className="flex-grow">
            <p className="text-xs text-on-surface-variant dark:text-gray-300 leading-relaxed mb-3">
              {t('freeEbookDesc')}
            </p>
            <button className="w-full bg-deep-navy hover:bg-black text-white font-bold text-xs py-2.5 rounded uppercase tracking-wider transition-colors">
              {t('downloadNow')}
            </button>
          </div>
          <div className="w-20 h-24 relative rounded overflow-hidden flex-shrink-0 bg-deep-navy/10">
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-brass-gold">menu_book</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Sidebar */}
      <div className="bg-gradient-to-br from-brass-gold to-yellow-700 text-deep-navy p-6 rounded-lg shadow-md space-y-3">
        <h4 className="font-headline font-bold text-lg leading-tight uppercase">
          {t('newsletterTitle')}
        </h4>
        <p className="text-xs text-deep-navy/90 font-medium">
          {t('newsletterDesc')}
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
          <input
            suppressHydrationWarning
            type="email"
            placeholder={t('emailInputPlaceholder')}
            className="w-full text-xs p-2.5 rounded bg-white border-none text-primary placeholder:text-gray-400 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-deep-navy text-white text-xs font-bold py-2 rounded hover:bg-black transition-colors uppercase tracking-wider"
          >
            {t('subscribeFree')}
          </button>
        </form>
      </div>
    </aside>
  );
}
