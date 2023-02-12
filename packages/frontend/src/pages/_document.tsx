import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en">
    <Head />
    <body
      sx={{
        '::-webkit-scrollbar': {
          width: 5,
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
      }}
    >
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
