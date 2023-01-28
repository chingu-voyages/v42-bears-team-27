import type { ReactElement } from 'react';
import { useContext, useState } from 'react';
import type { InferGetStaticPropsType } from 'next';
import { createColumnHelper } from '@tanstack/react-table';
import useSWR, { SWRConfig } from 'swr';

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
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ fallback }) => {
  console.log({ fallback });
  const { data: classroomData } = useSWR('/api/v0/classroom/', (endpoint) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  });
  console.log({ classroomData });
  const authCtx = useContext(AuthContext);
  // TODO: Migrate with useSWR hook to appropriate components whereby subject data is required
  const [subjects] = useState<ISubject[]>(
    // @ts-ignore
    extractArray(classroomData, 'subjects'),
  );
  // TODO: Migrate with useSWR hook to appropriate components whereby students data is required
  const [students] = useState<IStudent[]>(
    // @ts-ignore
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

  console.log({ authCtx });

  return (
    <SWRConfig value={{ fallback }}>
      <pre>{JSON.stringify(classroomData, null, 2)}</pre>
      <Header>
        <TeacherNav
          // @ts-ignore
          heading={`Classroom: ${(classroomData as IClassroom).name}`}
        />
      </Header>
      <div sx={{ pt: 1, pb: 4, px: 2 }}>
        {
          // @ts-ignore
          !(classroomData as IClassroom).name ? (
            <ClassroomCreation />
          ) : (
            <>
              <p
                sx={{
                  variant: 'text.h3',
                  color: 'primary',
                  textAlign: 'center',
                }}
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
          )
        }
      </div>
    </SWRConfig>
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

export async function getServerSideProps() {
  let data: IClassroom;
  try {
    data = await getClassroom();
  } catch (e) {
    data = {
      id: '',
      name: '',
      subjects: [],
      students: [],
      events: [],
    };
  }
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
      fallback: {
        '/api/v0/classroom': classroomData,
      },
    },
  };
}

export default Home;
