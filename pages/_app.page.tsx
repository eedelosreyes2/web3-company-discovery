import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <SessionProvider session={pageProps.session}>
            <Head>
                <title>Discover Web3 Companies</title>
                <link rel="shortcut icon" href="/logo.png" />
                <link
                    rel="preload"
                    href="/fonts/Archivo_Expanded-Black.ttf"
                    as="font"
                    crossOrigin=""
                />
            </Head>
            <Component {...pageProps} />
        </SessionProvider>
    );
};

export default App;
