'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { useParams, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Spinner } from '@/components/dashboard/ui/spinner';
import MarkdownWrapper from '@/components/markdown-wrapper/MarkdownWrapper';
import { useArticles } from '@/features/news-posts/api/get-articles';
import styles from './Article.module.css';
import { usePosts } from '@/features/news-posts/context/NewsContext';
import NewsAiContent from './NewsAiContent';
import ProtectedRoute from '@/components/ProtectedRoute';

// Dynamically load ChatBox so that it's always rendered regardless of article visibility
const ChatBox = dynamic(() => import('@/components/chat-box/ChatBox'), {});

const Page = () => {
  // Assuming urlsegment defines the article (for a dynamic route)
  const { urlsegment } = useParams();
  // Use search params to fetch the user id if needed
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';

  // Fetch articles for this user
  const dataFromApi = usePosts();
  const { data: articlesFromUser, isLoading } = useArticles(userId);
  // Select the article based on the urlsegment
  const aritclesList = [...(articlesFromUser || []), ...dataFromApi?.articles];

  const articleSelected = aritclesList?.find(
    (article) => article.urlsegment === urlsegment,
  );

  // Local state to toggle article visibility and subtitle
  const [isArticleVisible, setIsArticleVisible] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(true);

  // When content is loaded, hide the subtitle automatically
  useEffect(() => {
    if (
      articleSelected &&
      (articleSelected.body_raw || articleSelected.generated_ai_content)
    ) {
      setShowSubtitle(false);
    }
  }, [articleSelected]);

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!articleSelected) {
    return <div>Article not found</div>;
  }

  // Map topics to clickable links
  const topicLinks = articleSelected.topics?.map((category: string) => (
    <Link
      href={`topic/${category}`}
      key={category}
      className={styles.ArticleTopic}
      style={{ textDecoration: 'inherit' }}
    >
      {category}
    </Link>
  ));

  return (
    <div className={styles.ArticlePage}>
      {/* Button to toggle visibility of the article content */}
      <div className={styles.ToggleArticle}>
        <button onClick={() => setIsArticleVisible((prev) => !prev)}>
          {isArticleVisible ? 'Hide Article' : 'Show Article'}
        </button>
      </div>

      <div className={styles.Article}>
        <div className={styles.ArticleTopics}>{topicLinks}</div>
        <h1 className={styles.ArticleTitle}>{articleSelected.title}</h1>

        {showSubtitle && (
          <div className={styles.ArticleSubtitle}>
            {articleSelected.subtitle}
          </div>
        )}
        {isArticleVisible && (
          <>
            <div className={styles.ImageWrapper}>
              <Image
                src={
                  articleSelected.featured_image || '/images/placeholder.jpg'
                }
                alt={articleSelected.title}
                width={400}
                height={200}
              />
              <div className={styles.ArticleMeta}>
                <span>{articleSelected.author}</span>{' '}
                <time dateTime={articleSelected.date!}>
                  {format(parseISO(articleSelected.date!), 'LLLL d, yyyy')}
                </time>
              </div>
            </div>
            <div className={styles.ArticleBody}>
              {articleSelected.generated_ai_content ? (
                <MarkdownWrapper>
                  {articleSelected.generated_ai_content ||
                    String(articleSelected.body_raw || '')}
                </MarkdownWrapper>
              ) : (
                <NewsAiContent article={articleSelected} />
              )}
            </div>
          </>
        )}
      </div>

      {/* ChatBox is always visible */}
      <React.Suspense fallback={<Spinner size="lg" />}>
        <ProtectedRoute>
          <ChatBox article={articleSelected} />
        </ProtectedRoute>
      </React.Suspense>
    </div>
  );
};

export default Page;
