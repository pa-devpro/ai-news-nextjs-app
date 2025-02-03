'use client';
import MarkdownWrapper from '@/components/markdown-wrapper/MarkdownWrapper';
import styles from './Article.module.css';
import { useAiContent } from '@/features/chatbot-ai/hooks/useAiContent';
import { Spinner } from '@/components/dashboard/ui/spinner';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';

interface NewsAiContentProps {
  article: ArticleToDisplay;
}

const NewsAiContent: React.FC<NewsAiContentProps> = ({ article }) => {
  const { aiContent, loading } = useAiContent(article);

  if (!aiContent || loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.ArticleBody}>
      <MarkdownWrapper>{aiContent}</MarkdownWrapper>
    </div>
  );
};

export default NewsAiContent;
