import type { ReactElement } from 'react';
import { useContext } from 'react';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import { AuthContext } from 'src/store/auth';
import type { NextPageWithLayout } from '../../_app';

const Learn: NextPageWithLayout = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx) {
    return <Loader>Loading Dashboard...</Loader>;
  }

  return <div>Learn</div>;
};

Learn.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Learn"
      description="A learning hub where you can access lessons and exercises"
    >
      {page}
    </AuthLayout>
  );
};

export default Learn;
