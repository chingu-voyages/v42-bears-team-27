import { useState, useReducer, useContext } from 'react';
import { useRouter } from 'next/router';
import type { ThemeUIStyleObject } from 'theme-ui';
import useSWR from 'swr';

import Loader from 'src/components/common/Loader';
import { Button } from 'src/components/ui';
import type { IExercise } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import { fetcher } from 'src/services';
import QuestionItem from './QuestionItem';
import ResultsDialog from './ResultsDialog';

const RESULT_MESSAGES = [
  {
    minScorePerc: 0,
    text: `You've done not so well for this exercise... check out the lessson for this topic, and once you've done that, come back and score higher than ever before!`,
    color: 'error',
  },
  {
    minScorePerc: 40,
    text: `Not your very best attempt, but this one's not your last!`,
    color: 'warning',
  },
  {
    minScorePerc: 60,
    text: `You've outdid yourself on this one!`,
    color: 'success',
  },
];

const initialExamineState = {
  numberOfCorrect: 0,
  results: {
    score: 0,
    message: {
      text: '',
      color: '',
    },
  },
};

export interface IResults {
  score: number;
  message: { text: string; color: string };
}

type ACTIONTYPE =
  | { type: 'ADD_CORRECT' }
  | { type: 'REMOVE_CORRECT' }
  | { type: 'UPDATE_RESULTS'; payload: IResults };

function examineReducer(state: typeof initialExamineState, action: ACTIONTYPE) {
  if (action.type === 'ADD_CORRECT') {
    return {
      ...state,
      numberOfCorrect: state.numberOfCorrect + 1,
    };
  }

  if (action.type === 'REMOVE_CORRECT') {
    return {
      ...state,
      numberOfCorrect: state.numberOfCorrect - 1,
    };
  }

  if (action.type === 'UPDATE_RESULTS') {
    return {
      numberOfCorrect: state.numberOfCorrect,
      results: { ...state.results, ...action.payload },
    };
  }

  return initialExamineState;
}

const containerStyles: ThemeUIStyleObject = {
  maxWidth: '95%',
  width: '60rem',
  p: 3,
  my: 5,
  mx: 'auto',
  overflowY: 'auto',
  bg: 'muted',
  border: '2px solid',
  borderColor: 'primary',
  borderRadius: 5,
};

type Props = {
  onExerciseComplete: () => void;
};

const ExerciseView: React.FC<Props> = ({ onExerciseComplete }) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const {
    data: exerciseData,
    isLoading,
    error,
  } = useSWR<IExercise>(
    router.query?.exerciseId
      ? `/api/v0/material/exercises/${router.query.exerciseId}`
      : null,
    fetcher,
  );

  const [examineState, dispatchExamine] = useReducer(
    examineReducer,
    initialExamineState,
  );
  const [showResults, setShowResults] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!exerciseData) {
      return;
    }

    const percScore = Math.round(
      (examineState.numberOfCorrect /
        exerciseData.content.page.questions.length) *
        100,
    );
    const resultMessage = RESULT_MESSAGES.find(
      (item, idx, arr) =>
        item.minScorePerc >= percScore || idx === arr.length - 1,
    );

    if (resultMessage) {
      const { text, color } = resultMessage;
      const result = { score: percScore, message: { text, color } };
      dispatchExamine({
        type: 'UPDATE_RESULTS',
        payload: result,
      });
    }

    // Call appropriate handlers when exercise is finished
    onExerciseComplete();
    setShowResults(true);
  };

  const confirmHandler = () => {
    // Redirect back to current subject exercises
    router.replace(`../../${router.query.subject}/exercises`);
  };

  if (isLoading || !exerciseData) {
    return (
      <div sx={{ position: 'relative', height: '30rem', ...containerStyles }}>
        <Loader>Loading Exercise...</Loader>
      </div>
    );
  }

  if (error) {
    // Assuming any error when fetching data means that user cookies have expired,
    // therefore logout the user from the app since they're not authenticated
    authCtx?.onLogout();
  }

  return (
    <div sx={containerStyles}>
      <h2 sx={{ variant: 'text.h3', textAlign: 'center', mb: 5 }}>
        {exerciseData.topic}
      </h2>

      <form onSubmit={submitHandler}>
        <div
          sx={{
            variant: 'text.h4',
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr 1fr'],
            gridGap: '0.5rem',
          }}
        >
          {exerciseData.content.page.questions.map(({ _id, ...question }) => (
            <QuestionItem
              key={_id}
              question={question}
              onCorrect={() => dispatchExamine({ type: 'ADD_CORRECT' })}
              onIncorrect={() => dispatchExamine({ type: 'REMOVE_CORRECT' })}
            />
          ))}
        </div>
        <Button sx={{ mt: 4, mb: 3, mx: 'auto' }} type="submit">
          Submit Answers
        </Button>
      </form>

      <ResultsDialog
        open={showResults}
        results={examineState.results}
        onConfirm={confirmHandler}
      />
    </div>
  );
};

export default ExerciseView;
