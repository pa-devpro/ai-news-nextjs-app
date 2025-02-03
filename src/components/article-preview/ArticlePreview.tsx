'use client';
import React from 'react';
import styles from './ArticlePreview.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';

function ArticlePreview(article: ArticleToDisplay) {
  const router = useRouter();

  return (
    <div
      style={{ textDecoration: 'inherit', color: 'inherit' }}
      onClick={(event) => {
        event.stopPropagation();
        router.push(`/${article.urlsegment}`);
      }}
      className={styles.PostPreviewContainer}
    >
      <div className={styles.ImageWrapper}>
        <Image
          className={styles.Image}
          src={article.featured_image || '/images/placeholder.jpg'}
          alt=""
          fill
          sizes="100%"
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.ArticleTextInfo}>
        <div className={styles.Topics}>
          {article.topics.map((topic) => (
            <div
              onClick={(event) => {
                event.stopPropagation();
                router.push(`topic/${topic}`);
              }}
              style={{ textDecoration: 'inherit' }}
              className={styles.Topic}
              key={topic}
            >
              {topic}
            </div>
          ))}
        </div>
        <div className={styles.Title}>{article.title}</div>
        <time className={styles.Date} dateTime={article.date!}>
          {format(parseISO(article.date!), 'LLLL d, yyyy')}
        </time>
      </div>
    </div>
  );
}

export default ArticlePreview;
