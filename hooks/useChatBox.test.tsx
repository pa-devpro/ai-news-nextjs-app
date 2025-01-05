import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { handleSend } from '../lib/chatUtils';
import useChatBox from './useChatBox';

jest.mock('../lib/chatUtils', () => ({
  handleSend: jest.fn(
    (question, aiContent, setMessages, setResponses, setAlertMessages) => {
      setMessages((prevMessages: string[]) => [...prevMessages, question]);
      setResponses((prevResponses: string[]) => [...prevResponses, aiContent]);
      setAlertMessages((prevAlert: string) => [prevAlert, null]);
    },
  ),
}));

type UseChatBoxProps = {
  aiContent: string;
  initialQuestions: string[];
};

const TestComponent = ({ aiContent, initialQuestions }: UseChatBoxProps) => {
  const {
    message,
    messages,
    responses,
    isOpen,
    toggleChatBox,
    suggestedQuestions,
    handleQuestionClick,
  } = useChatBox({ aiContent, initialQuestions });

  return (
    <div>
      <div data-testid="message">{message}</div>
      <div data-testid="isOpen">{isOpen ? 'open' : 'closed'}</div>
      <button onClick={() => handleQuestionClick('Question 1')}>
        Click Question 1
      </button>
      <button onClick={toggleChatBox}>Toggle Chat Box</button>
      <div data-testid="suggestedQuestions">
        {suggestedQuestions.join(', ')}
      </div>
      <div data-testid="messages">{messages.join(', ')}</div>
      <div data-testid="responses">{responses.join(', ')}</div>
    </div>
  );
};

describe('useChatBox', () => {
  const aiContent = 'AI response';
  const initialQuestions = ['Question 1', 'Question 2'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    render(
      <TestComponent
        aiContent={aiContent}
        initialQuestions={initialQuestions}
      />,
    );

    expect(screen.getByTestId('message')).toHaveTextContent('');
    expect(screen.getByTestId('isOpen')).toHaveTextContent('open');
    expect(screen.getByTestId('suggestedQuestions')).toHaveTextContent(
      'Question 1, Question 2',
    );
    expect(screen.getByTestId('messages')).toHaveTextContent('');
    expect(screen.getByTestId('responses')).toHaveTextContent('');
  });

  it('should handle question click', () => {
    render(
      <TestComponent
        aiContent={aiContent}
        initialQuestions={initialQuestions}
      />,
    );

    fireEvent.click(screen.getByText('Click Question 1'));

    expect(screen.getByTestId('message')).toHaveTextContent('Question 1');
    expect(screen.getByTestId('suggestedQuestions')).toHaveTextContent(
      'Question 2',
    );
    expect(screen.getByTestId('messages')).toHaveTextContent('Question 1');
    expect(screen.getByTestId('responses')).toHaveTextContent('AI response');
    expect(handleSend).toHaveBeenCalledWith(
      'Question 1',
      aiContent,
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    );
  });

  it('should toggle chat box', () => {
    render(
      <TestComponent
        aiContent={aiContent}
        initialQuestions={initialQuestions}
      />,
    );

    fireEvent.click(screen.getByText('Toggle Chat Box'));

    expect(screen.getByTestId('isOpen')).toHaveTextContent('closed');

    fireEvent.click(screen.getByText('Toggle Chat Box'));

    expect(screen.getByTestId('isOpen')).toHaveTextContent('open');
  });
});
