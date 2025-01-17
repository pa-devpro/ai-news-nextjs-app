import { Post } from '@/domain/posts/entities/Post';
import { getAIContent } from '@/lib/openai-service';
import { useState, useEffect } from 'react';

export const useAiContent = (post: Post) => {
  const [aiContent, setAiContent] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { aiContent, questions, loading };
};
