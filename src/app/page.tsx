'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { compareDesc } from 'date-fns';
import { usePosts } from '@/features/news-posts/context/NewsContext';
import { Spinner } from '@/components/dashboard/ui/spinner';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';

const ArticlePreview = React.lazy(
  () => import('@/components/article-preview/ArticlePreview'),
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { articles } = usePosts();

  useEffect(() => {
    if (articles.length > 0) {
      setLoading(false);
    }
  }, [articles]);

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <Spinner />
      </div>
    );
  }

  const news = articles.sort((a, b) =>
    compareDesc(new Date(a.date!), new Date(b.date!)),
  );

  const articlesPreviews = news.map(
    (article: ArticleToDisplay, idx: number) => (
      <Suspense key={idx}>
        <ArticlePreview {...article} />
      </Suspense>
    ),
  );

  return (
    <div>
      <main className="ListPosts">{articlesPreviews}</main>
    </div>
  );
}
