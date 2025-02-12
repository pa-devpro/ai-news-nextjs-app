import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';
import React, { useState } from 'react';
import MarkdownWrapper from '../markdown-wrapper/MarkdownWrapper';
import styles from './ChatBox.module.css';
import { useChatLogic } from '@/features/chatbot-ai/hooks/useChatLogic';

type ChatBoxProps = {
  article: ArticleToDisplay;
};

const ChatBox2: React.FC<ChatBoxProps> = ({ article }) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Get chat logic from hook
  const {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleSaveArticle,
    chatboxRef,
  } = useChatLogic(article);

  // Keep: Desktop-specific UI handlers
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleChatbox = () => setIsChatboxOpen(!isChatboxOpen);

  // Keep: Question click handler for suggested questions
  const handleQuestionClick = async (text: string) => {
    const question = text.match(/"([^"]+)"/)
      ? text.match(/"([^"]+)"/)![1]
      : text;
    setInputValue(question);
    await handleSendMessage();
  };

  return (
    <div className={styles.chatboxContainer}>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChatbox}
        className={`${styles.chatButton} ${
          isChatboxOpen ? styles.chatButtonHidden : styles.chatButtonVisible
        }`}
        aria-label="Open chat"
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
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z"
          />
        </svg>
        <span>Chat with Admin Bot</span>
      </button>

      {/* Chat Container with Expand Functionality */}
      <div
        className={`fixed transition-all duration-300 ease-in-out ${
          isExpanded ? 'bottom-20 right-4 w-2/3' : 'bottom-16 right-4 w-96'
        } ${!isChatboxOpen ? 'hidden' : ''} ${styles.chatbox}`}
        style={{
          height: isExpanded ? 'calc(80vh - 6rem)' : '500px',
          maxHeight: isExpanded ? 'calc(100vh - 8rem)' : '500px',
        }}
      >
        <div className="bg-white shadow-md rounded-lg w-full h-full flex flex-col">
          {/* Header with Expand Controls */}
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center flex-shrink-0">
            <p className="text-lg font-semibold">Admin Bot</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSaveArticle(article)}
                className={`${styles.dialogIconButton} ${
                  isExpanded ? styles.expandedButton : ''
                } flex items-center gap-2 hover:bg-blue-600 transition-colors`}
                title="Save Conversation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
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
                {isExpanded && <span>Save Conversation</span>}
              </button>
              <button
                onClick={toggleExpand}
                className="text-gray-300 hover:text-gray-400"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isExpanded ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  )}
                </svg>
              </button>
              <button
                onClick={toggleChatbox}
                className="text-gray-300 hover:text-gray-400"
                title="Close"
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
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div
            ref={chatboxRef}
            className={`flex-grow overflow-y-auto p-4 ${styles.messagesContainer}`}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.isUser ? 'text-right' : ''}`}
              >
                <div
                  className={`${
                    message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  } rounded-lg py-2 px-4 inline-block max-w-[85%]`}
                >
                  <div
                    className={`${message.isUser ? '' : styles['markdown-content']}`}
                    onClick={(e) => {
                      if (!message.isUser) {
                        const target = e.target as HTMLElement;
                        const listItem = target.closest('li');
                        if (listItem) {
                          const questionMatch =
                            listItem.textContent?.match(/"([^"]+)"/);
                          if (questionMatch) {
                            handleQuestionClick(questionMatch[1]);
                          }
                        }
                      }
                    }}
                  >
                    <MarkdownWrapper>{message.text}</MarkdownWrapper>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Container */}
          <div
            className={`p-4 border-t bg-white rounded-b-lg flex-shrink-0 ${styles.inputContainer}`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message"
              className={styles.input}
            />
            <button onClick={handleSendMessage} className={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox2;
