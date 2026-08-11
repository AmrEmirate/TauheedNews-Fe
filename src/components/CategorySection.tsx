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
}

interface CategorySectionProps {
  title: string;
  slug: string;
  articles: ArticleItem[];
}

export default function CategorySection({ title, slug, articles }: CategorySectionProps) {
  const { language, t } = useLanguage();

  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-6 md:my-8">
      <div className="flex justify-between items-center mb-4 md:mb-6 pb-2 border-b border-outline-variant/30">
        <h2 className="font-headline font-bold text-lg md:text-2xl text-primary dark:text-white uppercase border-l-4 rtl:border-l-0 rtl:border-r-4 border-brass-gold pl-3 rtl:pl-0 rtl:pr-3 tracking-wide">
          {translateCategory({ name: title, slug }, language)}
        </h2>
        <Link
          href={`/kategori/${slug}`}
          className="text-xs font-bold text-secondary dark:text-brass-gold hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider"
        >
          {t('readMore')} <span className="material-symbols-outlined text-[14px] rtl:rotate-180">arrow_forward</span>
        </Link>
      </div>

      {/* Mobile: Horizontal scrollable / Desktop: Grid */}
      <div className="category-scroll-mobile md:!grid md:grid-cols-2 lg:grid-cols-4 md:gap-5">
        {articles.map((article) => (
          <article key={article.id} className="flex flex-col group space-y-2">
            <div className="aspect-video relative overflow-hidden rounded-md border border-outline-variant/40 bg-news-gray shadow-sm">
              {article.coverImage ? (
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-deep-navy/10 flex items-center justify-center text-brass-gold font-bold">
                  Tauheed News
                </div>
              )}
            </div>

            <h3 className="font-headline font-bold text-sm md:text-base leading-snug group-hover:text-brass-gold transition-colors line-clamp-2 text-primary dark:text-white">
              <Link href={`/artikel/${article.slug}`}>
                <AutoTranslate text={article.title} />
              </Link>
            </h3>

            <p className="text-xs text-on-surface-variant dark:text-gray-300 line-clamp-2 leading-relaxed hidden md:block">
              <AutoTranslate text={article.excerpt} />
            </p>

            <span className="text-[11px] font-semibold text-outline dark:text-gray-400 mt-auto pt-1">
              {formatDateIndonesian(article.createdAt, language)}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
