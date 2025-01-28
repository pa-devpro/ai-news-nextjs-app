import { askQuestionToArticle } from './openai-service';

export const handleSend = async (
  msg: string,
  aiContent: string,
  setMessages: React.Dispatch<React.SetStateAction<string[]>>,
  setResponses: React.Dispatch<React.SetStateAction<string[]>>,
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  if (!isValidMessage(msg)) {
    setAlertMessage('Please enter a valid message');
    return;
  }
  if (msg.trim()) {
    setAlertMessage(null);
    setMessages((prevMessages) => [...prevMessages, msg]);
    const responseFromAi = await askQuestionToArticle(aiContent, msg);

    setResponses((prevResponses) => [
      ...prevResponses,
      responseFromAi.toString(),
    ]);
  }
};

const isValidMessage = (message: string) => {
  return message.trim().length > 0;
};
