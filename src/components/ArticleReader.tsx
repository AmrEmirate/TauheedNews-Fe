'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDateIndonesian } from '@/lib/date-utils';
import { calculateReadingTime } from '@/lib/reading-time';
import { useLanguage } from '@/context/LanguageContext';
import { translateCategory } from '@/lib/i18n';
import AutoTranslate from './AutoTranslate';

interface ArticleData {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string | null;
  createdAt: Date | string;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
  };
}

interface ArticleReaderProps {
  article: ArticleData;
  relatedArticles: ArticleData[];
}

export default function ArticleReader({ article, relatedArticles }: ArticleReaderProps) {
  const { language, t, translateDynamic } = useLanguage();
  const [fontSize, setFontSize] = useState<number>(18);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [copyNotification, setCopyNotification] = useState<boolean>(false);

  // Auto translation states
  const [translatedTitle, setTranslatedTitle] = useState<string>(article.title);
  const [translatedContent, setTranslatedContent] = useState<string>(article.content);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [showOriginalText, setShowOriginalText] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tauheed_bookmarks');
      if (saved) {
        const bookmarks: ArticleData[] = JSON.parse(saved);
        setIsBookmarked(bookmarks.some((item) => item.slug === article.slug));
      }
    } catch (e) {
      console.error(e);
    }
  }, [article.slug]);

  // Translate article title and content whenever language changes
  useEffect(() => {
    let isMounted = true;
    if (language === 'id') {
      setTranslatedTitle(article.title);
      setTranslatedContent(article.content);
      setIsTranslating(false);
      return;
    }

    setIsTranslating(true);

    // Try to fetch pre-translated article from backend first
    import('@/lib/api').then(({ getArticleBySlug }) => {
      getArticleBySlug(article.slug, language)
        .then((data) => {
          if (isMounted && data?._isTranslated) {
            setTranslatedTitle(data.title);
            setTranslatedContent(data.content);
            setIsTranslating(false);
          } else {
            throw new Error('No backend translation available');
          }
        })
        .catch(() => {
          // Fallback: translate via translateDynamic (Google GTX)
          if (!isMounted) return;
          Promise.all([
            translateDynamic(article.title),
            translateDynamic(article.content),
          ]).then(([titleRes, contentRes]) => {
            if (isMounted) {
              setTranslatedTitle(titleRes);
              setTranslatedContent(contentRes);
              setIsTranslating(false);
            }
          }).catch(() => {
            if (isMounted) setIsTranslating(false);
          });
        });
    });


    return () => {
      isMounted = false;
    };
  }, [language, article.title, article.content, article.slug, translateDynamic]);

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem('tauheed_bookmarks');
      let bookmarks: ArticleData[] = saved ? JSON.parse(saved) : [];
      if (isBookmarked) {
        bookmarks = bookmarks.filter((item) => item.slug !== article.slug);
        setIsBookmarked(false);
      } else {
        bookmarks.push(article);
        setIsBookmarked(true);
      }
      localStorage.setItem('tauheed_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareToWA = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + shareUrl)}`, '_blank');
  };

  const shareToTG = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`, '_blank');
  };

  const shareToX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToFB = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 2000);
    }
  };

  const defaultTags = ['Arab Saudi', 'Sunnah', 'Tauhid', 'Dakwah'];

  const displayTitle = showOriginalText || language === 'id' ? article.title : translatedTitle;
  const displayContent = showOriginalText || language === 'id' ? article.content : translatedContent;

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-1.5 bg-news-gray z-50">
        <div
          className="h-full bg-brass-gold transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Breadcrumbs - Mobile & Desktop */}
      <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant dark:text-gray-400 mb-4 flex-wrap">
        <Link href="/" className="hover:text-brass-gold transition-colors">{t('navHome')}</Link>
        <span className="material-symbols-outlined text-[12px] rtl:rotate-180">chevron_right</span>
        <Link href={`/kategori/${article.category?.slug}`} className="hover:text-brass-gold transition-colors">
          {translateCategory(article.category, language)}
        </Link>
      </nav>

      {/* Font size controls & Translation Banner - DESKTOP ONLY */}
      <div className="hidden md:flex bg-news-gray dark:bg-slate-900 border-y border-outline-variant/30 py-2.5 px-4 mb-6 flex-wrap justify-between items-center text-xs font-semibold gap-3">
        <div className="flex items-center gap-3">
          <span className="text-on-surface-variant dark:text-gray-400">{t('textSize')}</span>
          <button
            onClick={() => setFontSize((prev) => Math.max(14, prev - 2))}
            className="w-8 h-8 rounded bg-white dark:bg-slate-800 border border-outline-variant hover:border-brass-gold flex items-center justify-center font-bold text-sm shadow-sm"
            title="Kecilkan Font"
          >
            A-
          </button>
          <span className="text-brass-gold font-bold">{fontSize}px</span>
          <button
            onClick={() => setFontSize((prev) => Math.min(26, prev + 2))}
            className="w-8 h-8 rounded bg-white dark:bg-slate-800 border border-outline-variant hover:border-brass-gold flex items-center justify-center font-bold text-sm shadow-sm"
            title="Besarkan Font"
          >
            A+
          </button>
        </div>

        {language !== 'id' && (
          <div className="flex items-center gap-2 bg-brass-gold/15 text-brass-gold px-3 py-1.5 rounded-lg border border-brass-gold/30">
            <span className="material-symbols-outlined text-sm">translate</span>
            <span className="text-[11px] font-bold">{t('autoTranslated')}</span>
            <button
              onClick={() => setShowOriginalText(!showOriginalText)}
              className="ml-2 text-[10px] underline font-bold hover:text-white transition-colors"
            >
              {showOriginalText ? t('showTranslated') : t('showOriginal')}
            </button>
          </div>
        )}

        <div className="flex items-center gap-3">
          <span className="bg-brass-gold/20 text-brass-gold font-bold px-2.5 py-1 rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {calculateReadingTime(article.content, language)}
          </span>
          <button
            onClick={toggleBookmark}
            className={`px-3 py-1 rounded font-bold transition-colors flex items-center gap-1 border ${
              isBookmarked
                ? 'bg-brass-gold text-deep-navy border-brass-gold'
                : 'bg-white dark:bg-slate-800 border-outline-variant hover:border-brass-gold text-on-surface dark:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
            {isBookmarked ? t('saved') : t('save')}
          </button>
        </div>
      </div>

      <article className="space-y-6">
        {/* Article title & meta */}
        <div>
          <h1 className="font-headline font-bold text-2xl sm:text-4xl text-primary dark:text-white leading-tight">
            {isTranslating ? (
              <span className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 inline-block">
                {article.title}
              </span>
            ) : (
              displayTitle
            )}
          </h1>

          <div className="flex items-center gap-3 md:gap-4 text-xs text-on-surface-variant dark:text-gray-400 mt-4 pb-4 border-b border-outline-variant/30 flex-wrap">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-brass-gold">calendar_month</span>
              {formatDateIndonesian(article.createdAt, language)}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-brass-gold">person</span>
              {t('byAuthor')} <AutoTranslate text={article.author?.name || ''} />
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-brass-gold">schedule</span>
              {calculateReadingTime(article.content, language)}
            </span>
          </div>
        </div>

        {/* Cover image */}
        {article.coverImage && (
          <div className="relative w-full h-[240px] sm:h-[450px] rounded-lg overflow-hidden border border-outline-variant/40 shadow-md">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Share buttons */}
        <div className="flex items-center justify-between py-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-gray-500">{t('share')}:</span>
            <button
              onClick={shareToWA}
              className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-sm"
              title="WhatsApp"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
            <button
              onClick={shareToTG}
              className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors shadow-sm"
              title="Telegram"
            >
              <span className="material-symbols-outlined text-[18px]">near_me</span>
            </button>
            <button
              onClick={shareToFB}
              className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm"
              title="Facebook"
            >
              <span className="material-symbols-outlined text-[18px]">thumb_up</span>
            </button>
            <button
              onClick={shareToX}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-black text-white flex items-center justify-center transition-colors shadow-sm"
              title="X / Twitter"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <button
              onClick={copyLink}
              className="w-9 h-9 rounded-full bg-news-gray dark:bg-slate-800 border border-outline-variant hover:border-brass-gold text-primary dark:text-white flex items-center justify-center transition-colors"
              title="Copy Link"
            >
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
            </button>
            {copyNotification && (
              <span className="text-xs font-bold text-emerald-600 animate-pulse ml-1">
                {t('linkCopied')}
              </span>
            )}
          </div>

          <button
            onClick={toggleBookmark}
            className="text-on-surface-variant hover:text-brass-gold p-1"
            title={t('save')}
          >
            <span className="material-symbols-outlined text-xl">
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
        </div>

        {/* Article content */}
        <div
          className={`prose dark:prose-invert max-w-none text-on-surface dark:text-gray-200 leading-relaxed font-body ${
            language === 'ar' ? 'font-arabic text-right leading-loose' : ''
          }`}
          style={{ fontSize: `${fontSize}px` }}
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />

        {/* TAGAR / TAGS Section */}
        <div className="pt-6 border-t border-outline-variant/30 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-outline dark:text-gray-400">
            {t('tags')}
          </span>
          <div className="flex flex-wrap gap-2">
            {defaultTags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="text-xs font-medium px-3 py-1.5 bg-news-gray dark:bg-slate-800 text-on-surface dark:text-gray-200 rounded-full border border-outline-variant/40 hover:border-brass-gold hover:text-brass-gold transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="pt-6 border-t border-outline-variant/30">
            <h3 className="font-headline font-bold text-lg md:text-xl text-primary dark:text-white uppercase mb-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-brass-gold pl-3 rtl:pl-0 rtl:pr-3">
              {t('relatedArticles')}
            </h3>
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {relatedArticles.map((rel) => (
                <div key={rel.id} className="group flex flex-col space-y-1.5">
                  <div className="aspect-video relative overflow-hidden rounded-md border border-outline-variant/40 bg-news-gray">
                    {rel.coverImage && (
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    )}
                  </div>
                  <h4 className="font-headline font-bold text-[11px] md:text-sm text-primary dark:text-white group-hover:text-brass-gold transition-colors line-clamp-2 leading-tight">
                    <Link href={`/artikel/${rel.slug}`}>
                      <AutoTranslate text={rel.title} />
                    </Link>
                  </h4>
                  <span className="text-[10px] text-outline dark:text-gray-400">
                    {formatDateIndonesian(rel.createdAt, language)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
