/* eslint-disable import/no-extraneous-dependencies */
import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';

import theme from 'src/theme';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
