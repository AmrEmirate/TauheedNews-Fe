import React from 'react';
import Image from 'next/image';
import { getMediaList } from '@/lib/api';

export const revalidate = 0;

export default async function MultimediaPage() {
  const mediaList = await getMediaList();
  const heroVideo = mediaList.length > 0 ? mediaList[0] : null;
  const gridVideos = mediaList.length > 1 ? mediaList.slice(1) : [];

  const filterTabs = ['Semua Video', 'Tafsir', 'Akidah', 'Fikih', 'Sirah Nabawiyah'];

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* Header section matching blueprint */}
      <div className="space-y-1">
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-primary dark:text-white tracking-tight">
          Galeri Kajian
        </h1>
      </div>

      {/* Filter Tabs matching blueprint */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-outline-variant/30">
        {filterTabs.map((tab, idx) => (
          <button
            key={tab}
            className={`text-xs font-bold px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
              idx === 0
                ? 'bg-deep-navy text-white border-deep-navy dark:bg-brass-gold dark:text-deep-navy dark:border-brass-gold'
                : 'bg-white dark:bg-slate-800 text-on-surface dark:text-gray-200 border-outline-variant/40 hover:border-brass-gold'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Featured Video Hero Card matching blueprint */}
      {heroVideo && (
        <div className="relative h-[420px] rounded-lg overflow-hidden group shadow-md border border-outline-variant/40">
          <Image
            src={heroVideo.thumbnail || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1200&q=80'}
            alt={heroVideo.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/60 to-transparent"></div>

          {/* Centered Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-brass-gold/90 text-deep-navy flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">play_arrow</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 p-6 text-white w-full space-y-2">
            <span className="bg-brass-gold text-deep-navy font-bold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider inline-block">
              Kajian Utama
            </span>
            <h2 className="font-headline font-bold text-2xl md:text-3xl leading-snug">
              Memahami Esensi Tauhid Rububiyah dalam Kehidupan Modern
            </h2>
            <div className="flex items-center gap-4 text-xs text-gray-300">
              <span>Ustadz Dr. Abdullah Zaen, Lc., MA</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span> 45:20
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3-Column Video Grid matching blueprint */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gridVideos.length > 0 ? (
          gridVideos.map((item: any) => (
            <div
              key={item.id}
              className="bg-paper-white dark:bg-slate-900 border border-outline-variant/40 rounded-lg overflow-hidden shadow-sm hover:border-brass-gold transition-all group flex flex-col justify-between"
            >
              <div className="aspect-video relative overflow-hidden bg-black">
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform opacity-80 group-hover:opacity-100"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-brass-gold/90 text-deep-navy flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">play_arrow</span>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.duration || '24:15'}
                </span>
              </div>

              <div className="p-4 space-y-2 flex-grow">
                <span className="text-[10px] font-bold text-brass-gold uppercase tracking-wider">
                  {item.category || 'TAFSIR'}
                </span>
                <h3 className="font-headline font-bold text-base text-primary dark:text-white leading-snug group-hover:text-brass-gold transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-on-surface-variant dark:text-gray-400">
                  {item.speaker}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-outline">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">videocam_off</span>
            <p>Belum ada video kajian yang tersedia.</p>
          </div>
        )}
      </div>

      {/* Muat Lebih Banyak Button matching blueprint */}
      <div className="text-center pt-4">
        <button className="px-8 py-3 rounded-md border border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-news-gray text-xs font-bold text-primary dark:text-white transition-colors tracking-wider uppercase shadow-sm">
          Muat Lebih Banyak
        </button>
      </div>
    </div>
  );
}

