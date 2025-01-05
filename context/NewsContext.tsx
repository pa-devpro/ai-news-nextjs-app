'use client';
import { Post } from '@/domain/posts/entities/Post';
import React, { createContext, useContext, ReactNode } from 'react';

interface NewsContextType {
  posts: Post[];
}

const PostsContext = createContext<NewsContextType | undefined>(undefined);

export const PostsProvider = ({
  children,
  posts,
}: {
  children: ReactNode;
  posts: Post[];
}) => {
  return (
    <PostsContext.Provider value={{ posts }}>{children}</PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a NewsProvider');
  }
  return context;
};
