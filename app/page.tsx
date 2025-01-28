'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { compareDesc } from 'date-fns';
import { usePosts } from '@/context/NewsContext';
import { Post } from '@/domain/posts/entities/Post';
import { Spinner } from '@/components/dashboard/ui/spinner';

const PostPreview = React.lazy(
  () => import('@/components/post-preview/PostPreview'),
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const data = usePosts();

  useEffect(() => {
    if (data.posts.length > 0) {
      setLoading(false);
    }
  }, [data.posts]);

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <Spinner />
      </div>
    );
  }

  const news = data.posts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const newsPreviews = news.map((post: Post, idx: number) => (
    <Suspense key={idx}>
      <PostPreview {...post} />
    </Suspense>
  ));

  return (
    <div>
      <main className="ListPosts">{newsPreviews}</main>
    </div>
  );
}
