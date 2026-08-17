'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import AutoTranslate from './AutoTranslate';

const QUOTES = [
  {
    quote: 'Tauhid adalah hak Allah yang paling agung atas hamba-Nya.',
    author: "Syaikh 'Abdul 'Aziz bin Baz",
    title: 'Rahimahullah',
    photo: '/masyayikh/binbaz.png',
  },
  {
    quote: 'Barangsiapa memurnikan tauhidnya, niscaya Allah akan melapangkan dadanya dan menenangkan jiwanya.',
    author: "Syaikh Muhammad bin Salih Al-'Utsaimin",
    title: 'Rahimahullah',
    photo: '/masyayikh/utsaimin.png',
  },
  {
    quote: 'Istiqamah di atas sunnah adalah kemuliaan tertinggi yang dikejar oleh setiap mukmin.',
    author: 'Syaikh Salih bin Fauzan Al-Fauzan',
    title: 'Hafizhahullah',
    photo: '/masyayikh/fauzan.png',
  },
];

export default function HikmahSection() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const slideWidth = container.offsetWidth;
      container.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth',
      });
    }
    setActiveIdx(index);
  }, []);

  const nextSlide = useCallback(() => {
    const next = (activeIdx + 1) % QUOTES.length;
    goToSlide(next);
  }, [activeIdx, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (activeIdx - 1 + QUOTES.length) % QUOTES.length;
    goToSlide(prev);
  }, [activeIdx, goToSlide]);

  // Auto-advance timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide]);

  // Handle scroll events to sync active dot indicator with touch swipes
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const slideWidth = container.offsetWidth;
      if (slideWidth > 0) {
        const newIndex = Math.round(container.scrollLeft / slideWidth);
        if (newIndex !== activeIdx && newIndex >= 0 && newIndex < QUOTES.length) {
          setActiveIdx(newIndex);
        }
      }
    }
  };

  return (
    <section className="my-8 relative group">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-headline font-bold text-xl text-primary dark:text-white uppercase border-l-4 rtl:border-l-0 rtl:border-r-4 border-brass-gold pl-3 rtl:pl-0 rtl:pr-3 tracking-wide">
          {t('hikmah')}
        </h2>
        <Link
          href="/kategori/ulama-warisan-ilmu"
          className="text-xs font-bold text-secondary dark:text-brass-gold hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider"
        >
          {t('readMore')} <span className="material-symbols-outlined text-[14px] rtl:rotate-180">arrow_forward</span>
        </Link>
      </div>

      {/* Swipeable Carousel Container */}
      <div className="relative overflow-hidden rounded-xl">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scrollbar-hide mobile-carousel snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {QUOTES.map((item, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0 snap-start"
              style={{ minWidth: '100%' }}
            >
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 md:p-6 shadow-sm relative overflow-hidden flex flex-row items-center gap-4 md:gap-6 min-h-[170px]">
                {/* Sheikh Photo Left */}
                <div className="w-24 h-28 sm:w-32 sm:h-36 relative rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant/40 shadow-sm bg-gray-100">
                  <Image
                    src={item.photo}
                    alt={item.author}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Quote Content Right */}
                <div className="flex-1 min-w-0 relative">
                  <span className="text-brass-gold text-4xl sm:text-5xl font-serif leading-none block -mb-2 select-none">&ldquo;</span>
                  <p className="text-primary dark:text-white font-headline text-base sm:text-lg italic leading-relaxed mb-3">
                    <AutoTranslate text={item.quote} />
                  </p>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-primary dark:text-white">
                      <AutoTranslate text={item.author} />
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
                      <AutoTranslate text={item.title} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrow Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 rtl:left-auto rtl:right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label={t('prevSlide')}
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label={t('nextSlide')}
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center items-center gap-2 mt-3">
        {QUOTES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === activeIdx
                ? 'bg-deep-green dark:bg-brass-gold w-6'
                : 'bg-gray-300 dark:bg-gray-700 w-2 hover:bg-gray-400'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
