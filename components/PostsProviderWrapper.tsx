import React from 'react';
import { PostsProvider } from '@/context/NewsContext';
import { PostsModule } from '@/domain/posts/PostsModule';
import { samplePosts } from '@/news_sample/sample-posts';
import logger from '@/lib/logger';

const postsModule = PostsModule.create();

export default async function PostsProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const posts = await postsModule.getAllPosts();
    if (!posts) {
      throw new Error('Failed to fetch posts');
    }
    return (
      <PostsProvider posts={[...posts, ...samplePosts]}>
        {children}
      </PostsProvider>
    );
  } catch (error) {
    logger.error('Error while fetching posts', error);
    return <PostsProvider posts={samplePosts}>{children}</PostsProvider>;
  }
}
