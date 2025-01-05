'use client';
import ChatBox from '@/components/chat-box/ChatBox';
import MarkdownWrapper from '@/components/markdown-wrapper/MarkdownWrapper';
import { useEffect, useState } from 'react';
import styles from './Article.module.css';
import { Post } from '@/domain/posts/entities/Post';
import { getAIContent } from '@/lib/openai-service';

interface NewsAiContentProps {
  post: Post;
}

const NewsAiContent = ({ post }: NewsAiContentProps) => {
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = 'light'; //localStorage.getItem("theme") as 'dark' | 'light';
  useEffect(() => {
    const fetchAIContent = async () => {
      console.log('🔴 Fetching AI content');
      const { aiContent, questions } = await getAIContent(post);
      setAiContent(aiContent);
      setQuestions(questions);
      setLoading(false);
    };

    fetchAIContent();
  }, [post]);

  if (loading) {
    return <div>Loading AI content...</div>;
  }

  if (!aiContent) {
    return <div>No data to show...</div>;
  }

  return (
    <>
      <div className={styles.ArticleBody}>
        <MarkdownWrapper>{aiContent}</MarkdownWrapper>
      </div>
      <br />
      <ChatBox
        aiContent={aiContent}
        initialQuestions={questions}
        theme={theme}
      />
    </>
  );
};

export default NewsAiContent;
