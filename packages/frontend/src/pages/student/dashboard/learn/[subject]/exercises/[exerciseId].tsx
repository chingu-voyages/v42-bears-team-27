import type { ReactElement } from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import AuthLayout from 'src/layouts/AuthLayout';
import ExerciseView from 'src/components/dashboard/student/ExerciseView';
import type { IStudentTask } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import { useElapsedTime } from 'src/hooks';
import { fetcher, putStudentTask } from 'src/services';
import type { NextPageWithLayout } from 'src/pages/_app';

const ExerciseId: NextPageWithLayout = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const { data: tasksData, error } = useSWR<IStudentTask[]>(
    '/api/v0/student/tasks',
    fetcher,
  );
  const { elapsedTime } = useElapsedTime({ isPlaying: true });

  const exerciseCompleteHandler = async () => {
    if (tasksData) {
      const foundTaskIdx = tasksData.findIndex((task) => {
        if (typeof task.taskID === 'string') {
          return false;
        }
        // NOTE: Bad typing for taskID so doesn't recognise if it's
        // possible to be something other than 'ID'
        if (
          // @ts-ignore
          task.taskID.assignment._id === router.query.exerciseId &&
          // @ts-ignore
          !task.taskID.assignment.completed
        ) {
          return true;
        }

        return false;
      });

      if (foundTaskIdx !== -1) {
        const updatedTask = {
          // NOTE: Check line 27
          // @ts-ignore
          task: tasksData[foundTaskIdx].taskID._id,
          addTime: Math.round(elapsedTime * 1000),
          completed: true,
        };
        await putStudentTask(updatedTask);
      }
    }
  };

  if (error) {
    // Assuming any error when fetching data means that user cookies have expired,
    // therefore logout the user from the app since they're not authenticated
    authCtx?.onLogout();
  }

  return <ExerciseView onExerciseComplete={exerciseCompleteHandler} />;
};

ExerciseId.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Exercise"
      description="Try out an exercise based on a topic to see how well you do"
    >
      {page}
    </AuthLayout>
  );
};

export default ExerciseId;
