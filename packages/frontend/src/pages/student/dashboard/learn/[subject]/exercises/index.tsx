import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import { StudentAppBar, StudentBottomNav } from 'src/components/dashboard/navs';
import SubjectTopics from 'src/components/dashboard/student/SubjectTopics';
import type { ISubject } from 'src/interfaces';
import { fetcher } from 'src/services';
import type { NextPageWithLayout } from 'src/pages/_app';

const Exercises: NextPageWithLayout = () => {
  const { query } = useRouter();

  const { data: subjectData, isLoading } = useSWR<ISubject[]>(
    query ? `/api/v0/classroom/subjects?name=${query.subject}` : null,
    fetcher,
  );

  if (isLoading) {
    return <Loader>Loading Exercises...</Loader>;
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
      <div sx={{ flexGrow: 1, my: 4, mx: 5, overflowY: 'auto' }}>
        {subjectData && (
          <>
            <h2 sx={{ variant: 'text.h3' }}>{subjectData[0]?.title}</h2>
            <h3 sx={{ variant: 'text.h4' }}>Exercises</h3>
            <SubjectTopics
              topics={subjectData[0]?.topics ?? []}
              type="exercise"
            />
          </>
        )}
      </div>
      <StudentBottomNav />
    </div>
  );
};

Exercises.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Exercises"
      description="Check out existing exercises on topics from a subject of your choice"
    >
      {page}
    </AuthLayout>
  );
};

export default Exercises;
