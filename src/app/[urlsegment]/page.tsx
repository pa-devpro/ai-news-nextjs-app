'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { useParams } from 'next/navigation';
import { Spinner } from '@/components/dashboard/ui/spinner';
import MarkdownWrapper from '@/components/markdown-wrapper/MarkdownWrapper';
import { useArticles } from '@/features/news-posts/api/get-articles';
import styles from './Article.module.css';
import { usePosts } from '@/features/news-posts/context/NewsContext';
import NewsAiContent from './NewsAiContent';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';
import ChatBox2 from '@/components/chat-box/ChatBox2';

interface ArticleTopicsProps {
  topics: string[];
}

const ArticleTopics = ({ topics }: ArticleTopicsProps) => {
  return (
    <div className={styles.ArticleTopics}>
      {topics?.map((category: string) => (
        <Link
          href={`topic/${category}`}
          key={category}
          className={styles.ArticleTopic}
          style={{ textDecoration: 'inherit' }}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

type ArticleHeaderProps = Pick<ArticleToDisplay, 'title' | 'subtitle'> & {
  showSubtitle: boolean;
};

const ArticleHeader = ({
  title,
  subtitle,
  showSubtitle,
}: ArticleHeaderProps) => {
  return (
    <>
      <h1 className={styles.ArticleTitle}>{title}</h1>
      {showSubtitle && <div className={styles.ArticleSubtitle}>{subtitle}</div>}
    </>
  );
};

const ArticleContent = ({
  article,
  isArticleVisible,
}: {
  article: ArticleToDisplay;
  isArticleVisible: boolean;
}) => {
  return (
    isArticleVisible && (
      <>
        <div className={styles.ImageWrapper}>
          <Image
            src={article.featured_image || '/images/placeholder.jpg'}
            alt={article.title}
            width={400}
            height={200}
          />
          <div className={styles.ArticleMeta}>
            <span>{article.author}</span>{' '}
            <time dateTime={article.date!}>
              {format(parseISO(article.date!), 'LLLL d, yyyy')}
            </time>
          </div>
        </div>
        <div className={styles.ArticleBody}>
          {article.generated_ai_content ? (
            <MarkdownWrapper>
              {article.generated_ai_content || String(article.body_raw || '')}
            </MarkdownWrapper>
          ) : (
            <NewsAiContent article={article} />
          )}
        </div>
      </>
    )
  );
};

const Page = () => {
  // Assuming urlsegment defines the article (for a dynamic route)
  const { urlsegment } = useParams();

  // Fetch articles for this user
  const dataFromApi = usePosts();
  const { data: articlesFromUser, isLoading } = useArticles();
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

  return (
    <div className={styles.ArticlePage}>
      <div className={styles.ArticleContainer}>
        <div className={styles.Article}>
          <ArticleTopics topics={articleSelected.topics} />
          <ArticleHeader
            title={articleSelected.title}
            subtitle={articleSelected.subtitle}
            showSubtitle={showSubtitle}
          />
          <div className={styles.ToggleArticle}>
            <button
              onClick={() => setIsArticleVisible((prev) => !prev)}
              className={styles.button}
            >
              {isArticleVisible ? 'Hide Article' : 'Show Article'}
            </button>
          </div>
          <ArticleContent
            article={articleSelected}
            isArticleVisible={isArticleVisible}
          />
        </div>
      </div>

      <div className={styles.ChatboxContainer}>
        <React.Suspense fallback={<Spinner size="lg" />}>
          <ProtectedRoute>
            <ChatBox2 article={articleSelected} />
          </ProtectedRoute>
        </React.Suspense>
      </div>
    </div>
  );
};

export default Page;
