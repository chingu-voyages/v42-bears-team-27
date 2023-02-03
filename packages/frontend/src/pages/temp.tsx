import type { ReactElement } from 'react';

import Layout from 'src/layouts/Layout';
import ExistingUserForm from 'src/components/landing/LandingHeader/Login/ExistingUserForm';
// import CreateTaskForm from 'components/dashboard/teacher/TeacherCalendar/CreateTaskForm';
import type { NextPageWithLayout } from './_app';
// import { ISubject } from 'interfaces';

const Signup: NextPageWithLayout = () => {
  //   const subjectsData = [
  //     {
  //       id: '63dac03a2d4b1dddd8a84256',
  //       title: 'english',
  //       topics: [
  //         {
  //           slug: 'punctuation',
  //           title: 'Punctuation',
  //           types: ['lesson'],
  //           id: '63dac03a2d4b1dddd8a84257',
  //         },
  //       ],
  //       __v: 0,
  //     },
  //     {
  //       id: '63dac03a2d4b1dddd8a8425a',
  //       title: 'mathematics',
  //       topics: [
  //         {
  //           slug: 'indices',
  //           title: 'Indices',
  //           types: ['exercise'],
  //           id: '63dac03a2d4b1dddd8a8425b',
  //         },
  //       ],
  //       __v: 0,
  //     },
  //     {
  //       id: '63dac03a2d4b1dddd8a8425d',
  //       title: 'history',
  //       topics: [
  //         {
  //           slug: 'cold-war',
  //           title: 'Cold War',
  //           types: ['test'],
  //           id: '63dac03a2d4b1dddd8a8425e',
  //         },
  //       ],
  //       __v: 0,
  //     },
  //   ];
  const i = 0;
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        color: 'primary',
        bg: 'muted',
      }}
    >
      <ExistingUserForm
        userRole="teacher"
        error=""
        onSubmit={(data) => console.log(data)}
      />
      <ExistingUserForm
        userRole="student"
        error=""
        onSubmit={(data) => console.log(data)}
      />
      {/* <CreateTaskForm subjects={subjectsData as ISubject[]} error="" onSubmit={() => console.log()} /> */}
    </div>
  );
};

Signup.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="RemoteClass"
      description="Create an account as a teacher and begin setting up your remote class"
    >
      {page}
    </Layout>
  );
};

export default Signup;
