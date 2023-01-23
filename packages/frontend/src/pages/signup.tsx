import type { ReactElement } from 'react';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import Layout from 'layouts/Layout';
import { TeacherSignUpForm } from 'components/signup/forms';
import type { IUserData } from 'interfaces';
import { AuthContext } from 'store/auth';

const Signup = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authCtx?.isLoggedIn) {
      router.replace(`/${(authCtx.user as IUserData).role}/dashboard/home`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx?.isLoggedIn, router]);

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
      <TeacherSignUpForm />
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
