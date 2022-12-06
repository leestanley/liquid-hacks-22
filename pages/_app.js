import React from 'react';
import { Kanit } from '@next/font/google';
import { UserContext } from '../contexts/UserContext';
import 'regenerator-runtime';

import '../styles/globals.css';

const kanit = Kanit({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }) {
  const [user, setUser] = React.useState({
    name: '',
    level: '',
    rank: '',
    image: '',
    region: 'NA',
    overallTilt: 0,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main className={kanit.className}>
        <Component {...pageProps} />
      </main>
    </UserContext.Provider>
  )
}

export default MyApp;
