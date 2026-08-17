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

export const revalidate = 0;

export default async function HomePage() {
  const headlineArticle = await getHeadlineArticle();
  const fixedAdvice = await getFixedAdviceArticle();
  const popularArticles = await getPopularArticles();
  const upcomingKajian = await getKajianList();
  const mediaVideos = await getMediaList();

  const allArticles = await getArticles({ limit: 30 });
  const subHeadlines = allArticles
    .filter((a: any) => a.id !== headlineArticle?.id)
    .slice(0, 2);

  // 1. Saudi Arabia News
  const saudiArticles = await getArticles({ category: 'saudi-arabia-terkini', limit: 4 });

  // 2. Haramain News
  const haramainArticles = await getArticles({ category: 'haramain-news', limit: 4 });
  
  // 3. Islamic World
  const duniaIslamArticles = await getArticles({ category: 'dunia-islam', limit: 6 });
  
  // 4. Al-Lajnah Ad-Da'imah Fiqh Fatwa
  const fatwaArticles = await getArticles({ category: 'fatwa-fikih', limit: 4 });
  
  // 5. Islamic Guidance
  const tuntunanIslamArticles = await getArticles({ category: 'tuntunan-islam', limit: 4 });
  
  // 7. Aqidah and Tauhid
  const aqidahArticles = await getArticles({ category: 'aqidah-tauhid', limit: 4 });
  
  // 8. Opinion (Opini Baik tentang Saudi)
  const opinionArticles = await getArticles({ category: 'opini', limit: 4 });

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-2 pb-6 md:py-8">
      {/* Hero Bento Section */}
      <HeroSection
        headlineArticle={headlineArticle}
        subHeadlines={subHeadlines}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4 md:space-y-10">
          {/* 1. Saudi Arabia News */}
          <CategorySection
            title="Saudi Arabia News"
            slug="saudi-arabia-terkini"
            articles={saudiArticles.length > 0 ? saudiArticles : allArticles.slice(0, 4)}
          />

          {/* 2. Islamic World */}
          <DuniaIslamSection articles={duniaIslamArticles} />

          {/* 3. Haramain News (Berita Haramain & Haji/Umrah) */}
          <CategorySection
            title="Haramain News"
            slug="haramain-news"
            articles={haramainArticles}
          />

          {/* 3. Al Laznah Ad Da'imah Fiqh Fatwa */}
          <CategorySection
            title="Al-Lajnah Ad-Da'imah Fiqh Fatwa"
            slug="fatwa-fikih"
            articles={fatwaArticles}
          />

          {/* 4. Pearl of Wisdom */}
          <HikmahSection />

          {/* 5. Islamic Guidance */}
          <CategorySection
            title="Islamic Guidance"
            slug="tuntunan-islam"
            articles={tuntunanIslamArticles}
          />

          {/* 6. Sunnah Lectures And Videos (Saudi Scholars Only) */}
          <KajianVideoSection videos={mediaVideos} />

          {/* 7. Aqidah and Tauhid */}
          <CategorySection
            title="Aqidah and Tauhid"
            slug="aqidah-tauhid"
            articles={aqidahArticles}
          />

          {/* 8. Opinion (Opini Baik tentang Saudi) */}
          <CategorySection
            title="Opinion"
            slug="opini"
            articles={opinionArticles}
          />

          {/* 9. Kotak hijau terakhir yang diulas adalah Landasan Tauhid */}
          <div className="pt-2">
            <FixedAdviceSection article={fixedAdvice} />
          </div>
        </div>

        {/* Sidebar - hidden on mobile */}
        <div className="hidden lg:block lg:col-span-4">
          <Sidebar
            popularArticles={popularArticles}
            upcomingKajian={upcomingKajian}
          />
        </div>
      </div>
    </div>
  );
}
