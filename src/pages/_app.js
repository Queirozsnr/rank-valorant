import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const primeReactValue = {
    appendTo: 'self',
    ripple: true,
    locale: 'pt',
  };

  return (
    <PrimeReactProvider value={primeReactValue}>
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}

export default MyApp;
