'use client';
import styles from './Topic.module.css';
import ArticlePreview from '@/components/article-preview/ArticlePreview';
import { Suspense } from 'react';
import { usePosts } from '@/features/news-posts/context/NewsContext';
import { useParams } from 'next/navigation';

export default function Topic() {
  const topicName = useParams().urlsegment as string;
  const { articles } = usePosts();

  const filteredPosts = articles.filter((article) => {
    const topicsInLowerCase = article.topics.toString().toLowerCase();
    return topicsInLowerCase.includes(topicName.toLowerCase());
  });

  return (
    <div className={styles.Topic}>
      <h1>Topic: {topicName}</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <div className="ListPosts">
          {filteredPosts.map((article, idx) => (
            <ArticlePreview key={idx} {...article} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
