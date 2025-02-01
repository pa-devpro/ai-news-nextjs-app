'use client';
import Image from 'next/image';
import styles from './Article.module.css';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { usePosts } from '@/features/news-posts/context/NewsContext';
import { useParams, useSearchParams } from 'next/navigation';
import MarkdownWrapper from '@/components/markdown-wrapper/MarkdownWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Spinner } from '@/components/dashboard/ui/spinner';
import { useArticles } from '@/features/news-posts/api/get-articles';

const NewsAiContent = dynamic(() => import('./NewsAiContent'));
const ChatBox = dynamic(() => import('@/components/chat-box/ChatBox'));

const PostPage = () => {
  const { articles } = usePosts();
  const { urlsegment } = useParams();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const { data: articlesSaved, isLoading } = useArticles(userId);

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const articlesList = articlesSaved
    ? [...articlesSaved, ...articles]
    : articles;

  const articleSelected = articlesList.find(
    (article) => article.urlsegment === urlsegment,
  );

  if (!articleSelected) {
    return (
      <div className={styles.ErrorMessage}>
        <h1>Page not found</h1>
        <p>
          Let&apos;s go to the <Link href="/">homepage</Link> instead.
        </p>
      </div>
    );
  }

  const DisplayAiContent = () => {
    if (!articleSelected.generated_ai_content) {
      return <NewsAiContent article={articleSelected} />;
    } else {
      return (
        <div className={styles.ArticleBody}>
          <MarkdownWrapper>
            {String(articleSelected.generated_ai_content)}
          </MarkdownWrapper>
        </div>
      );
    }
  };

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
    <div className={styles.Article}>
      <div className={styles.ArticleTopics}>{topicLinks}</div>
      <h1 className={styles.ArticleTitle}>{articleSelected.title}</h1>

      <div className={styles.ArticleSubtitle}>{articleSelected.subtitle}</div>

      <div className={styles.ImageWrapper}>
        <Image
          src={articleSelected.featured_image || '/images/placeholder.jpg'}
          alt={articleSelected.title}
          width={400}
          height={200}
        />
        {articleSelected.author} /{' '}
        <time dateTime={articleSelected.date!}>
          {format(parseISO(articleSelected.date!), 'LLLL d, yyyy')}
        </time>
      </div>

      <div className={styles.ArticleBody}>
        {!articleSelected.generated_ai_content && (
          <MarkdownWrapper>
            {String(articleSelected.body_raw || '')}
          </MarkdownWrapper>
        )}
      </div>
      <Suspense fallback={<Spinner />}>
        <ProtectedRoute>
          <DisplayAiContent />
          <ChatBox article={articleSelected} />
        </ProtectedRoute>
      </Suspense>
    </div>
  );
};

export default PostPage;
