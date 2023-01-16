import '../styles/globals.css'
import '../styles/bluma.scss'
import { HeaderofSite } from '../component/template'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return <>
  <Head>
  <link rel="shortcut icon" type='image/png' href="/logo.png" />

  </Head>
    {domLoaded && (
        <HeaderofSite></HeaderofSite>
    )}
    <Component {...pageProps} />
    <footer class="footer">
  <div className="content has-text-centered">
    <p>
      <span>copyright  2023 &copy; Danco Froum </span> by <a href="https://dancocoin.io">DANCO</a>. 
      
    </p>
  </div>
</footer>
  </>
}

export default MyApp
