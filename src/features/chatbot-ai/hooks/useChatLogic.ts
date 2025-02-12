import { useState, useEffect, useRef } from 'react';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';
import { useAiContent } from './useAiContent';
import { askQuestionToArticle } from '../services/openai-service';
import { useUserProfile } from '@/features/auth/utils/auth-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '@/components/dashboard/ui/notifications';
import updateSavedArticle from '@/features/news-posts/api/update-saved-articles';
import saveArticle from '@/features/news-posts/api/save-articles';
import logger from '@/utils/logger';

interface Message {
  text: string;
  isUser: boolean;
}

type SaveArticleResponse = string | { success: boolean; message: string };

export const useChatLogic = (article: ArticleToDisplay) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const chatboxRef = useRef<HTMLDivElement>(null);
  const {
    aiContent,
    questions,
    loading: loadingContent,
  } = useAiContent(article);
  const { data: userProfile } = useUserProfile();
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const actionSave = article.id
    ? { action: updateSavedArticle, name: 'Update Article' }
    : { action: saveArticle, name: 'Save Article' };

  const mutation = useMutation<
    SaveArticleResponse,
    Error,
    Omit<ArticleToDisplay, 'created_at'>
  >({
    mutationFn: actionSave.action,
  });

  const addMessage = (message: string, isUser: boolean) => {
    setMessages((prev) => [...prev, { text: message, isUser }]);
  };

  const respondToUser = async (userMessage: string) => {
    const responseFromAi = await askQuestionToArticle(aiContent, userMessage);
    addMessage(responseFromAi.toString(), false);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      addMessage(inputValue, true);
      setInputValue('');
      await respondToUser(inputValue);
    }
  };

  const handleSaveArticle = (article: ArticleToDisplay) => {
    // Create a Map of existing Q&As using question as key
    const existingQAMap = new Map(
      article.questions_and_answers?.map((qa) => [qa.question, qa]) || [],
    );

    // Process new Q&As by pairing questions with answers
    const formatNewQuestionsAndAnswers = messages.reduce<
      Array<{ question: string; answer: string }>
    >((acc, message, index) => {
      if (
        message.isUser &&
        index + 1 < messages.length &&
        !messages[index + 1].isUser
      ) {
        acc.push({
          question: message.text,
          answer: messages[index + 1].text,
        });
      }
      return acc;
    }, []);

    // Update existing QA map with new QAs
    formatNewQuestionsAndAnswers.forEach((qa) => {
      existingQAMap.set(qa.question, qa);
    });

    const { created_at, ...restArticle } = article;

    // Prepare article data
    const articleToSave: Omit<ArticleToDisplay, 'created_at'> = {
      ...restArticle,
      user_id: userProfile?.id,
      generated_ai_content: aiContent,
      questions_and_answers: Array.from(existingQAMap.values()),
      subtitle: article.subtitle || '',
      title:
        article.title.length > 255
          ? article.title.substring(0, 255)
          : article.title,
    };

    // Use mutation without try-catch as the mutation handles errors
    mutation.mutate(articleToSave, {
      onSuccess: (data) => {
        logger.info('Article saved:', data, created_at);
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        addNotification({
          type: 'success',
          title: 'Saved Conversation',
        });
      },
      onError: (error) => {
        logger.error('Error saving article:', error);
        addNotification({
          type: 'error',
          title: 'Failed to Save Conversation',
        });
      },
    });
  };

  // Initialize chat with welcome message and questions
  useEffect(() => {
    if (!loadingContent && questions.length > 0) {
      const welcomeMessage = {
        text:
          `I've analyzed this article and can help you understand it better.\n` +
          `Here are some suggested questions to get started:\n` +
          questions
            .slice(0, 3)
            .map((q) => `- "${q}"`)
            .join('\n'),
        isUser: false,
      };
      setMessages([welcomeMessage]);
    }
  }, [article.title, questions, loadingContent]);

  // Load existing Q&As
  useEffect(() => {
    if (
      article.questions_and_answers &&
      article.questions_and_answers.length > 0
    ) {
      const existingMessages = article.questions_and_answers.flatMap((qa) => [
        { text: qa.question, isUser: true },
        { text: qa.answer, isUser: false },
      ]);

      setMessages((currentMessages) => {
        const welcomeMessage =
          currentMessages.length > 0 && !currentMessages[0].isUser
            ? [currentMessages[0]]
            : [];
        return [...welcomeMessage, ...existingMessages];
      });
    }
  }, [article.questions_and_answers]);

  return {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleSaveArticle,
    chatboxRef,
    aiContent,
    questions,
    loadingContent,
  };
};
