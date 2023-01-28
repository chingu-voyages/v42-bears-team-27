import type { ReactElement } from 'react';
import { useContext, useState } from 'react';
import type { InferGetStaticPropsType } from 'next';
import { createColumnHelper } from '@tanstack/react-table';

import { AuthLayout, Header } from 'layouts/AuthLayout';
import { TeacherNav } from 'components/dashboard/navs';
import { TeacherCalendar } from 'components/dashboard/home/calendars';
import {
  BroadcastModal,
  ClassroomModal,
} from 'components/dashboard/home/modals';
import ClassroomCreation from 'components/dashboard/home/forms/teacher';
import StudentTable from 'components/dashboard/home/StudentTable';
import ViewClassroom from 'components/dashboard/home/ViewClassroom';

import type { IClassroom, IStudent, ISubject, IUserData } from 'interfaces';
import { AuthContext } from 'store/auth';
import { getClassroom } from 'src/services';
import type { NextPageWithLayout } from '../../_app';

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('fullName', {
    header: () => 'Full Name',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('tasks', {
    header: () => 'Tasks',
    cell: (info) => info.renderValue(),
  }),
];

// NOTE: Temporary function only used until no longer needed
function extractArray<T, K extends keyof T>(obj: T, key: K) {
  if (!obj) {
    return [];
  }

  const extractedData = [...(obj[key] as any)];

  return [...extractedData];
}

const Home: NextPageWithLayout<
InferGetStaticPropsType<typeof getStaticProps>
> = ({ classroomData }) => {
  const authCtx = useContext(AuthContext);
  // TODO: Migrate with useSWR hook to appropriate components whereby subject data is required
  const [subjects] = useState<ISubject[]>(
    extractArray(classroomData, 'subjects'),
  );
  // TODO: Migrate with useSWR hook to appropriate components whereby students data is required
  const [students] = useState<IStudent[]>(
    extractArray(classroomData, 'students'),
  );

  if (!authCtx) {
    return (
      <p
        sx={{
          variant: 'text.h3',
          position: 'absolute',
          top: '40%',
          left: '50%',
          translate: '-50% -50%',
        }}
      >
        Loading Dashboard...
      </p>
    );
  }

  return (
    <>
      <Header>
        <TeacherNav heading={`Classroom: ${classroomData.name}`} />
      </Header>
      <div sx={{ pt: 1, pb: 4, px: 2 }}>
        {classroomData.length > 0 ? (
          <ClassroomCreation />
        ) : (
          <>
            <p
              sx={{ variant: 'text.h3', color: 'primary', textAlign: 'center' }}
            >
              {`Good Morning, ${(authCtx.user as IUserData)?.title}.${
                (authCtx.user as IUserData)?.fullName
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
              <ClassroomModal>
                <ViewClassroom user={authCtx?.user as IUserData} />
              </ClassroomModal>
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
              <TeacherCalendar subjects={subjects} />
              <StudentTable data={students} columns={columns} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="RemoteClass"
      description="Dashboard where you can manage your classroom and do many other things"
    >
      {page}
    </AuthLayout>
  );
};

export async function getStaticProps() {
  const data: IClassroom = await getClassroom();
  // NOTE: Move once useSWR hook is applied for this data into the appropriate components
  // const subjectsData: ISubject[] = [
  //   {
  //     id: 0,
  //     title: 'english',
  //     topics: [
  //       {
  //         id: 0,
  //         title: 'punctuation',
  //         types: [{ id: 0, title: 'lesson', url: '/' }],
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     title: 'mathematics',
  //     topics: [
  //       {
  //         id: 1,
  //         title: 'indices',
  //         types: [{ id: 1, title: 'exercise', url: '/' }],
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'history',
  //     topics: [
  //       {
  //         id: 2,
  //         title: 'cold war',
  //         types: [{ id: 2, title: 'test', url: '/' }],
  //       },
  //     ],
  //   },
  // ];
  // NOTE: Move once useSWR hook is applied for this data into the appropriate components
  // const studentsData: IStudent[] = [
  //   {
  //     id: 0,
  //     fullName: 'Smith, Lucas',
  //     tasks: 2,
  //   },
  //   {
  //     id: 1,
  //     fullName: 'Miller, Amanda',
  //     tasks: 0,
  //   },
  //   {
  //     id: 2,
  //     fullName: 'Adams, John',
  //     tasks: 1,
  //   },
  //   {
  //     id: 3,
  //     fullName: 'Linsley, Karen',
  //     tasks: 4,
  //   },
  // ];

  const classroomData: IClassroom = {
    ...data,
    // subjects: subjectsData,
    // students: studentsData,
  };

  return {
    props: {
      classroomData,
    },
  };
}

export default Home;
