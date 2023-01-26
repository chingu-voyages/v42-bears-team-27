import type { ReactElement } from 'react';
import { useContext, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { AuthLayout, Header } from 'layouts/AuthLayout';
import { TeacherNav } from 'components/dashboard/navs';
import { TeacherCalendar } from 'components/dashboard/home/calendars';
import {
  BroadcastModal,
  ClassroomModal,
} from 'components/dashboard/home/modals';
import StudentTable from 'components/dashboard/home/StudentTable';
import ViewClassroom from 'components/dashboard/home/ViewClassroom';
import type { IUserData } from 'interfaces';
import { AuthContext } from 'store/auth';

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

type Props = {
  defaultData: any[];
};

const Home: NextPageWithLayout<Props> = ({ defaultData }) => {
  const authCtx = useContext(AuthContext);
  const [data] = useState(() => {
    if (!defaultData) {
      return [];
    }
    return [...defaultData];
  });

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
    <div sx={{ pt: 1, pb: 4, px: 2 }}>
      <p sx={{ variant: 'text.h3', color: 'primary', textAlign: 'center' }}>
        {/* TODO: username should be replaced with last name (e.g. Mr.Jonathan) */}
        {`Good Morning, ${(authCtx.user as IUserData)?.fullName}`}
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
        <TeacherCalendar />
        <StudentTable data={data} columns={columns} />
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="RemoteClass"
      description="Dashboard where you can manage your classroom and do many other things"
    >
      <Header>
        {/* TODO: heading should include name of classroom (e.g. Bears Team 27) */}
        <TeacherNav heading="Classroom" />
      </Header>
      {page}
    </AuthLayout>
  );
};

// Before rendering home page, ensure required students data is loaded in
// export async function getStaticProps() {
//   const defaultData: any[] = [
//     {
//       fullName: 'Smith, Lucas',
//       tasks: 2,
//     },
//     {
//       fullName: 'Miller, Amanda',
//       tasks: 0,
//     },
//     {
//       fullName: 'Adams, John',
//       tasks: 1,
//     },
//     {
//       fullName: 'Linsley, Karen',
//       tasks: 4,
//     },
//   ];

//   return {
//     props: {
//       defaultData,
//     },
//   };
// }

export default Home;
