'use client';
import React, { useState } from 'react';
import { Spinner } from '@/components/dashboard/ui/spinner';
import dynamic from 'next/dynamic';
import styles from './Article.module.css';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';
import { ChevronDown } from 'lucide-react';

const ChatBox = dynamic(() => import('@/components/chat-box/ChatBox'), {});

interface ChatBoxContainerProps {
  article: ArticleToDisplay;
}

const ChatBoxContainer: React.FC<ChatBoxContainerProps> = ({ article }) => {
  const [isChatVisible, setIsChatVisible] = useState(true);

  return (
    <div className={styles.ChatboxContainer}>
      <div className={styles.ChatboxHeader}>
        <h3>Article Discussion</h3>
        <button
          className={styles.ChatVisibilityToggle}
          onClick={() => setIsChatVisible(!isChatVisible)}
        >
          {isChatVisible ? 'Hide Chat' : 'Show Chat'}
          <ChevronDown
            className={`${styles.ChatVisibilityIcon} ${
              isChatVisible ? styles.rotated : ''
            }`}
            size={16}
          />
        </button>
      </div>
      {isChatVisible && (
        <div className={styles.ChatContent}>
          <React.Suspense fallback={<Spinner size="lg" />}>
            <ChatBox article={article} />
          </React.Suspense>
        </div>
      )}
    </div>
  );
};

export default ChatBoxContainer;
