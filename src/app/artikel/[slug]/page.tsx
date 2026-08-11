import React from 'react';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getPopularArticles, getKajianList } from '@/lib/api';
import ArticleReader from '@/components/ArticleReader';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams?.slug || '');
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan - Tauheed News',
    };
  }

  return {
    title: `${article.title} - Tauheed News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams?.slug || '');
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getArticles({
    category: article.category?.slug,
    limit: 3,
  });

  const popularArticles = await getPopularArticles();
  const upcomingKajian = await getKajianList();

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Article - full width on mobile */}
        <div className="lg:col-span-8">
          <ArticleReader
            article={article}
            relatedArticles={relatedArticles.filter((a: any) => a.id !== article.id)}
          />
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

