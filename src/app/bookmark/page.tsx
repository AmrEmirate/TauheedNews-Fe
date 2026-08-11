'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateIndonesian } from '@/lib/date-utils';

interface ArticleData {
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

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<ArticleData[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tauheed_bookmarks');
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const removeBookmark = (slug: string) => {
    const updated = bookmarks.filter((item) => item.slug !== slug);
    setBookmarks(updated);
    localStorage.setItem('tauheed_bookmarks', JSON.stringify(updated));
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
      <div className="bg-deep-navy text-white p-8 rounded-lg mb-8 border-b-4 border-brass-gold shadow-md">
        <h1 className="font-headline font-bold text-3xl text-white uppercase tracking-wide flex items-center gap-2">
          <span className="material-symbols-outlined text-brass-gold text-3xl">bookmark</span> Artikel Tersimpan
        </h1>
        <p className="text-sm text-gray-300 mt-2">
          Daftar bacaan artikel favorit yang Anda simpan di memori browser lokal.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-16 bg-news-gray dark:bg-slate-900 rounded-lg space-y-3">
          <span className="material-symbols-outlined text-5xl text-outline">bookmark_border</span>
          <h3 className="font-bold text-lg text-primary dark:text-white">Belum Ada Artikel Tersimpan</h3>
          <p className="text-xs text-on-surface-variant dark:text-gray-400">
            Klik tombol &quot;Simpan&quot; saat membaca artikel untuk menambahkannya ke halaman ini.
          </p>
          <Link
            href="/"
            className="inline-block bg-brass-gold hover:bg-yellow-600 text-deep-navy font-bold px-4 py-2 rounded text-xs transition-colors mt-2"
          >
            Jelajahi Beranda
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((art) => (
            <div
              key={art.slug}
              className="bg-paper-white dark:bg-slate-900 border border-outline-variant/40 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="aspect-video relative overflow-hidden bg-news-gray">
                {art.coverImage && (
                  <Image
                    src={art.coverImage}
                    alt={art.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4 space-y-2 flex-grow">
                <span className="text-[10px] font-bold text-brass-gold uppercase tracking-wider">
                  {art.category?.name || 'Artikel'}
                </span>
                <h3 className="font-headline font-bold text-base text-primary dark:text-white leading-snug line-clamp-2">
                  <Link href={`/artikel/${art.slug}`}>{art.title}</Link>
                </h3>
                <p className="text-xs text-on-surface-variant dark:text-gray-300 line-clamp-2">
                  {art.excerpt}
                </p>
              </div>

              <div className="p-4 pt-0 flex justify-between items-center text-xs">
                <span className="text-outline text-[11px]">
                  {art.createdAt ? formatDateIndonesian(art.createdAt) : ''}
                </span>
                <button
                  onClick={() => removeBookmark(art.slug)}
                  className="text-red-600 hover:text-red-800 text-[11px] font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
