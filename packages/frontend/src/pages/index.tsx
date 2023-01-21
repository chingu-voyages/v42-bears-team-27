import type { ReactElement } from 'react';

import Layout from '../layouts/Layout';
import TeacherLogin from 'src/components/Login/TeacherLogin';

const Home = () => (
  <div>
    <TeacherLogin>children</TeacherLogin>
  </div>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="RemoteClass">{page}</Layout>;
};

export default Home;
