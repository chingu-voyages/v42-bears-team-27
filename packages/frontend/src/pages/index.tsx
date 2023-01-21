import type { ReactElement } from 'react';

import Layout from '../layouts/Layout';
import TeacherSignUp from '../components/teacher/forms/sign-up';

const Home = () => (
  <div>
    <TeacherSignUp />
  </div>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="RemoteClass">{page}</Layout>;
};

export default Home;
