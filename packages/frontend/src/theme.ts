import { Theme } from 'theme-ui';

import '@fontsource/nunito';
import '@fontsource/roboto';

const theme: Theme = {
  fonts: {
    body: '"Nunito", sans-serif',
    heading: '"Roboto", sans-serif',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#495464',
    secondary: '#e8e8e8',
    muted: '#f4f4f2',
    gray: '#bbbfca',
    error: '#f44336',
    warning: '#ffa726',
    info: '#29b6f6',
    success: '#66bb6a',
    accent: '#664e88',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    regular: 400,
    medium: 500,
    semibold: 600,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  text: {
    label: {
      fontFamily: 'body',
      fontSize: 16,
      fontWeight: 'body',
      lineHeight: 'body',
    },
    link: {
      fontFamily: 'body',
      fontSize: 18,
      fontWeight: 'semibold',
      lineHeight: 'auto',
    },
    h1: {
      fontFamily: 'heading',
      fontSize: 48.83,
      fontWeight: 'medium',
      lineHeight: 'heading',
    },
    h2: {
      fontFamily: 'heading',
      fontSize: 39.06,
      fontWeight: 'medium',
      lineHeight: 'heading',
    },
    h3: {
      fontFamily: 'heading',
      fontSize: 31.25,
      fontWeight: 'medium',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: 'heading',
      fontSize: 21,
      fontWeight: 'medium',
      lineHeight: 1.3,
    },
  },
  buttons: {
    primary: {
      filled: {
        bg: 'primary',
        color: 'white',
        border: 'none',
        '&:hover': {
          bg: '#424c5a',
        },
      },
      outlined: {
        bg: 'white',
        color: 'primary',
        border: '2px solid currentColor ',
        '&:hover': {
          bg: '#e6e6e6',
        },
      },
    },
  },
};

export default theme;
