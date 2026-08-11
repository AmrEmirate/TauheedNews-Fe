'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateIndonesian } from '@/lib/date-utils';
import { useLanguage } from '@/context/LanguageContext';
import { translateCategory } from '@/lib/i18n';
import AutoTranslate from './AutoTranslate';

interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  createdAt: Date | string;
  category?: {
    name: string;
  };
  author?: {
    name: string;
  };
}

export default function LatestArticlesSection({ articles }: { articles: ArticleItem[] }) {
  const { language, t } = useLanguage();

  if (!articles || articles.length === 0) return null;

  return (
    <section className="hidden md:block pt-6 border-t-2 border-brass-gold">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline font-bold text-2xl text-primary dark:text-white uppercase border-l-4 rtl:border-l-0 rtl:border-r-4 border-brass-gold pl-3 rtl:pl-0 rtl:pr-3">
          {t('latestArticles')}
        </h2>
      </div>

      <div className="space-y-6">
        {articles.map((art) => (
          <article
            key={art.id}
            className="flex flex-col sm:flex-row gap-5 p-4 rounded-lg bg-paper-white dark:bg-slate-900 border border-outline-variant/40 hover:border-brass-gold/60 transition-all shadow-sm group"
          >
            <div className="sm:w-1/3 aspect-video sm:h-36 relative overflow-hidden rounded-md bg-news-gray flex-shrink-0">
              {art.coverImage && (
                <Image
                  src={art.coverImage}
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              )}
            </div>
            <div className="sm:w-2/3 flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[10px] font-bold text-brass-gold uppercase tracking-wider">
                  {translateCategory(art.category, language)}
                </span>
                <h3 className="font-headline font-bold text-lg text-primary dark:text-white group-hover:text-brass-gold transition-colors line-clamp-2 mt-1">
                  <Link href={`/artikel/${art.slug}`}>
                    <AutoTranslate text={art.title} />
                  </Link>
                </h3>
                <p className="text-xs text-on-surface-variant dark:text-gray-300 line-clamp-2 mt-1">
                  <AutoTranslate text={art.excerpt} />
                </p>
              </div>

              <div className="flex justify-between items-center text-[11px] text-outline dark:text-gray-400 pt-2 border-t border-outline-variant/20">
                <span>{formatDateIndonesian(art.createdAt, language)}</span>
                <span className="font-semibold text-brass-gold">
                  <AutoTranslate text={art.author?.name || ''} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
