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
    <>
      <LandingHeader />
      <div sx={{ pt: 5, px: 2 }}>
        <div sx={{ textAlign: 'center', mb: 4 }}>
          <Image
            src={heroImg}
            alt="Boy working on school work with laptop and headphones"
            width={560}
            height={373}
            priority
            sx={{
              boxShadow: '12px 12px 0px 0px #30475Ebb',
            }}
          />
        </div>
        <h2
          sx={{
            variant: 'text.h3',
            mx: 'auto',
            color: 'primary',
            textAlign: 'center',
          }}
        >
          An All-In-One Inclusive Learning Platform Built For Both Students and
          Teachers
        </h2>
      </div>
    </>
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
