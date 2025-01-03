'use client'
import React from 'react';
import { Suspense } from 'react';
import { compareDesc } from 'date-fns';
import { usePosts } from '@/context/NewsContext';

const PostPreview = React.lazy(() => import('@/components/post-preview/PostPreview'));

export default function Home() {
  const data = usePosts();
  
  const news = data.posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const newsPreviews = news.map((post: any, idx: any) => (
    <Suspense key={idx} fallback={<div>Loading...</div>}>
      <PostPreview {...post} />
    </Suspense>
  ));

  return (
      <main className="ListPosts">{newsPreviews}</main>
  );
}
