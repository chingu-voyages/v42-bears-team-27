import type { ReactElement } from 'react';

import Layout from '../layouts/Layout';

const Home = () => <div>Home</div>;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="RemoteClass">{page}</Layout>;
};

export default Home;
