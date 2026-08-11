'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateIndonesian } from '@/lib/date-utils';

interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  createdAt: Date | string;
}

interface DuniaIslamSectionProps {
  articles: ArticleItem[];
}

const SUB_TABS = [
  { label: 'SEMUA', filter: '' },
  { label: 'ARAB SAUDI', filter: 'arab saudi' },
  { label: 'PALESTINA', filter: 'palestina' },
  { label: 'YAMAN', filter: 'yaman' },
  { label: 'AFRIKA', filter: 'afrika' },
];

export default function DuniaIslamSection({ articles }: DuniaIslamSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!articles || articles.length === 0) return null;

  const currentFilter = SUB_TABS[activeTab].filter;
  const filteredArticles = currentFilter
    ? articles.filter((a) => a.title.toLowerCase().includes(currentFilter))
    : articles;

  const displayedArticles = (filteredArticles.length > 0 ? filteredArticles : articles).slice(0, 3);

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-headline font-bold text-xl text-primary dark:text-white uppercase border-l-4 border-brass-gold pl-3 tracking-wide">
          Dunia Islam
        </h2>
        <Link
          href="/kategori/dunia-islam"
          className="text-xs font-bold text-secondary dark:text-brass-gold hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider"
        >
          Lihat Semua <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
        {SUB_TABS.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`whitespace-nowrap text-[11px] font-bold px-3 py-1.5 rounded-md transition-colors ${
              activeTab === idx
                ? 'bg-deep-green text-white'
                : 'bg-news-gray dark:bg-slate-800 text-on-surface-variant dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Article list view */}
      <div className="space-y-4">
        {displayedArticles.map((article) => (
          <article
            key={article.id}
            className="flex gap-4 group"
          >
            {/* Thumbnail */}
            <div className="w-28 h-20 sm:w-32 sm:h-22 relative overflow-hidden rounded-lg bg-news-gray flex-shrink-0 border border-outline-variant/30 shadow-sm">
              {article.coverImage ? (
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-deep-navy/10">
                  <span className="text-brass-gold text-[10px] font-bold">TN</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="font-headline font-bold text-sm sm:text-base leading-snug text-primary dark:text-white group-hover:text-brass-gold transition-colors line-clamp-2">
                <Link href={`/artikel/${article.slug}`}>{article.title}</Link>
              </h3>
              <span className="text-[11px] text-outline dark:text-gray-400 mt-1.5 font-medium">
                {formatDateIndonesian(article.createdAt)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

