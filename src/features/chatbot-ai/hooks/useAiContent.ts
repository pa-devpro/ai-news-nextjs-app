import logger from '@/utils/logger';
import { useState, useEffect } from 'react';
import { generateAIContent } from '../services/openai-service';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';

export const useAiContent = (article: ArticleToDisplay) => {
  const [aiContent, setAiContent] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAIContent = async () => {
      logger.info('🔴 Fetching AI content');
      if (!article.generated_ai_content) {
        const { aiContent, questions } = await generateAIContent(article);
        setAiContent(aiContent);
        setQuestions(questions);
        setLoading(false);
      } else {
        setAiContent(article.generated_ai_content!);
        setLoading(false);
      }
    };

    getAIContent();
  }, [article]);

  return { aiContent, questions, loading };
};
