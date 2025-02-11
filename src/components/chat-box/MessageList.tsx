import React, { useState, useEffect, useMemo } from 'react';
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
  const [visibleResponses, setVisibleResponses] = useState<
    Record<number, boolean>
  >(() =>
    messages.reduce(
      (acc, _, index) => ({
        ...acc,
        [index]: true,
      }),
      {},
    ),
  );

  // Memoize the list of messages to prevent unnecessary re-renders
  const messagesList = useMemo(() => messages, [messages]);

  const addNewMessageVisibility = (index: number) => {
    setVisibleResponses((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Only add visibility state for new messages
  useEffect(() => {
    const lastIndex = messages.length - 1;
    if (!visibleResponses.hasOwnProperty(lastIndex) && messages[lastIndex]) {
      addNewMessageVisibility(lastIndex);
    }
  }, [messages, visibleResponses]);

  const toggleResponseVisibility = (index: number) => {
    setVisibleResponses((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={styles.messageList}>
      {messagesList.map((msg: string, index: number) => (
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
