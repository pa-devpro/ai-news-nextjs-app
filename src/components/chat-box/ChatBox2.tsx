import { useAiContent } from '@/features/chatbot-ai/hooks/useAiContent';
import { askQuestionToArticle } from '@/features/chatbot-ai/services/openai-service';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';
import React, { useState, useRef, useEffect } from 'react';
import MarkdownWrapper from '../markdown-wrapper/MarkdownWrapper';
import styles from './Chatbox2.module.css';
import logger from '@/utils/logger';
import { useUserProfile } from '@/features/auth/utils/auth-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '../dashboard/ui/notifications';
import updateSavedArticle from '@/features/news-posts/api/update-saved-articles';
import saveArticle from '@/features/news-posts/api/save-articles';

type ChatBoxProps = {
  article: ArticleToDisplay;
};

const ChatBox2: React.FC<ChatBoxProps> = ({ article }) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [inputValue, setInputValue] = useState('');
  const chatboxRef = useRef<HTMLDivElement>(null);
  const {
    aiContent,
    questions,
    loading: loadingContent,
  } = useAiContent(article);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const addMessage = (message: string, isUser: boolean) => {
    setMessages((prev) => [...prev, { text: message, isUser }]);
  };

  const respondToUser = async (userMessage: string) => {
    // Replace this with your chatbot logic

    const responseFromAi = await askQuestionToArticle(aiContent, userMessage);
    addMessage(responseFromAi.toString(), false);
  };

  const { data: userProfile } = useUserProfile();
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  // Add mutation logic
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

  useEffect(() => {
    if (
      article.questions_and_answers &&
      article.questions_and_answers.length > 0
    ) {
      // Convert existing Q&As to messages format
      const existingMessages = article.questions_and_answers.flatMap((qa) => [
        // Question (user message)
        { text: qa.question, isUser: true },
        // Answer (AI message)
        { text: qa.answer, isUser: false },
      ]);

      // Set messages after welcome message
      setMessages((currentMessages) => {
        // Keep welcome message if it exists (first message from AI)
        const welcomeMessage =
          currentMessages.length > 0 && !currentMessages[0].isUser
            ? [currentMessages[0]]
            : [];
        return [...welcomeMessage, ...existingMessages];
      });
    }
  }, [article.questions_and_answers]);

  const handleSaveArticle = (article: ArticleToDisplay) => {
    // Create a Map of existing Q&As using question as key
    const existingQAMap = new Map(
      article.questions_and_answers.map((qa) => [qa.question, qa]),
    );

    // Process new Q&As by pairing questions with answers
    const formatNewQuestionsAndAnswers = [];
    for (let i = 0; i < messages.length; i++) {
      if (
        messages[i].isUser &&
        i + 1 < messages.length &&
        !messages[i + 1].isUser
      ) {
        formatNewQuestionsAndAnswers.push({
          question: messages[i].text,
          answer: messages[i + 1].text,
        });
      }
    }
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
      onSuccess: (data: unknown) => {
        logger.info('Article saved:', data, created_at);
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        addNotification({
          type: 'success',
          title: 'Saved Conversation',
        });
      },
      onError: (error: unknown) => {
        logger.error('Error saving article:', error);
        addNotification({
          type: 'error',
          title: 'Failed to Save Conversation',
        });
      },
    });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      addMessage(inputValue, true);
      respondToUser(inputValue);
      setInputValue('');
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  // Welcome message with suggested questions
  useEffect(() => {
    if (questions && questions.length > 0 && !loadingContent) {
      // Create welcome message with markdown formatting
      const welcomeMessage = {
        text:
          `👋 Hi! I'm an AI assistant specialized in discussing articles about **${article.title}**.\n\n` +
          `I've analyzed this article and can help you understand it better.\n` +
          `Here are some suggested questions to get started:\n` +
          questions
            .slice(0, 3)
            .map((q) => `- "${q}"`)
            .join('\n'),
        isUser: false,
      };

      // Set the welcome message
      setMessages([welcomeMessage]);
    }
  }, [article.title, questions, loadingContent]);

  const handleQuestionClick = async (text: string) => {
    // Extract question from quotes if present
    const question = text.match(/"([^"]+)"/)
      ? text.match(/"([^"]+)"/)![1]
      : text;

    // Add the clicked question as a user message
    addMessage(question, true);
    // Get AI response for the question
    await respondToUser(question);
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
      {/* Chat Container */}
      <div
        className={`fixed transition-all duration-300 ease-in-out ${
          isExpanded
            ? 'bottom-20 right-4 w-2/3' // Increased bottom spacing when expanded
            : 'bottom-16 right-4 w-96'
        } ${!isChatboxOpen ? 'hidden' : ''} ${styles.chatbox}`}
        style={{
          height: isExpanded
            ? 'calc(80vh - 6rem)' // Reduced height to account for footer
            : '500px',
          maxHeight: isExpanded
            ? 'calc(100vh - 8rem)' // Ensure it doesn't overflow viewport
            : '500px',
        }}
      >
        <div className="bg-white shadow-md rounded-lg w-full h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center flex-shrink-0">
            <p className="text-lg font-semibold">Admin Bot</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSaveArticle(article)}
                className={`${styles.dialogIconButton} ${
                  isExpanded ? styles.expandedButton : ''
                }`}
                title={actionSave.name}
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
                {isExpanded && <span className="ml-2">{actionSave.name}</span>}
              </button>
              <button
                onClick={toggleExpand}
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
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
                      d="M6 16h12M12 10v12m0 0l-4-4m4 4l4-4"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  )}
                </svg>
              </button>
              <button
                onClick={toggleChatbox}
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
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
              onKeyUp={handleKeyUp}
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
