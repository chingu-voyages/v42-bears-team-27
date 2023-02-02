import type { ReactElement } from 'react';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import Layout from 'src/layouts/Layout';
import SignupTeacher from 'src/components/signup/SignupTeacher';
import { AuthContext } from 'src/store/auth';
import type { NextPageWithLayout } from './_app';

const Signup: NextPageWithLayout = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authCtx?.isLoggedIn) {
      router.replace(`/${authCtx.role}/dashboard/home`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx?.isLoggedIn]);

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
      <h1 sx={{ variant: 'text.h2', mt: 0, fontWeight: 'medium' }}>
        Sign Up For Teachers
      </h1>
      <SignupTeacher />
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
