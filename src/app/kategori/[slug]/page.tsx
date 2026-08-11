import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCategoryWithArticles, getPopularArticles, getKajianList } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import { formatDateIndonesian } from '@/lib/date-utils';
import { translateCategory } from '@/lib/i18n';
import AutoTranslate from '@/components/AutoTranslate';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams?.slug || '');

  const data = await getCategoryWithArticles(slug);

  if (!data || !data.category) {
    notFound();
  }

  const { category, articles } = data;
  const popularArticles = await getPopularArticles();
  const upcomingKajian = await getKajianList();

  const heroArticle = articles.length > 0 ? articles[0] : null;
  const gridArticles = articles.length > 1 ? articles.slice(1) : [];

  const subFilters = ['Semua', 'Fiqih', 'Akhlaq', 'Doa & Zikir', 'Keluarga'];

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 space-y-6">
      {/* Header section matching blueprint */}
      <div>
        <div className="flex items-center gap-2 text-xs text-outline dark:text-gray-400 font-semibold mb-2">
          <Link href="/" className="hover:underline">
            Beranda
          </Link>
          <span>&gt;</span>
          <span className="text-primary dark:text-white font-bold">
            <AutoTranslate text={category.name} />
          </span>
        </div>
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-primary dark:text-white tracking-tight">
          <AutoTranslate text={category.name} />
        </h1>
        <p className="text-xs text-on-surface-variant dark:text-gray-300 mt-1">
          <AutoTranslate text="Panduan amaliah sehari-hari berdasarkan Al-Qur'an dan As-Sunnah." />
        </p>
      </div>

      {/* Sub-category Filter Chips matching blueprint */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-outline-variant/30">
        {subFilters.map((filter, idx) => (
          <button
            key={filter}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
              idx === 0
                ? 'bg-deep-navy text-white border-deep-navy dark:bg-brass-gold dark:text-deep-navy dark:border-brass-gold'
                : 'bg-news-gray dark:bg-slate-800 text-on-surface dark:text-gray-200 border-outline-variant/40 hover:border-brass-gold'
            }`}
          >
            <AutoTranslate text={filter} />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {articles.length === 0 ? (
            <div className="text-center py-12 bg-news-gray rounded-lg text-on-surface-variant">
              <AutoTranslate text="Belum ada artikel yang diterbitkan dalam kategori ini." />
            </div>
          ) : (
            <>
              {/* Category Hero Featured Card */}
              {heroArticle && (
                <article className="relative h-[380px] rounded-lg overflow-hidden group border border-outline-variant/40 shadow-md">
                  {heroArticle.coverImage && (
                    <Image
                      src={heroArticle.coverImage}
                      alt={heroArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white w-full space-y-2">
                    <span className="bg-brass-gold text-deep-navy font-bold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider inline-block">
                      <AutoTranslate text={category.name} />
                    </span>
                    <h2 className="font-headline font-bold text-2xl md:text-3xl leading-snug hover:text-brass-gold transition-colors">
                      <Link href={`/artikel/${heroArticle.slug}`}>
                        <AutoTranslate text={heroArticle.title} />
                      </Link>
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-gray-300">
                      <span>Oleh {heroArticle.author?.name || 'Redaksi'}</span>
                      <span>•</span>
                      <span>{formatDateIndonesian(heroArticle.createdAt)}</span>
                    </div>
                  </div>
                </article>
              )}

              {/* Remaining Grid Articles */}
              {gridArticles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {gridArticles.map((art: any) => (
                    <article
                      key={art.id}
                      className="flex flex-col bg-paper-white dark:bg-slate-900 rounded-lg overflow-hidden border border-outline-variant/40 hover:border-brass-gold transition-all shadow-sm group"
                    >
                      <div className="aspect-video relative overflow-hidden bg-news-gray">
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
                      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                        <div>
                          <span className="text-[10px] font-bold text-brass-gold uppercase tracking-wider">
                            <AutoTranslate text={category.name} />
                          </span>
                          <h3 className="font-headline font-bold text-base text-primary dark:text-white group-hover:text-brass-gold transition-colors line-clamp-2 mt-1">
                            <Link href={`/artikel/${art.slug}`}>
                              <AutoTranslate text={art.title} />
                            </Link>
                          </h3>
                          <p className="text-xs text-on-surface-variant dark:text-gray-300 line-clamp-2 mt-2">
                            <AutoTranslate text={art.excerpt} />
                          </p>
                        </div>

                        <div className="flex justify-between items-center text-[11px] text-outline dark:text-gray-400 pt-3 border-t border-outline-variant/20">
                          <span>{formatDateIndonesian(art.createdAt)}</span>
                          <span className="font-semibold text-brass-gold">
                            {art.author?.name}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Load More Button matching blueprint */}
              <div className="pt-4 text-center">
                <button className="w-full sm:w-auto px-8 py-3 rounded-md border border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-news-gray text-xs font-bold text-primary dark:text-white transition-colors tracking-wider uppercase shadow-sm">
                  Muat Lebih Banyak
                </button>
              </div>
            </>
          )}
        </div>

        <div className="lg:col-span-4">
          <Sidebar
            popularArticles={popularArticles}
            upcomingKajian={upcomingKajian}
          />
        </div>
      </div>
    </div>
  );
}

