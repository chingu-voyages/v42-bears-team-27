/* eslint-disable react/destructuring-assignment */
import type { ReactElement } from 'react';
import { useContext } from 'react';

import { AuthLayout, Header } from '../../../layouts/AuthLayout';
import { TeacherNav } from '../../../components/dashboard/navs';
import { AuthContext } from '../../../store/auth';
import type { ITeacherCredentials } from '../../../interfaces';

const Home = () => {
  const authCtx = useContext(AuthContext);

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
    <p sx={{ variant: 'text.h3', color: 'primary', textAlign: 'center' }}>
      {/* TODO: username should be replaced with last name (e.g. Mr.Jonathan) */}
      {`Good Morning, ${(authCtx.user as ITeacherCredentials)?.username}`}
    </p>
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

export default Home;
