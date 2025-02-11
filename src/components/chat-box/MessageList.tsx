import React, { useState, useEffect } from 'react';
import MarkdownWrapper from '../markdown-wrapper/MarkdownWrapper';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: string[];
  responses: string[];
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  responses,
}) => {
  const [visibleResponses, setVisibleResponses] = useState<boolean[]>(
    Array(messages.length).fill(true),
  );

  useEffect(() => {
    setVisibleResponses(Array(messages.length).fill(true));
  }, [messages]);

  const toggleResponseVisibility = (index: number) => {
    setVisibleResponses((prevVisibleResponses) => {
      const newVisibleResponses = [...prevVisibleResponses];
      newVisibleResponses[index] = !newVisibleResponses[index];
      return newVisibleResponses;
    });
  };

  return (
    <div className={styles.messageList}>
      {messages.map((msg: string, index: number) => (
        <div key={index} className={styles.messageGroup}>
          <div
            className={styles.message}
            onClick={() => toggleResponseVisibility(index)}
          >
            <div className={styles.messageLabel}>Q:</div>
            <div className={styles.messageContent}>
              <MarkdownWrapper>{msg}</MarkdownWrapper>
            </div>
          </div>
          {visibleResponses[index] && (
            <div className={styles.response}>
              <div className={styles.messageLabel}>A:</div>
              <div className={styles.messageContent}>
                <MarkdownWrapper>{responses[index]}</MarkdownWrapper>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
