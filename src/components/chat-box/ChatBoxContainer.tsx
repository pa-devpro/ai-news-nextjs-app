import React, { useState, useEffect } from 'react';
import ChatBox2 from './ChatBox2';
import ChatboxMobile from './ChatBoxMobile';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';

interface ChatBoxProps {
  article: ArticleToDisplay;
}

const ChatBoxContainer: React.FC<ChatBoxProps> = ({ article }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return isMobile ? (
    <ChatboxMobile article={article} />
  ) : (
    <ChatBox2 article={article} />
  );
};

export default ChatBoxContainer;
