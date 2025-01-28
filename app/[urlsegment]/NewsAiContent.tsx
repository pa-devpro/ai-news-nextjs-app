'use client';
import MarkdownWrapper from '@/components/markdown-wrapper/MarkdownWrapper';
import styles from './Article.module.css';
import { Post } from '@/features/news-posts/types/Post';
import { useAiContent } from '@/features/chatbot-ai/hooks/useAiContent';
import { Spinner } from '@/components/dashboard/ui/spinner';

interface NewsAiContentProps {
  post: Post;
}

const NewsAiContent: React.FC<NewsAiContentProps> = ({ post }) => {
  const { aiContent, loading } = useAiContent(post);

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
