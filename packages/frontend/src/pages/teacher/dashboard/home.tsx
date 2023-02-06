import type { ReactElement } from 'react';
import { useContext } from 'react';
import useSWR from 'swr';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import { TeacherNav } from 'src/components/dashboard/navs';
import TeacherCalendar from 'src/components/dashboard/teacher/TeacherCalendar';
import {
  BroadcastModal,
  ClassroomModal,
} from 'src/components/dashboard/modals';
import ClassroomCreation from 'src/components/dashboard/teacher/ClassroomCreation';
import StudentTable from 'src/components/dashboard/teacher/StudentTable';
import type { IClassroom, ITeacher } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import { fetcher } from 'src/services';
import type { NextPageWithLayout } from '../../_app';

const Home: NextPageWithLayout = () => {
  const authCtx = useContext(AuthContext);

  const {
    data: classroomData,
    isLoading,
    error,
  } = useSWR<IClassroom>('/api/v0/classroom', fetcher);

  if (!authCtx?.user) {
    return <Loader>Loading Dashboard...</Loader>;
  }

  if (error) {
    // Assuming any error when fetching data means that user cookies have expired,
    // therefore logout the user from the app since they're not authenticated
    authCtx.onLogout();
  }

  if (isLoading) {
    return <Loader>Loading Data...</Loader>;
  }

  return (
    <>
      <TeacherNav
        heading={classroomData?.name ? `Classroom: ${classroomData.name}` : ''}
      />
      {!classroomData?.name ? (
        <ClassroomCreation />
      ) : (
        <>
          <p sx={{ variant: 'text.h3', color: 'primary', textAlign: 'center' }}>
            {`Good Morning, ${(authCtx.user as ITeacher).title}.${
              (authCtx.user as ITeacher).fullName
            }`}
          </p>
          <div
            sx={{
              display: 'flex',
              justifyContent: 'center',
              columnGap: 3,
              mb: [4, null, 0],
            }}
          >
            <BroadcastModal />
            <ClassroomModal />
          </div>
          <div
            sx={{
              display: 'flex',
              flexDirection: ['column', null, 'row'],
              alignItems: ['center', 'start', 'center'],
              justifyContent: 'space-between',
              columnGap: 3,
              mt: [3, null, 4],
            }}
          >
            <TeacherCalendar />
            <StudentTable />
          </div>
        </>
      )}
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Home"
      description="Dashboard where you can manage your classroom and do many other things"
    >
      {page}
    </AuthLayout>
  );
};

export default Home;
