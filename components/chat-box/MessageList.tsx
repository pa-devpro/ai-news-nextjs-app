import React, { useState, useEffect } from 'react';
import MarkdownWrapper from '../markdown-wrapper/MarkdownWrapper';
import styles from './Chatbox.module.css';

type MessageListProps = {
  messages: string[];
  responses: string[];
};

export const MessageList: React.FC<MessageListProps> = ({ messages, responses }) => {
  const [visibleResponses, setVisibleResponses] = useState<boolean[]>(Array(messages.length).fill(true));

  useEffect(() => {
    // Update the visibleResponses state when messages change
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
    <>
      {messages.map((msg, index) => (
        <React.Fragment key={index}>
          <div className={styles.message} onClick={() => toggleResponseVisibility(index)}>
            <MarkdownWrapper>{msg}</MarkdownWrapper>
          </div>
          {visibleResponses[index] && (
            <div className={styles.response}>
              <MarkdownWrapper>{responses[index]}</MarkdownWrapper>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};
