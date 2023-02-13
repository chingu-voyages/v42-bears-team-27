import type { ReactElement } from 'react';
import useSWRImmutable from 'swr/immutable';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import { TeacherNav } from 'src/components/dashboard/navs';
import ClassroomCreation from 'src/components/dashboard/teacher/ClassroomCreation';
import TeacherHomeView from 'src/components/dashboard/teacher/TeacherHomeView';
import type { IClassroom } from 'src/interfaces';
import { fetcher } from 'src/services';
import type { NextPageWithLayout } from 'src/pages/_app';

const Home: NextPageWithLayout = () => {
  const { data: classroomData, isLoading } = useSWRImmutable<IClassroom>(
    '/api/v0/classroom',
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
      }}
    >
      <TeacherNav
        heading={classroomData?.name ? `Classroom: ${classroomData.name}` : ''}
      />
      {classroomData && !classroomData.name ? (
        <ClassroomCreation />
      ) : (
        <TeacherHomeView />
      )}
    </div>
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
