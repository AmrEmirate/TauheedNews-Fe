import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getHeadlineArticle,
  getFixedAdviceArticle,
  getArticles,
  getPopularArticles,
  getKajianList,
  getMediaList,
} from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import FixedAdviceSection from '@/components/FixedAdviceSection';
import CategorySection from '@/components/CategorySection';
import HikmahSection from '@/components/HikmahSection';
import DuniaIslamSection from '@/components/DuniaIslamSection';
import KajianVideoSection from '@/components/KajianVideoSection';
import Sidebar from '@/components/Sidebar';
import { formatDateIndonesian } from '@/lib/date-utils';

export const revalidate = 0;

export default async function HomePage() {
  const headlineArticle = await getHeadlineArticle();
  const fixedAdvice = await getFixedAdviceArticle();
  const popularArticles = await getPopularArticles();
  const upcomingKajian = await getKajianList();
  const mediaVideos = await getMediaList();

  const allArticles = await getArticles({ limit: 20 });
  const subHeadlines = allArticles
    .filter((a: any) => a.id !== headlineArticle?.id)
    .slice(0, 2);

  const tuntunanIslamArticles = await getArticles({ category: 'tuntunan-islam', limit: 4 });
  const aqidahArticles = await getArticles({ category: 'aqidah-tauhid', limit: 4 });
  const fatwaArticles = await getArticles({ category: 'fatwa-fikih', limit: 4 });
  const duniaIslamArticles = await getArticles({ category: 'dunia-islam', limit: 6 });
  const latestArticles = allArticles.slice(0, 6);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4 md:py-8">
      {/* Hero Bento Section */}
      <HeroSection
        headlineArticle={headlineArticle}
        subHeadlines={subHeadlines}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-2 md:space-y-10">
          {/* Tuntunan Islam - horizontal scroll on mobile */}
          <CategorySection
            title="Tuntunan Islam"
            slug="tuntunan-islam"
            articles={tuntunanIslamArticles}
          />

          {/* Hikmah Masyayikh - Quote Section */}
          <HikmahSection />

          {/* Dunia Islam - with sub-tabs */}
          <DuniaIslamSection articles={duniaIslamArticles} />

          {/* Kajian Video Section */}
          <KajianVideoSection videos={mediaVideos} />

          {/* Fixed Advice Section - hidden on mobile, shown below sidebar area */}
          <div className="hidden md:block">
            <FixedAdviceSection article={fixedAdvice} />
          </div>

          <CategorySection
            title="Aqidah & Tauhid"
            slug="aqidah-tauhid"
            articles={aqidahArticles}
          />

          <CategorySection
            title="Fatwa & Fikih"
            slug="fatwa-fikih"
            articles={fatwaArticles}
          />

          {/* Berita & Artikel Terbaru - hidden on mobile for cleaner view */}
          <section className="hidden md:block pt-6 border-t-2 border-brass-gold">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline font-bold text-2xl text-primary dark:text-white uppercase border-l-4 border-brass-gold pl-3">
                Berita & Artikel Terbaru
              </h2>
            </div>

            <div className="space-y-6">
              {latestArticles.map((art: any) => (
                <article
                  key={art.id}
                  className="flex flex-col sm:flex-row gap-5 p-4 rounded-lg bg-paper-white dark:bg-slate-900 border border-outline-variant/40 hover:border-brass-gold/60 transition-all shadow-sm group"
                >
                  <div className="sm:w-1/3 aspect-video sm:h-36 relative overflow-hidden rounded-md bg-news-gray flex-shrink-0">
                    {art.coverImage && (
                      <Image
                        src={art.coverImage}
                        alt={art.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="sm:w-2/3 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-brass-gold uppercase tracking-wider">
                        {art.category?.name}
                      </span>
                      <h3 className="font-headline font-bold text-lg text-primary dark:text-white group-hover:text-brass-gold transition-colors line-clamp-2 mt-1">
                        <Link href={`/artikel/${art.slug}`}>{art.title}</Link>
                      </h3>
                      <p className="text-xs text-on-surface-variant dark:text-gray-300 line-clamp-2 mt-1">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-outline dark:text-gray-400 pt-2 border-t border-outline-variant/20">
                      <span>{formatDateIndonesian(art.createdAt)}</span>
                      <span className="font-semibold text-brass-gold">
                        {art.author?.name}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar - hidden on mobile */}
        <div className="hidden lg:block lg:col-span-4">
          <Sidebar
            popularArticles={popularArticles}
            upcomingKajian={upcomingKajian}
          />
        </div>
      </div>

      {/* Mobile-only: Fixed Advice Section at bottom */}
      <div className="md:hidden mt-6">
        <FixedAdviceSection article={fixedAdvice} />
      </div>
    </div>
  );
}

