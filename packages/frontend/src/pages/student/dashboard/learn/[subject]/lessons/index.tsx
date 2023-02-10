import type { ReactElement } from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import type { ISubject } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import { fetcher } from 'src/services';
import type { NextPageWithLayout } from 'src/pages/_app';
import SubjectTopics from 'src/components/dashboard/student/SubjectTopics';

const Lessons: NextPageWithLayout = () => {
  const { query } = useRouter();

  const authCtx = useContext(AuthContext);

  const {
    data: subjectData,
    isLoading,
    error,
  } = useSWR<ISubject[]>(
    query ? `/api/v0/classroom/subjects?name=${query.subject}` : null,
    fetcher,
  );

  if (!authCtx || isLoading) {
    return <Loader>Loading Lessons...</Loader>;
  }

  if (error) {
    // Assuming any error when fetching data means that user cookies have expired,
    // therefore logout the user from the app since they're not authenticated
    authCtx.onLogout();
  }

  return (
    <div sx={{ m: 4 }}>
      {subjectData && (
        <>
          <h2 sx={{ variant: 'text.h3' }}>{subjectData[0]?.title}</h2>
          <h3 sx={{ variant: 'text.h4', textAlign: 'center' }}>Lessons</h3>
          <SubjectTopics topics={subjectData[0]?.topics ?? []} type="lesson" />
        </>
      )}
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
