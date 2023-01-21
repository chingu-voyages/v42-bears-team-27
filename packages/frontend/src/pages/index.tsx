/* eslint-disable react/destructuring-assignment */
import type { ReactElement } from 'react';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Layout from '../layouts/Layout';
import MainHeader from '../components/home/MainHeader';
import type { IUserData } from '../interfaces';
import { AuthContext } from '../store/auth';

import heroImg from '../../public/hero.jpg';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authCtx?.isLoggedIn) {
      router.replace(`/${(authCtx.user as IUserData).role}/dashboard/home`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx?.isLoggedIn, router]);

  return (
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
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="RemoteClass"
      description="An all-in-one inclusive learning platform built for both students and teachers"
    >
      <MainHeader />
      {page}
    </Layout>
  );
};

export default Home;
