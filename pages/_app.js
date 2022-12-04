import '../styles/globals.css'
import { Kanit } from '@next/font/google';

const kanit = Kanit({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }) {
  return (
    <main className={kanit.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp;
