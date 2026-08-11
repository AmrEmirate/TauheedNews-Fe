'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import AutoTranslate from './AutoTranslate';

interface MediaItem {
  id: number;
  title: string;
  speaker: string;
  videoUrl: string;
  duration: string;
  category: string;
  thumbnail?: string | null;
}

interface KajianVideoSectionProps {
  videos: MediaItem[];
}

export default function KajianVideoSection({ videos }: KajianVideoSectionProps) {
  const { t } = useLanguage();
  const displayVideos = videos && videos.length > 0 ? videos : [
    {
      id: 1,
      title: 'Tauhid: Fondasi Agama',
      speaker: 'Ust. Firanda Andirja',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      duration: '45:12',
      category: 'Aqidah & Tauhid',
      thumbnail: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Tafsir Surah Al-Fatihah',
      speaker: 'Ust. Syafiq Riza Basalamah',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      duration: '52:18',
      category: 'Tafsir',
      thumbnail: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Kitab Riyadush Shalihin: Bab Ikhlas',
      speaker: 'Ust. Muhammad Nuzul Dzulqarnain',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      duration: '38:45',
      category: 'Kajian Kitab',
      thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-headline font-bold text-xl text-primary dark:text-white uppercase border-l-4 rtl:border-l-0 rtl:border-r-4 border-brass-gold pl-3 rtl:pl-0 rtl:pr-3 tracking-wide">
          {t('kajianVideo')}
        </h2>
        <Link
          href="/multimedia"
          className="text-xs font-bold text-secondary dark:text-brass-gold hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider"
        >
          {t('readMore')} <span className="material-symbols-outlined text-[14px] rtl:rotate-180">arrow_forward</span>
        </Link>
      </div>

      {/* Horizontal Scroll on Mobile / 3 Col Grid on Desktop */}
      <div className="category-scroll-mobile md:!grid md:grid-cols-3 md:gap-5">
        {displayVideos.map((video) => (
          <div key={video.id} className="flex flex-col group space-y-2">
            {/* Thumbnail with duration badge and play icon */}
            <div className="aspect-video relative overflow-hidden rounded-lg border border-outline-variant/40 bg-news-gray shadow-sm">
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-deep-navy/20 flex items-center justify-center">
                  <span className="text-brass-gold text-xs font-bold">Video</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-brass-gold/90 text-deep-navy flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl fill-current ml-0.5">play_arrow</span>
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                {video.duration}
              </span>
            </div>

            <h3 className="font-headline font-bold text-sm leading-snug group-hover:text-brass-gold transition-colors line-clamp-2 text-primary dark:text-white">
              <AutoTranslate text={video.title} />
            </h3>

            <p className="text-xs text-on-surface-variant dark:text-gray-400 font-medium">
              <AutoTranslate text={video.speaker} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
