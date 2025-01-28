import { Post } from '@/features/news-posts/types/Post';
import logger from '@/utils/logger';
import { getAIContent } from '@/lib/openai-service';
import { useState, useEffect } from 'react';

export const useAiContent = (post: Post) => {
  const [aiContent, setAiContent] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAIContent = async () => {
      logger.info('🔴 Fetching AI content');
      const { aiContent, questions } = await getAIContent(post);
      setAiContent(aiContent);
      setQuestions(questions);
      setLoading(false);
    };

    fetchAIContent();
  }, [post]);

  return { aiContent, questions, loading };
};
