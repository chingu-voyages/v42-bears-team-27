import type { ReactElement } from 'react';

import AuthLayout from 'src/layouts/AuthLayout';
import { StudentAppBar, StudentBottomNav } from 'src/components/dashboard/navs';
import StudentCalendar from 'src/components/dashboard/student/StudentCalendar';
import type { NextPageWithLayout } from '../../_app';

const Home: NextPageWithLayout = () => (
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
      <StudentCalendar />
    </div>
    <StudentBottomNav />
  </div>
);

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
