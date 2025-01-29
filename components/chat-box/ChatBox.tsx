'use client';
import React, { useEffect } from 'react';
import styles from './Chatbox.module.css';
import SuggestQuestionsBox from './SuggestQuestionsBox';
import { MessageList } from './MessageList';
import useChatBox from '../../features/chatbot-ai/hooks/useChatBox';
import { useAiContent } from '@/features/chatbot-ai/hooks/useAiContent';
import { Post } from '@/features/news-posts/types/Post';
import { handleSend } from '@/features/chatbot-ai/utils/chatUtils';

type ChatBoxProps = {
  post: Post;
};

const ChatBox: React.FC<ChatBoxProps> = ({ post }) => {
  const { aiContent, questions, loading } = useAiContent(post);

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

  if (loading) {
    return <div>Loading ChatBox...</div>;
  }

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.openButton}>
        {isOpen ? 'Hide Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className={`${styles.chatboxContainer} ${styles.light}`}>
          <h1 className={styles.title}>Chat with the AI</h1>
          <div className={styles.questionsContainer}>
            <SuggestQuestionsBox
              questions={suggestedQuestions}
              onQuestionClick={handleQuestionClick}
            />
          </div>
          <div className={styles.messagesContainer}>
            <MessageList messages={messages} responses={responses} />
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
