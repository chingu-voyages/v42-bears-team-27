import type { ReactElement } from 'react';
import { useContext } from 'react';

import AuthLayout from 'src/layouts/AuthLayout';
import Loader from 'src/components/common/Loader';
import { AuthContext } from 'src/store/auth';
import type { NextPageWithLayout } from '../../_app';

const Profile: NextPageWithLayout = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx) {
    return <Loader>Loading Dashboard...</Loader>;
  }

  return <div>Profile</div>;
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Profile"
      description="An overview of your stats as a student in your classroom"
    >
      {page}
    </AuthLayout>
  );
};

export default Profile;
