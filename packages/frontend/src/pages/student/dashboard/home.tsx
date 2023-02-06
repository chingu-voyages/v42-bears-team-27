import type { ReactElement } from 'react';
import { useContext } from 'react';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import { AuthContext } from 'src/store/auth';
import type { NextPageWithLayout } from '../../_app';

const Home: NextPageWithLayout = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx) {
    return <Loader>Loading Dashboard...</Loader>;
  }

  return <div>Home</div>;
};

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
