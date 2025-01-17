'use client';
import MarkdownWrapper from '@/components/markdown-wrapper/MarkdownWrapper';
import styles from './Article.module.css';
import { Post } from '@/domain/posts/entities/Post';
import { useAiContent } from '@/hooks/useAiContent';

interface NewsAiContentProps {
  post: Post;
}

const NewsAiContent: React.FC<NewsAiContentProps> = ({ post }) => {
  const { aiContent, loading } = useAiContent(post);

  if (!aiContent || loading) {
    return <div>Loading AI content...</div>;
  }

  return (
    <div className={styles.ArticleBody}>
      <MarkdownWrapper>{aiContent}</MarkdownWrapper>
    </div>
  );
};

export default NewsAiContent;
