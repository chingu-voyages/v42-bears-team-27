/* eslint-disable react/jsx-props-no-spreading */
import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'theme-ui';

import ErrorBoundary from 'src/components/common/ErrorBoundary';
import { AuthProvider } from 'src/store/auth';
import { SocketProvider } from 'src/store/socket';
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
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <AuthProvider>
          {getLayout(
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>,
          )}
        </AuthProvider>
      </SocketProvider>
    </ThemeProvider>
  );
};

export default App;
