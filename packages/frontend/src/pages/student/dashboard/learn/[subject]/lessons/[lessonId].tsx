import type { ReactElement } from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import { AuthContext } from 'src/store/auth';
import type { NextPageWithLayout } from 'src/pages/_app';
import LessonView from 'src/components/dashboard/student/LessonView';

const LessonId: NextPageWithLayout = () => {
  const router = useRouter();

  const authCtx = useContext(AuthContext);

  if (!authCtx || !router) {
    return <Loader>Loading...</Loader>;
  }

  return <LessonView lessonId={router.query.lessonId as string} />;
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
