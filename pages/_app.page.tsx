import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Web3 Discovery</title>
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/fonts/Archivo_Expanded-Black.ttf"
          as="font"
          crossOrigin="true"
        />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
