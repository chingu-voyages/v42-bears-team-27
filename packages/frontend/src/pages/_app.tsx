/* eslint-disable react/jsx-props-no-spreading */
import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'theme-ui';

import ErrorBoundary from 'components/common/ErrorBoundary';
import { AuthProvider } from 'store/auth';

import theme from '../theme';
import { io } from 'socket.io-client';

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);
socket.on('event - a', () => {
  console.log('event - a recieved');
});
socket.on('teacher-connected', () => {
  console.log('event teacher-connected');
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {getLayout(
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>,
        )}
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
