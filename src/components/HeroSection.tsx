'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateIndonesian } from '@/lib/date-utils';
import { useLanguage } from '@/context/LanguageContext';
import { translateCategory } from '@/lib/i18n';
import AutoTranslate from './AutoTranslate';

interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  createdAt: Date | string;
  category: {
    name: string;
  };
  author: {
    name: string;
  };
}

interface HeroSectionProps {
  headlineArticle: ArticleItem | null;
  subHeadlines: ArticleItem[];
}

export default function HeroSection({ headlineArticle, subHeadlines }: HeroSectionProps) {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Combine headline + sub headlines for mobile carousel
  const allSlides = headlineArticle ? [headlineArticle, ...subHeadlines] : [];

  const goToSlide = useCallback((index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const slideWidth = container.offsetWidth;
      container.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth',
      });
    }
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    if (allSlides.length === 0) return;
    const next = (currentSlide + 1) % allSlides.length;
    goToSlide(next);
  }, [currentSlide, allSlides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    if (allSlides.length === 0) return;
    const prev = (currentSlide - 1 + allSlides.length) % allSlides.length;
    goToSlide(prev);
  }, [currentSlide, allSlides.length, goToSlide]);

  // Auto-play timer
  useEffect(() => {
    if (allSlides.length === 0) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, allSlides.length]);

  if (!headlineArticle) return null;

  // Handle scroll for dot indicator sync
  const handleScroll = () => {
    if (scrollRef.current && allSlides.length > 0) {
      const container = scrollRef.current;
      const slideWidth = container.offsetWidth;
      const newIndex = Math.round(container.scrollLeft / slideWidth);
      if (newIndex !== currentSlide && newIndex >= 0 && newIndex < allSlides.length) {
        setCurrentSlide(newIndex);
      }
    }
  };

  return (
    <>
      {/* ===== MOBILE CAROUSEL ===== */}
      <section className="md:hidden -mx-4 mb-6 relative">
        {/* Carousel container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto mobile-carousel scrollbar-hide"
          onScroll={handleScroll}
        >
          {allSlides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="relative w-full flex-shrink-0"
              style={{ minWidth: '100%', height: '420px' }}
            >
              {slide.coverImage && (
                <Image
                  src={slide.coverImage}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-4 pb-12 text-white">
                <span className="bg-brass-gold text-deep-navy font-bold text-[10px] px-2 py-1 rounded uppercase tracking-wider inline-block mb-2">
                  {t('headline')}
                </span>
                <h2 className="font-headline font-bold text-xl leading-snug mb-2 line-clamp-3">
                  <Link href={`/artikel/${slide.slug}`}>
                    <AutoTranslate text={slide.title} />
                  </Link>
                </h2>
                <p className="text-xs text-gray-200 line-clamp-2 mb-3 leading-relaxed">
                  <AutoTranslate text={slide.excerpt} />
                </p>
                <div className="flex items-center gap-3 text-[11px] text-gray-300">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-brass-gold">calendar_month</span>
                    {formatDateIndonesian(slide.createdAt, language)}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-brass-gold">person</span>
                    {slide.author?.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 rtl:left-auto rtl:right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors z-10"
          aria-label={t('prevSlide')}
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors z-10"
          aria-label={t('nextSlide')}
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {allSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-5 h-2 bg-brass-gold'
                  : 'w-2 h-2 bg-white/50'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== DESKTOP BENTO GRID ===== */}
      <section className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        <article className="lg:col-span-7 relative h-[480px] rounded-lg overflow-hidden group border border-outline-variant/50 shadow-md">
          {headlineArticle.coverImage && (
            <Image
              src={headlineArticle.coverImage}
              alt={headlineArticle.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-3 text-white">
            <span className="bg-brass-gold text-deep-navy font-bold text-xs px-2.5 py-1 rounded uppercase self-start tracking-wider">
              {t('headline')}
            </span>
            <h2 className="font-headline font-bold text-2xl md:text-3xl leading-snug hover:text-brass-gold transition-colors">
              <Link href={`/artikel/${headlineArticle.slug}`}>
                <AutoTranslate text={headlineArticle.title} />
              </Link>
            </h2>
            <p className="text-sm text-gray-200 line-clamp-2 md:w-5/6 leading-relaxed">
              <AutoTranslate text={headlineArticle.excerpt} />
            </p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
              <div className="flex items-center gap-4 text-xs text-gray-300 font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-brass-gold">calendar_month</span>{' '}
                  {formatDateIndonesian(headlineArticle.createdAt, language)}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-brass-gold">person</span>{' '}
                  {headlineArticle.author?.name}
                </span>
              </div>
              <Link
                href={`/artikel/${headlineArticle.slug}`}
                className="bg-brass-gold hover:bg-yellow-600 text-deep-navy font-bold px-4 py-2 rounded text-xs transition-colors flex items-center gap-1.5 shadow uppercase"
              >
                {t('readMore')}{' '}
                <span className="material-symbols-outlined text-[14px] rtl:rotate-180">arrow_forward</span>
              </Link>
            </div>
          </div>
        </article>

        <div className="lg:col-span-5 flex flex-col gap-4">
          {subHeadlines.map((sub, idx) => (
            <article
              key={sub.id || idx}
              className="relative h-[232px] rounded-lg overflow-hidden group border border-outline-variant/50 shadow-sm"
            >
              {sub.coverImage && (
                <Image
                  src={sub.coverImage}
                  alt={sub.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                <span className="bg-primary/90 text-inverse-primary text-[11px] font-bold px-2 py-0.5 rounded uppercase mb-2 inline-block tracking-wider">
                  {translateCategory(sub.category, language)}
                </span>
                <h3 className="font-headline font-bold text-lg leading-snug line-clamp-2 hover:text-brass-gold transition-colors">
                  <Link href={`/artikel/${sub.slug}`}>
                    <AutoTranslate text={sub.title} />
                  </Link>
                </h3>
                <div className="mt-2 text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-brass-gold">calendar_month</span>{' '}
                  {formatDateIndonesian(sub.createdAt, language)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
