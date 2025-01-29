import React from 'react';
import styles from './SuggestQuestionsBox.module.css';

type SuggestQuestionsBoxProps = {
  questions: string[];
  onQuestionClick: (question: string) => void;
};

const SuggestQuestionsBox: React.FC<SuggestQuestionsBoxProps> = ({
  questions,
  onQuestionClick,
}) => {
  return (
    <div className={styles.questionsContainer}>
      {questions.map((question, index) => (
        <div
          key={index}
          className={styles.question}
          onClick={() => onQuestionClick(question)}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#f0f0f0')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'transparent')
          }
        >
          {question}
        </div>
      ))}
    </div>
  );
};

export default SuggestQuestionsBox;
