'use client';
import React, { useEffect } from 'react';
import styles from './Chatbox.module.css';
import SuggestQuestionsBox from './SuggestQuestionsBox';
import { MessageList } from './MessageList';
import useChatBox from '../../features/chatbot-ai/hooks/useChatBox';
import { useAiContent } from '@/features/chatbot-ai/hooks/useAiContent';
import { handleSend } from '@/features/chatbot-ai/utils/chatUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import saveArticle from '@/features/news-posts/api/save-articles';
import { useUserProfile } from '@/features/auth/utils/auth-utils';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';
import logger from '@/utils/logger';
import updateSavedArticle from '@/features/news-posts/api/update-saved-articles';
import { useNotifications } from '../dashboard/ui/notifications';

type ChatBoxProps = {
  article: ArticleToDisplay;
};

const ChatBox: React.FC<ChatBoxProps> = ({ article }) => {
  const {
    aiContent,
    questions,
    loading: loadingContent,
  } = useAiContent(article);
  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile();
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const {
    message,
    setMessage,
    messages,
    setMessages,
    responses,
    setResponses,
    isOpen,
    setIsOpen,
    suggestedQuestions,
    setSuggestedQuestions,
    handleQuestionClick,
    alertMessage,
    setAlertMessage,
  } = useChatBox({ aiContent, initialQuestions: questions });

  useEffect(() => {
    setSuggestedQuestions(questions);
  }, [questions, setSuggestedQuestions]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend(
        message,
        aiContent,
        setMessages,
        setResponses,
        setAlertMessage,
      );
    }
  };

  const actionSave = article.id
    ? {
        action: updateSavedArticle,
        name: 'Update Article',
      }
    : {
        action: saveArticle,
        name: 'Save Article',
      };

  type SaveArticleResponse = string | { success: boolean; message: string };
  const mutation = useMutation<
    SaveArticleResponse,
    Error,
    Omit<ArticleToDisplay, 'created_at'>
  >({
    mutationFn: actionSave.action,
  });

  const handleSaveArticle = (article: ArticleToDisplay) => {
    // Create a Map of existing Q&As using question as key
    const existingQAMap = new Map(
      article.questions_and_answers.map((qa) => [qa.question, qa]),
    );

    // Process new Q&As
    const formatNewQuestionsAndAnswers = messages.map((question, index) => ({
      question,
      answer: responses[index],
    }));

    // Merge existing and new Q&As, newer answers override older ones
    formatNewQuestionsAndAnswers.forEach((qa) => {
      existingQAMap.set(qa.question, qa);
    });

    const { created_at, ...restArticle } = article;
    const articleToSave: Omit<ArticleToDisplay, 'created_at'> = {
      ...restArticle,
      user_id: userProfile?.id,
      generated_ai_content: aiContent,
      questions_and_answers: Array.from(existingQAMap.values()),
    };

    mutation.mutate(articleToSave, {
      onSuccess: (data) => {
        logger.info('Article saved:', data, created_at);
        queryClient.invalidateQueries({ queryKey: ['articles'] });

        addNotification({
          type: 'success',
          title: 'Saved Article',
        });
      },
      onError: (error) => {
        logger.error('Error saving article:', error);
        addNotification({
          type: 'error',
          title: 'Failed to Save Article',
        });
      },
    });
  };

  if (loadingContent || isLoadingProfile) {
    return <div>Loading ChatBox...</div>;
  }
  const DisplayQuestionsAnswers = () => {
    // If there are no saved Q&As, just show current session messages
    if (article.questions_and_answers.length === 0) {
      return <MessageList messages={messages} responses={responses} />;
    }

    // Get unique messages by creating a Set of questions
    const uniqueMessages = new Set([
      ...article.questions_and_answers.map((qa) => qa.question),
      ...messages,
    ]);

    // Create arrays for display keeping the order
    const displayMessages: string[] = [];
    const displayResponses: string[] = [];

    // First add saved Q&As
    article.questions_and_answers.forEach((qa) => {
      if (uniqueMessages.has(qa.question)) {
        displayMessages.push(qa.question);
        displayResponses.push(qa.answer);
        uniqueMessages.delete(qa.question); // Remove to avoid duplication
      }
    });

    // Then add new messages from current session
    messages.forEach((msg, index) => {
      if (uniqueMessages.has(msg)) {
        displayMessages.push(msg);
        displayResponses.push(responses[index]);
      }
    });

    return (
      <MessageList messages={displayMessages} responses={displayResponses} />
    );
  };

  return (
    <>
      <div className={`${styles.chatboxContainer} ${styles.light}`}>
        <div className={styles.HeaderButtons}>
          <h1 className={styles.title}>Chat with the AI</h1>
          <div className={styles.dialogActions}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.dialogIconButton}
            >
              {isOpen ? 'Hide Chat' : 'Open Chat'}
            </button>
            <button
              onClick={() => handleSaveArticle(article)}
              className={styles.dialogIconButton}
            >
              {actionSave.name}
            </button>
          </div>
        </div>
        {isOpen && (
          <>
            <SuggestQuestionsBox
              questions={suggestedQuestions}
              onQuestionClick={handleQuestionClick}
            />
            <div className={styles.messagesContainer}>
              <DisplayQuestionsAnswers />
            </div>
            {alertMessage && (
              <div className={styles.alertBox}>{alertMessage}</div>
            )}

            <div className={styles.inputContainer}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
                placeholder="Type your message..."
              />
              <button
                onClick={() =>
                  handleSend(
                    message,
                    aiContent,
                    setMessages,
                    setResponses,
                    setAlertMessage,
                  )
                }
                className={styles.sendButton}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatBox;
