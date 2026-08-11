'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { searchArticles } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: {
    name: string;
  };
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchArticles(query);
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-paper-white dark:bg-deep-navy w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-brass-gold/30">
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 border-b border-outline-variant/30">
          <span className="material-symbols-outlined text-brass-gold mr-3 rtl:mr-0 rtl:ml-3">search</span>
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-grow bg-transparent border-none outline-none text-on-surface dark:text-white placeholder:text-outline text-lg"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-news-gray dark:hover:bg-slate-800 rounded-full transition-colors text-outline"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {loading && (
            <div className="py-8 text-center text-outline flex items-center justify-center gap-2">
              <span className="material-symbols-outlined animate-spin text-brass-gold">sync</span>
              Mencari...
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div className="text-center py-8 space-y-3">
              <p className="text-on-surface-variant">
                {t('noResults')} (&quot;<span className="text-brass-gold">{query}</span>&quot;)
              </p>
              <button
                onClick={handleSubmit}
                className="text-xs font-bold bg-brass-gold hover:bg-yellow-600 text-deep-navy px-4 py-2 rounded transition-colors"
              >
                {t('searchResults')}
              </button>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-3">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/artikel/${item.slug}`}
                  onClick={onClose}
                  className="block p-3 rounded-md hover:bg-news-gray dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-brass-gold/30"
                >
                  <span className="text-xs uppercase font-semibold text-brass-gold tracking-wider">
                    {item.category?.name}
                  </span>
                  <h4 className="font-bold text-on-surface dark:text-white text-base mt-1 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant line-clamp-2 mt-1">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
              <div className="pt-2 text-center">
                <button
                  onClick={handleSubmit}
                  className="text-xs font-bold text-brass-gold hover:underline"
                >
                  {t('searchResults')} (&quot;{query}&quot;) &rarr;
                </button>
              </div>
            </div>
          )}

          {!query.trim() && (
            <div className="py-6 text-center text-sm text-on-surface-variant">
              {t('searchPlaceholder')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
