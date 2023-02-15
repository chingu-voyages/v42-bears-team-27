import type { ReactElement } from 'react';
import useSWRImmutable from 'swr/immutable';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import { StudentAppBar, StudentBottomNav } from 'src/components/dashboard/navs';
import ClassroomSubjects from 'src/components/dashboard/student/ClassroomSubjects';
import type { ISubject } from 'src/interfaces';
import type { NextPageWithLayout } from 'src/pages/_app';
import { fetcher } from 'src/services';

const Learn: NextPageWithLayout = () => {
  const { data: subjectsData, isLoading } = useSWRImmutable<ISubject[]>(
    '/api/v0/classroom/subjects',
    fetcher,
  );

  if (isLoading) {
    return <Loader>Loading Dashboard...</Loader>;
  }

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <StudentAppBar />
      <div sx={{ overflowY: 'auto' }}>
        <ClassroomSubjects subjects={subjectsData || []} />
      </div>
      <StudentBottomNav />
    </div>
  );
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
