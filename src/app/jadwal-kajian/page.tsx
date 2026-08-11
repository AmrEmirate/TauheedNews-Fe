import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getKajianList } from '@/lib/api';

export const revalidate = 0;

export default async function KajianSchedulePage() {

  const kajianList = await getKajianList();
  const featuredKajian = kajianList.length > 0 ? kajianList[0] : null;
  const otherKajian = kajianList.length > 1 ? kajianList.slice(1) : [];

  const filterTabs = ['Semua Kajian', 'Hari Ini', 'Minggu Ini', 'Online / Streaming'];

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* Header section matching blueprint */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-primary dark:text-white tracking-tight">
          Jadwal Kajian Lengkap
        </h1>
        <p className="text-xs md:text-sm text-on-surface-variant dark:text-gray-300">
          Temukan jadwal majelis ilmu, kajian rutin harian dan mingguan dari para asatidzah.
        </p>
        <p className="font-arabic text-2xl text-brass-gold pt-2">
          طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
        </p>
      </div>

      {/* Filter Tabs matching blueprint */}
      <div className="flex justify-center items-center gap-2 flex-wrap">
        {filterTabs.map((tab, idx) => (
          <button
            key={tab}
            className={`text-xs font-bold px-5 py-2 rounded-md border transition-colors ${
              idx === 0
                ? 'bg-deep-navy text-white border-deep-navy dark:bg-brass-gold dark:text-deep-navy dark:border-brass-gold'
                : 'bg-white dark:bg-slate-800 text-on-surface dark:text-gray-200 border-outline-variant/40 hover:border-brass-gold'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Content matching blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Featured Card (8 Cols) */}
        <div className="lg:col-span-8">
          {featuredKajian ? (
            <div className="bg-paper-white dark:bg-slate-900 border border-outline-variant/40 rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 relative aspect-video md:aspect-auto overflow-hidden bg-news-gray">
                <Image
                  src={featuredKajian.image || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&q=80'}
                  alt={featuredKajian.title}
                  fill
                  className="object-cover"
                  priority
                />
                <span className="absolute top-3 left-3 bg-brass-gold text-deep-navy font-bold text-[10px] px-2.5 py-1 rounded uppercase tracking-wider">
                  Hari Ini
                </span>
              </div>
              <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant dark:text-gray-400 font-medium">
                    <span className="material-symbols-outlined text-[16px] text-brass-gold">schedule</span>
                    <span>Ba&apos;da Maghrib - Selesai</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-primary dark:text-white leading-snug">
                    {featuredKajian.title}
                  </h3>
                  <p className="text-xs text-brass-gold font-semibold">
                    {featuredKajian.speaker}
                  </p>
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant dark:text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {featuredKajian.location}
                  </span>
                  <button className="text-brass-gold font-bold hover:underline flex items-center gap-1">
                    Detail &rarr;
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-news-gray rounded-lg">Belum ada jadwal kajian.</div>
          )}
        </div>

        {/* Right Rutin Pekanan Card (4 Cols) */}
        <div className="lg:col-span-4">
          {otherKajian.length > 0 ? (
            <div className="bg-paper-white dark:bg-slate-900 border border-outline-variant/40 rounded-lg p-6 shadow-sm h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="bg-news-gray dark:bg-slate-800 text-on-surface dark:text-gray-300 font-bold text-[10px] px-2.5 py-1 rounded uppercase">
                    Rutin Pekanan
                  </span>
                  <span className="material-symbols-outlined text-brass-gold">smart_display</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-primary dark:text-white leading-snug">
                  {otherKajian[0].title}
                </h3>
                <p className="text-xs text-brass-gold font-semibold">
                  {otherKajian[0].speaker}
                </p>
              </div>

              <div className="space-y-2 text-xs text-on-surface-variant dark:text-gray-300 border-t border-outline-variant/30 pt-3">
                <p className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span> {otherKajian[0].dateTime || 'Setiap Pekan'}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> {otherKajian[0].time || 'Waktu Menyesuaikan'}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">videocam</span> Live via YouTube
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-news-gray rounded-lg h-full flex items-center justify-center">Belum ada kajian rutin.</div>
          )}
        </div>
      </div>

      {/* Row 2: Bottom Cards matching blueprint */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {otherKajian.slice(1).map((kajian: any, idx: number) => (
          <div key={kajian.id || idx} className="bg-paper-white dark:bg-slate-900 border border-outline-variant/40 rounded-lg p-5 shadow-sm space-y-3">
            <span className="text-[10px] font-bold text-outline uppercase">{kajian.dateTime || 'Segera'}</span>
            <h4 className="font-headline font-bold text-base text-primary dark:text-white">
              {kajian.title}
            </h4>
            <p className="text-xs text-brass-gold font-medium">{kajian.speaker}</p>
            <div className="text-xs text-outline space-y-1 pt-2 border-t border-outline-variant/20">
              <p>{kajian.time || 'Waktu Menyesuaikan'}</p>
              <p>{kajian.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Muat Lebih Banyak Button matching blueprint */}
      <div className="text-center pt-4">
        <button className="px-8 py-3 rounded-md border border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-news-gray text-xs font-bold text-primary dark:text-white transition-colors tracking-wider uppercase shadow-sm">
          MUAT LEBIH BANYAK
        </button>
      </div>
    </div>
  );
}

