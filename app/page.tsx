'use client';
import React from 'react';
import { Suspense } from 'react';
import { compareDesc } from 'date-fns';
import { usePosts } from '@/context/NewsContext';
import { Post } from '@/domain/posts/entities/Post';
import { BASE_URL } from '@/actions/auth';

const PostPreview = React.lazy(
  () => import('@/components/post-preview/PostPreview'),
);

export default function Home() {
  const data = usePosts();

  const news = data.posts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const newsPreviews = news.map((post: Post, idx: number) => (
    <Suspense key={idx} fallback={<div>Loading...</div>}>
      <PostPreview {...post} />
    </Suspense>
  ));

  return (
    <div>
      <h1>Base URL: {BASE_URL}</h1>
      <main className="ListPosts">{newsPreviews}</main>;
    </div>
  );
}
