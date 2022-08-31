import { Header } from '../src/components/Header/index'
import { ContextProvider } from '../src/Context/PostAndComments'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>

      <Header />
      <SessionProvider session={session}>
        <ContextProvider>
            <Component {...pageProps} />
        </ContextProvider>
      </SessionProvider>

    </>
  )
}

export default MyApp
