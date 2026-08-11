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
import LatestArticlesSection from '@/components/LatestArticlesSection';
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
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-2 pb-6 md:py-8">
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
          <LatestArticlesSection articles={latestArticles} />
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

