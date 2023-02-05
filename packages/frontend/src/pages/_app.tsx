/* eslint-disable react/jsx-props-no-spreading */
import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'theme-ui';
import NextProgress from 'next-progress';

import ErrorBoundary from 'src/components/common/ErrorBoundary';
import { AuthProvider } from 'src/store/auth';
import theme from '../theme';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <NextProgress delay={300} options={{ showSpinner: false }} />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          {getLayout(
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>,
          )}
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
