//// filepath: /home/me/Documents/1-programming/ai-news-nextjs-app/src/components/chat-box/ChatboxMobile.tsx
import React, { useState } from 'react';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';
import MarkdownWrapper from '../markdown-wrapper/MarkdownWrapper';
import styles from './ChatBoxMobile.module.css';
import { useChatLogic } from '@/features/chatbot-ai/hooks/useChatLogic';

type ChatBoxProps = {
  article: ArticleToDisplay;
};

const ChatboxMobile: React.FC<ChatBoxProps> = ({ article }) => {
  const {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleSaveArticle,
    chatboxRef,
  } = useChatLogic(article);

  const [isOpen, setIsOpen] = useState(false);
  const toggleChatbox = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      {!isOpen && (
        <button onClick={toggleChatbox} className={styles.toggleButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z"
            />
          </svg>
        </button>
      )}

      <div
        className={`${styles.chatDrawer} ${isOpen ? styles.open : ''}`}
        style={{ display: isOpen ? 'flex' : 'flex' }}
      >
        <div className={styles.header}>
          <p>Admin Bot</p>
          <div className={styles.headerControls}>
            <button
              onClick={() => handleSaveArticle(article)}
              className={styles.headerIcon}
              title="Save Conversation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
            </button>
            <button
              onClick={toggleChatbox}
              className={styles.headerIcon}
              title="Close Chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div ref={chatboxRef} className={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${message.isUser ? styles.user : styles.bot}`}
            >
              <div className={styles.messageContent}>
                <MarkdownWrapper>{message.text}</MarkdownWrapper>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Type a message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.input}
            onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatboxMobile;
