import type { ReactElement } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import AuthLayout from 'src/layouts/AuthLayout';
import { AlertDialog, AlertDialogContent } from 'src/components/ui';
import type { IStudentTask } from 'src/interfaces';
import { useElapsedTime } from 'src/hooks';
import { fetcher, putStudentTask } from 'src/services';
import type { NextPageWithLayout } from 'src/pages/_app';
import LessonView from 'src/components/dashboard/student/LessonView';

const LessonId: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: tasksData } = useSWR<IStudentTask[]>(
    '/api/v0/student/tasks',
    fetcher,
  );
  const { elapsedTime } = useElapsedTime({ isPlaying: true });
  const [showLessonEndModal, setShowLessonEndModal] = useState(false);

  const lessonEndHandler = async () => {
    if (tasksData) {
      const foundTaskIdx = tasksData.findIndex((task) => {
        if (typeof task.taskID === 'string') {
          return false;
        }
        // NOTE: Bad typing for taskID so doesn't recognise if it's
        // possible to be something other than 'ID'
        if (
          // @ts-ignore
          task.taskID.assignment._id === router.query.lessonId &&
          // @ts-ignore
          task.completed === false
        ) {
          return true;
        }

        return false;
      });

      if (foundTaskIdx !== -1) {
        const updatedTask = {
          // NOTE: Check line 30
          // @ts-ignore
          task: tasksData[foundTaskIdx].taskID._id,
          addTime: Math.round(elapsedTime * 1000),
          completed: true,
        };
        await putStudentTask(updatedTask);
      }
    }
    setShowLessonEndModal(true);
  };

  const confirmHandler = () => {
    // Redirect back to current subject lessons
    router.replace(`../../${router.query.subject}/lessons`);
  };

  return (
    <>
      <LessonView
        lessonId={router.query.lessonId as string}
        onLessonEnd={lessonEndHandler}
      />
      <AlertDialog
        open={showLessonEndModal}
        onOpenChange={(newState) => setShowLessonEndModal(newState)}
      >
        <AlertDialogContent
          sx={{ p: 3 }}
          title="Would like to go back to this subject's lessons?"
          description="If you have a task to complete this lesson, this will be automatically marked as complete since you've reached the end of the lesson"
          width="32rem"
          height="min-content"
          onConfirm={confirmHandler}
        />
      </AlertDialog>
    </>
  );
};

LessonId.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Lesson"
      description="A lesson presentation slide of a selected topic"
    >
      {page}
    </AuthLayout>
  );
};

export default LessonId;
