import type { ReactElement } from 'react';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import { StudentAppBar, StudentBottomNav } from 'src/components/dashboard/navs';
import StudentCalendar from 'src/components/dashboard/student/StudentCalendar';
import { useUser } from 'src/hooks';
import type { IStudent } from 'src/interfaces';
import type { NextPageWithLayout } from '../../_app';

const Home: NextPageWithLayout = () => {
  const { user, isLoading } = useUser('student');

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
      <div sx={{ overflowY: 'auto', py: '2rem' }}>
        <h2 sx={{ variant: 'text.h3', textAlign: 'center', mb: '2em' }}>
          {`Welcome back, ${(user as IStudent).forename}!`}
        </h2>
        <StudentCalendar />
      </div>
      <StudentBottomNav />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Home"
      description="Dashboard where you can view tasks set by your classroom teacher"
    >
      {page}
    </AuthLayout>
  );
};

export default Home;
