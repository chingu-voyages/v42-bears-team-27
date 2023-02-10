import { useState, useReducer } from 'react';
import { useRouter } from 'next/router';

import Loader from 'src/components/common/Loader';
import {
  AlertDialog,
  AlertDialogContent,
  Button,
  Progress,
} from 'src/components/ui';
import type { IExercise } from 'src/interfaces';
import QuestionItem from './QuestionItem';

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

type ACTIONTYPE =
  | { type: 'ADD_CORRECT' }
  | { type: 'REMOVE_CORRECT' }
  | {
    type: 'UPDATE_RESULTS';
    payload: { score: number; message: { text: string; color: string } };
  };

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

// const DUMMY_EXERCISE_DATA: IExercise = {
//   topic: 'Indices',
//   subject: '2323',
//   content: {
//     _id: '323',
//     page: {
//       _id: '0',
//       questions: [
//         {
//           _id: '01',
//           prompt: 'What is 2^2?',
//           answer: '4',
//         },
//         {
//           _id: '02',
//           prompt: 'What is 4^2?',
//           answer: '16',
//         },
//         {
//           _id: '03',
//           prompt: 'What is 7^2?',
//           answer: '49',
//         },
//         {
//           _id: '04',
//           prompt: 'What is 9^2?',
//           answer: '81',
//         },
//       ],
//     },
//   },
// };

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

const ExerciseView: React.FC = () => {
  const router = useRouter();
  const [exercise] = useState<IExercise>();
  const [examineState, dispatchExamine] = useReducer(
    examineReducer,
    initialExamineState,
  );
  const [showResultsModal, setShowResultsModal] = useState(false);

  if (!exercise) {
    return <Loader>Loading Exercise...</Loader>;
  }

  const { topic, content } = exercise;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const percScore = Math.round(
      (examineState.numberOfCorrect / exercise.content.page.questions.length) *
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

    // TODO: Update status of student task
    // const updatedTask = {
    //   task,
    //   addTime,
    //   completed: true,
    // };
    // await putStudentTask(updatedTask);

    setShowResultsModal(true);
  };

  const confirmHandler = () => {
    // Redirect back to current subject exercises
    router.replace(`../../${router.query.subject}/exercises`);
  };

  return (
    <div
      sx={{
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
      }}
    >
      <h2 sx={{ variant: 'text.h3', textAlign: 'center', mb: 5 }}>{topic}</h2>

      <form onSubmit={submitHandler}>
        <div
          sx={{
            variant: 'text.h4',
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr 1fr'],
            gridGap: '0.5rem',
          }}
        >
          {content.page.questions.map(({ _id, ...question }) => (
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

      <AlertDialog open={showResultsModal}>
        <AlertDialogContent
          sx={{
            p: 3,
            // NOTE: REALLY HACKY CSS HERE. Consider modifying this
            // ui component to handle these sort of scenarios
            '& div': {
              justifyContent: 'center !important',
              '& button:first-of-type': {
                display: 'none',
              },
            },
          }}
          title="Here are your results from the exercise!"
          description="If you have a task to complete this exercise, this will be automatically marked as complete since you've submitted your answers already"
          width="32rem"
          height="min-content"
          onConfirm={confirmHandler}
        >
          <div sx={{ my: 4, mb: 5 }}>
            <p
              sx={{
                variant: 'text.label',
                textAlign: 'center',
                color: examineState.results.message.color,
              }}
            >
              {examineState.results.message.text}
            </p>
            <Progress
              sx={{
                mx: 'auto',
                '& div': { bg: examineState.results.message.color },
              }}
              value={examineState.results.score}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExerciseView;
