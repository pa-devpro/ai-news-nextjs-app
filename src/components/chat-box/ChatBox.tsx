'use client';
import React, { useEffect } from 'react';
import styles from './Chatbox.module.css';
import SuggestQuestionsBox from './SuggestQuestionsBox';
import { MessageList } from './MessageList';
import useChatBox from '../../features/chatbot-ai/hooks/useChatBox';
import { useAiContent } from '@/features/chatbot-ai/hooks/useAiContent';
import { handleSend } from '@/features/chatbot-ai/utils/chatUtils';
import { useMutation } from '@tanstack/react-query';
import saveArticle from '@/features/news-posts/api/save-articles';
import { useUserProfile } from '@/features/auth/utils/auth-utils';
import {
  ArticleToDisplay,
  QuestionAndAnswer,
} from '@/features/news-posts/types/ArticlesToDisplay';
import logger from '@/utils/logger';

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

  const mutation = useMutation<ArticleToDisplay, Error, ArticleToDisplay>({
    mutationFn: saveArticle,
  });

  const handleSaveArticle = (article: ArticleToDisplay) => {
    const formatNewQuestionsAndAnswers = [...messages].map(
      (question, index) => ({
        question,
        answer: responses[index],
      }),
    );

    const articleToSave = {
      ...article,
      user_id: userProfile?.id,
      generated_ai_content: aiContent,
      questions_and_answers: [
        ...article.questions_and_answers,
        ...formatNewQuestionsAndAnswers,
      ],
    };

    mutation.mutate(articleToSave, {
      onSuccess: (data) => {
        logger.info('Article saved:', data);
      },
      onError: (error) => {
        logger.error('Error saving article:', error);
      },
    });
  };

  if (loadingContent || isLoadingProfile) {
    return <div>Loading ChatBox...</div>;
  }

  const DisplayQuestionsAnswers = () => {
    if (article.questions_and_answers.length === 0) {
      return <MessageList messages={messages} responses={responses} />;
    }

    const questionsAndAnswers: QuestionAndAnswer[] =
      article.questions_and_answers;
    const allQuestions = questionsAndAnswers.map((item) => item.question);
    const allAnswers = questionsAndAnswers.map((item) => item.answer);

    return (
      <MessageList
        messages={[...allQuestions, ...messages]}
        responses={[...allAnswers, ...responses]}
      />
    );
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.openButton}>
        {isOpen ? 'Hide Chat' : 'Open Chat'}
      </button>
      <button
        onClick={() => handleSaveArticle(article)}
        className={styles.openButton}
      >
        Save Article
      </button>
      {isOpen && (
        <div className={`${styles.chatboxContainer} ${styles.light}`}>
          <h1 className={styles.title}>Chat with the AI</h1>
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
        </div>
      )}
    </>
  );
};

export default ChatBox;
