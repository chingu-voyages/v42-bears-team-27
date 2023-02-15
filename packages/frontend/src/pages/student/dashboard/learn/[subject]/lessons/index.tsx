import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import type { ISubject } from 'src/interfaces';
import { fetcher } from 'src/services';
import type { NextPageWithLayout } from 'src/pages/_app';
import SubjectTopics from 'src/components/dashboard/student/SubjectTopics';
import { StudentAppBar, StudentBottomNav } from 'src/components/dashboard/navs';

const Lessons: NextPageWithLayout = () => {
  const { query } = useRouter();

  const { data: subjectData, isLoading } = useSWRImmutable<ISubject[]>(
    query ? `/api/v0/classroom/subjects?name=${query.subject}` : null,
    fetcher,
  );

  if (isLoading) {
    return <Loader>Loading Lessons...</Loader>;
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
            <h3 sx={{ variant: 'text.h4' }}>Lessons</h3>
            <SubjectTopics
              topics={subjectData[0]?.topics ?? []}
              type="lesson"
            />
          </>
        )}
      </div>
      <StudentBottomNav />
    </div>
  );
};

Lessons.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Lessons"
      description="Check out existing lessons on topics from a subject of your choice"
    >
      {page}
    </AuthLayout>
  );
};

export default Lessons;
