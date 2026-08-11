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
  category: {
    name: string;
  };
}

interface FixedAdviceSectionProps {
  article: ArticleItem | null;
}

export default function FixedAdviceSection({ article }: FixedAdviceSectionProps) {
  const { language, t } = useLanguage();

  if (!article) return null;

  return (
    <section className="bg-gradient-to-r from-deep-navy to-deep-green text-white rounded-lg p-6 my-8 border-2 border-brass-gold shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-brass-gold text-deep-navy font-bold text-xs px-3 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">push_pin</span> {t('fixedAdvice')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {article.coverImage && (
          <div className="md:col-span-4 relative h-48 rounded-md overflow-hidden border border-brass-gold/40">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className={`${article.coverImage ? 'md:col-span-8' : 'md:col-span-12'} space-y-3`}>
          <span className="text-xs uppercase font-bold text-brass-gold tracking-widest">
            {translateCategory(article.category, language)}
          </span>

          <h3 className="font-headline font-bold text-xl md:text-2xl leading-snug text-white hover:text-brass-gold transition-colors">
            <Link href={`/artikel/${article.slug}`}>
              <AutoTranslate text={article.title} />
            </Link>
          </h3>

          <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">
            <AutoTranslate text={article.excerpt} />
          </p>

          <div className="pt-2 flex justify-between items-center text-xs">
            <span className="text-gray-300">
              {t('publishedDate')}: {formatDateIndonesian(article.createdAt, language)}
            </span>
            <Link
              href={`/artikel/${article.slug}`}
              className="bg-brass-gold hover:bg-yellow-600 text-deep-navy font-bold px-4 py-2 rounded transition-colors inline-flex items-center gap-1"
            >
              {t('readMore')} <span className="material-symbols-outlined text-[14px] rtl:rotate-180">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
