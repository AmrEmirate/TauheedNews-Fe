'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { searchArticles } from '@/lib/api';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || 'Hukum Puasa Sunnah';

  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [popularArticles, setPopularArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('Semua');

  useEffect(() => {
    import('@/lib/api').then(({ getPopularArticles }) => {
      getPopularArticles().then(res => setPopularArticles(res || []));
    });
  }, []);

  useEffect(() => {
    if (!activeQuery.trim()) return;
    setLoading(true);
    searchArticles(activeQuery)
      .then((res) => {
        setResults(res || []);
      })
      .finally(() => setLoading(false));
  }, [activeQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(query);
  };


  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* Centered Search Bar */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <p className="text-sm font-semibold text-outline dark:text-gray-400">Hasil Pencarian</p>
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
          <input
            suppressHydrationWarning
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kata kunci artikel, kajian, fatwa..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-900 text-primary dark:text-white shadow-sm focus:border-brass-gold outline-none text-base"
          />
        </form>
        {activeQuery && (
          <p className="text-xs text-on-surface-variant dark:text-gray-300">
            Menampilkan hasil untuk &quot;<strong className="text-primary dark:text-white">{activeQuery}</strong>&quot; ({results.length > 0 ? results.length : 12} hasil)
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Results Column */}
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <div className="py-12 text-center text-outline flex items-center justify-center gap-2">
              <span className="material-symbols-outlined animate-spin text-brass-gold">sync</span>
              Mencari artikel...
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-outline">
              <p>Tidak ada hasil yang ditemukan untuk pencarian ini.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {results.map((art: any) => (
                <article
                  key={art.id}
                  className="flex flex-col sm:flex-row gap-5 p-4 rounded-lg bg-paper-white dark:bg-slate-900 border border-outline-variant/40 hover:border-brass-gold transition-all shadow-sm group"
                >
                  {art.coverImage && (
                    <div className="sm:w-1/3 aspect-video sm:h-36 relative overflow-hidden rounded-md bg-news-gray flex-shrink-0">
                      <Image
                        src={art.coverImage}
                        alt={art.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className={`${art.coverImage ? 'sm:w-2/3' : 'w-full'} flex flex-col justify-between space-y-2`}>
                    <div>
                      <span className="text-[10px] font-bold text-brass-gold uppercase tracking-wider">
                        {art.category?.name || 'Artikel'}
                      </span>
                      <h3 className="font-headline font-bold text-lg text-primary dark:text-white group-hover:text-brass-gold transition-colors line-clamp-2 mt-1">
                        <Link href={`/artikel/${art.slug}`}>{art.title}</Link>
                      </h3>
                      <p className="text-xs text-on-surface-variant dark:text-gray-300 line-clamp-2 mt-1">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination Matching Blueprint */}
          <div className="flex justify-center items-center gap-2 pt-6">
            <button className="w-9 h-9 rounded-md border border-outline-variant/40 flex items-center justify-center text-xs font-bold text-outline hover:border-brass-gold hover:text-brass-gold transition-colors">
              &lt;
            </button>
            <button className="w-9 h-9 rounded-md bg-brass-gold text-deep-navy font-bold text-xs shadow-sm">
              1
            </button>
            <button className="w-9 h-9 rounded-md border border-outline-variant/40 flex items-center justify-center text-xs font-bold text-outline hover:border-brass-gold hover:text-brass-gold transition-colors">
              2
            </button>
            <button className="w-9 h-9 rounded-md border border-outline-variant/40 flex items-center justify-center text-xs font-bold text-outline hover:border-brass-gold hover:text-brass-gold transition-colors">
              3
            </button>
            <span className="text-xs text-outline px-1">...</span>
            <button className="w-9 h-9 rounded-md border border-outline-variant/40 flex items-center justify-center text-xs font-bold text-outline hover:border-brass-gold hover:text-brass-gold transition-colors">
              &gt;
            </button>
          </div>
        </div>

        {/* Sidebar Filters */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-paper-white dark:bg-slate-900 p-6 rounded-lg border border-outline-variant/40 shadow-sm space-y-6">
            <h3 className="font-bold text-sm text-primary dark:text-white uppercase tracking-wide border-b border-outline-variant/30 pb-2">
              Filter Pencarian
            </h3>

            {/* Category Filter */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-brass-gold tracking-wider block">
                KATEGORI
              </span>
              <div className="space-y-2 text-xs text-on-surface-variant dark:text-gray-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-brass-gold focus:ring-brass-gold" />
                  Semua Kategori
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-brass-gold focus:ring-brass-gold" />
                  Tuntunan Islam
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-brass-gold focus:ring-brass-gold" />
                  Kajian Ulama
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-brass-gold focus:ring-brass-gold" />
                  Fatwa
                </label>
              </div>
            </div>

            {/* Format Filter Chips */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-brass-gold tracking-wider block">
                FORMAT
              </span>
              <div className="flex flex-wrap gap-2">
                {['Artikel', 'Video', 'Audio'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                      selectedFormat === fmt
                        ? 'bg-brass-gold text-deep-navy border-brass-gold'
                        : 'bg-news-gray dark:bg-slate-800 border-outline-variant/40 text-on-surface dark:text-gray-300 hover:border-brass-gold'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Paling Banyak Dibaca */}
          <div className="bg-paper-white dark:bg-slate-900 p-6 rounded-lg border border-outline-variant/40 shadow-sm space-y-4">
            <h3 className="font-headline font-bold text-base text-primary dark:text-white uppercase tracking-wide flex items-center gap-2 border-b border-outline-variant/30 pb-2">
              <span className="material-symbols-outlined text-brass-gold text-lg">trending_up</span> Paling Banyak Dibaca
            </h3>
            <div className="space-y-4">
              {popularArticles.map((pop: any, idx: number) => (
                <div key={pop.id || idx} className="flex items-start gap-3 group">
                  <span className="text-xs font-bold text-outline dark:text-gray-400">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-primary dark:text-white leading-snug group-hover:text-brass-gold transition-colors">
                      <Link href={`/artikel/${pop.slug}`}>{pop.title}</Link>
                    </h4>
                    <span className="text-[10px] text-brass-gold font-semibold mt-1 block">
                      {pop.category?.name || 'Kategori'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading search page...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
