'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { ArticleToDisplay } from '../types/ArticlesToDisplay';

interface NewsContextType {
  articles: ArticleToDisplay[];
}

const PostsContext = createContext<NewsContextType | undefined>(undefined);

export const PostsProvider = ({
  children,
  articles,
}: {
  children: ReactNode;
  articles: ArticleToDisplay[];
}) => {
  return (
    <PostsContext.Provider value={{ articles }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a NewsProvider');
  }
  return context;
};
