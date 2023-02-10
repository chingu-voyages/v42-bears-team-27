import type { ReactElement } from 'react';
import { useContext } from 'react';
import useSWR from 'swr';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import ClassroomSubjects from 'src/components/dashboard/student/ClassroomSubjects';
import type { ISubject } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import type { NextPageWithLayout } from 'src/pages/_app';
import { fetcher } from 'src/services';

const Learn: NextPageWithLayout = () => {
  const authCtx = useContext(AuthContext);

  const {
    data: subjectsData,
    isLoading,
    error,
  } = useSWR<ISubject[]>('/api/v0/classroom/subjects', fetcher);

  if (!authCtx || isLoading) {
    return <Loader>Loading Dashboard...</Loader>;
  }

  if (error) {
    // Assuming any error when fetching data means that user cookies have expired,
    // therefore logout the user from the app since they're not authenticated
    authCtx.onLogout();
  }

  return <ClassroomSubjects subjects={subjectsData || []} />;
};

Learn.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Learn"
      description="A learning hub where you can access lessons and exercises"
    >
      {page}
    </AuthLayout>
  );
};

export default Learn;
