import { useState } from 'react';
import validator from 'validator';
// import ReactMarkdown from 'react-markdown';

import { useInput } from 'src/hooks';
import { TextField } from 'src/components/ui';

const answerValidator = (value: string) => {
  const trimmed = value.trim();

  return !validator.isEmpty(trimmed);
};

type Props = {
  question: {
    prompt: string;
    answer: string;
  };
  onCorrect: () => void;
  onIncorrect: () => void;
};

const QuestionItem: React.FC<Props> = ({
  question,
  onCorrect,
  onIncorrect,
}) => {
  const { prompt, answer } = question;

  const [isCorrect, setIsCorrect] = useState(false);
  const {
    hasErrors: enteredAnswerHasErrors,
    inputChangeHandler: answerChangedHandler,
    inputBlurHandler: answerBlurHandler,
  } = useInput(answerValidator, '');

  return (
    <fieldset>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        }}
      >
        <p sx={{ variant: 'text.h4', textAlign: 'center' }}>{prompt}</p>
        <TextField
          sx={{ borderColor: enteredAnswerHasErrors && 'warning' }}
          label="Your Answer"
          required
          onChange={(e) => answerChangedHandler(e.currentTarget.value)}
          onBlur={(e) => {
            const sanitizedAnswer = e.currentTarget.value.toLowerCase().trim();

            if (sanitizedAnswer === answer) {
              // If latest answer typed is correct compared to actual answer
              // Then call appropriate handler
              setIsCorrect(true);
              onCorrect();
            } else {
              setIsCorrect(false);
              if (isCorrect) {
                // Otherwise, call appropriate handler
                // if answer previously was marked as correct
                onIncorrect();
              }
            }
            answerBlurHandler();
          }}
        />
      </div>
    </fieldset>
  );
};

export default QuestionItem;
