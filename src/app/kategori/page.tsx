import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getArticles } from '@/lib/api';
import { formatDateIndonesian } from '@/lib/date-utils';
import AutoTranslate from '@/components/AutoTranslate';

export const revalidate = 0;

export default async function CategoriesOverviewPage() {
  const categories = (await getCategories()) || [];
  const allArticles = (await getArticles({ limit: 40 })) || [];

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="font-headline font-bold text-2xl md:text-4xl text-primary dark:text-white uppercase tracking-wide border-l-4 border-brass-gold pl-3 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-3">
          <AutoTranslate text="Kategori Berita & Keilmuan Islam" />
        </h1>
        <p className="text-xs md:text-sm text-on-surface-variant dark:text-gray-300 mt-2">
          <AutoTranslate text="Jelajahi berbagai sajian informasi, tuntunan Islam, aqidah, kajian ulama, dan berita dunia Islam." />
        </p>
      </div>

      {/* Grid Kategori Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat: any) => (
          <Link
            key={cat.id}
            href={`/kategori/${cat.slug}`}
            className="group bg-paper-white dark:bg-slate-900 border border-outline-variant/40 hover:border-brass-gold/80 rounded-xl p-4 transition-all shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-deep-green/10 dark:bg-deep-green/30 text-deep-green dark:text-brass-gold flex items-center justify-center group-hover:bg-brass-gold group-hover:text-deep-navy transition-colors">
                <span className="material-symbols-outlined text-xl">folder_open</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brass-gold/15 text-brass-gold">
                {cat._count?.articles || 0} <AutoTranslate text="Artikel" />
              </span>
            </div>
            <h2 className="font-headline font-bold text-sm md:text-base text-primary dark:text-white group-hover:text-brass-gold transition-colors line-clamp-1">
              <AutoTranslate text={cat.name} />
            </h2>
          </Link>
        ))}
      </div>

      {/* Section per Kategori */}
      <div className="space-y-10 pt-4">
        {categories.map((cat: any) => {
          const catArticles = allArticles.filter((a: any) => a.categoryId === cat.id).slice(0, 4);
          if (catArticles.length === 0) return null;

          return (
            <section key={cat.id} className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                <h3 className="font-headline font-bold text-lg md:text-xl text-primary dark:text-white uppercase border-l-4 border-brass-gold pl-3 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-3">
                  <AutoTranslate text={cat.name} />
                </h3>
                <Link
                  href={`/kategori/${cat.slug}`}
                  className="text-xs font-bold text-secondary dark:text-brass-gold hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider"
                >
                  <AutoTranslate text="Lihat Semua" /> ({cat._count?.articles || catArticles.length}){' '}
                  <span className="material-symbols-outlined text-[14px] rtl:rotate-180">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {catArticles.map((art: any) => (
                  <article key={art.id} className="flex flex-col group space-y-2">
                    <div className="aspect-video relative overflow-hidden rounded-lg border border-outline-variant/40 bg-news-gray shadow-sm">
                      {art.coverImage ? (
                        <Image
                          src={art.coverImage}
                          alt={art.title}
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
                    <h4 className="font-headline font-bold text-sm leading-snug group-hover:text-brass-gold transition-colors line-clamp-2 text-primary dark:text-white">
                      <Link href={`/artikel/${art.slug}`}>
                        <AutoTranslate text={art.title} />
                      </Link>
                    </h4>
                    <span className="text-[11px] font-semibold text-outline dark:text-gray-400 mt-auto pt-1">
                      {formatDateIndonesian(art.createdAt)}
                    </span>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
