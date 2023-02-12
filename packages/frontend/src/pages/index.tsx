import type { ReactElement } from 'react';
import { useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from 'src/layouts/Layout';
import LandingHeader from 'src/components/landing/LandingHeader';
import { AuthContext } from 'src/store/auth';
import heroImg from 'public/hero.jpg';
import type { NextPageWithLayout } from './_app';

const Landing: NextPageWithLayout = () => {
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
        alignContent: 'center',
        justifyItems: 'center',
        minHeight: '100vh',
      }}
    >
      <LandingHeader />
      <div
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: '3rem',
        }}
      >
        <div
          sx={{
            aspectRatio: '5 / 3',
            position: 'relative',
            mb: '3rem',
            color: 'primary',
            boxShadow: '12px 12px 0 0 currentColor',
            width: ['22rem', '30rem', '38rem', '44rem'],
            mx: 'auto',
          }}
        >
          <Image
            sx={{
              maxWidth: '100%',
              height: 'auto',
            }}
            src={heroImg}
            alt="Boy working on school work with laptop and headphones"
            fill
            priority
          />
        </div>
        <h2
          sx={{
            variant: 'text.h3',
            maxWidth: '35ch',
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          An All-In-One Inclusive Learning Platform Built For Both Students and
          Teachers
        </h2>
      </div>
    </div>
  );
};

Landing.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="RemoteClass"
      description="An all-in-one inclusive learning platform built for both students and teachers"
    >
      {page}
    </Layout>
  );
};

export default Landing;
