import { useState, useCallback } from 'react';
import { handleSend } from '../lib/chatUtils';

type UseChatBoxProps = {
  aiContent: string;
  initialQuestions: string[];
};

const useChatBox = ({ aiContent, initialQuestions }: UseChatBoxProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(initialQuestions);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleQuestionClick = useCallback((question: string) => {
    setMessage(question);
    setSuggestedQuestions((suggestedQuestions) => suggestedQuestions.filter((q) => q !== question));
    handleSend(question, aiContent, setMessages, setResponses, setAlertMessage);
  }, [aiContent]);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return {
    message,
    setMessage,
    messages,
    setMessages,
    responses,
    setResponses,
    alertMessage,
    setAlertMessage,
    isOpen,
    setIsOpen,
    suggestedQuestions,
    handleQuestionClick,
    toggleChatBox,
  };
};

export default useChatBox;