import type { ReactElement } from 'react';
import Image from 'next/image';

import Layout from '../layouts/Layout';

import heroImg from '../../public/hero.jpg';

const Home = () => (
  <div sx={{ pt: 5, px: 2 }}>
    <div sx={{ textAlign: 'center', mb: 4 }}>
      <Image
        src={heroImg}
        alt="Boy working on school work with laptop and headphones"
        width={560}
        height={352}
      />
    </div>
    <h2
      sx={{
        variant: 'text.h3',
        width: 720,
        mx: 'auto',
        color: 'primary',
        textAlign: 'center',
      }}
    >
      An All-In-One Inclusive Learning Platform Built For Both Students and
      Teachers
    </h2>
  </div>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="RemoteClass"
      description="An all-in-one inclusive learning platform built for both students and teachers"
    >
      {page}
    </Layout>
  );
};

export default Home;
