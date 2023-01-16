import Head from 'next/head'
import Image from 'next/image'
import { HeaderofSite } from '../component/template'
import styles from '../styles/Home.module.css'
import { MyGroup } from '../component/listofgroup'
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div >
      <Head>
        <title>Danco Form</title>
        <meta name="description" content="danco froum" />
    </Head>

       <div className='container' >
       <>
      {domLoaded && (
        <MyGroup></MyGroup>
    
      )}
      </>
       </div>
  
    </div>
  )
}
