
import { url } from '../../data/config'
import { HeaderofSite } from '../../component/template'
import { GroupDetailList } from '../../component/listofgroup';
import React, { useState, useEffect } from 'react';
import Head from 'next/head'

import axios from 'axios';
export default function GroupShow({ data }) {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    return (
        <div>
            <Head>
                <title>{data.message.name}</title>
                <meta name="description" content={data.message.description} />
            </Head>
            <div className='container'>
                <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li>
                            <a href="/">
                                <span class="icon is-small">
                                    <i class="fas fa-home" aria-hidden="true"></i>
                                </span>
                                <span>Home</span>
                            </a>
                        </li>
                        <li class="is-active">
                            <a href="#">
                                <span class="icon is-small">
                                    <i class="fas fa-thumbs-up" aria-hidden="true"></i>
                                </span>
                                <span>{data.message.name}</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                {domLoaded && (

                    <GroupDetailList item={data.message}></GroupDetailList>
                )}
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const res = await fetch(`${url}/v1/fgroup/${context.params.id}`)
    console.log(`${url}/v1/fgroup/${context.params.id}`)
    const data = await res.json()
    return {
        props: {
            data

        }
    };
}