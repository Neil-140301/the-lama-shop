import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {

  if(typeof window === 'undefined'){
    return null
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <title>The Lama Shop | N</title>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
