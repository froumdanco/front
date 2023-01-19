
import { url } from '../../data/config'
import { HeaderofSite } from '../../component/template'
import { GroupDetailList } from '../../component/listofgroup';
import React, { useState, useEffect } from 'react';
import { hasCookie } from 'cookies-next';
import { AnSection, SliderSites } from '../../component/qa';
import styles from '../../styles/Home.module.css'
import Head from 'next/head';
import axios from 'axios';
export default function ShowQuistion({ data, id }) {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    return (
        <div className={` ${styles.bgwhite} `}>
            <Head>
                <title>{data.message.name}</title>
                <meta name="description" content={data.message.description} />
            </Head>
            <div className='container'>
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li>
                            <a href="/">
                                <span class="icon is-small">
                                    <i class="fas fa-home" aria-hidden="true"></i>
                                </span>
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href={`/group/${data.message.toGroup.id}`}>
                                <span class="icon is-small">
                                    <i class="fas fa-home" aria-hidden="true"></i>
                                </span>
                                <span>{data.message.toGroup.name}</span>
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

                <div className={`  p-3`} >
                    {domLoaded && (
                        <header className={`card-header ${styles.topheader2} `} color='has-text-black'>
                            <p className={`card-header-title`}>
                                <div className={` ${styles.hastextwhite} `}>{data.message.name}</div>
                            </p>
                            <div className='p-2'>
                                <small className={` ${styles.hastextwhite} `}>{data.message.description}</small>
                            </div>
                        </header>
                    )}
                    <div className='mt-4 container'>
                        {domLoaded && (

                            <section className=''>
                                {hasCookie('_token') == true ?
                                    <section >
                                        <a href={`/newquiz/${id}`} className='button is-small is-primary'>New Question</a>
                                    </section>
                                    :
                                    <section >
                                        <a href={`/login`} className='button is-small is-danger'>for new  question Login or Regsiter</a>
                                    </section>

                                }
                            </section>
                        )}
                    </div>

                </div>
                {data.answer.docs.map((item, index) =>

                    <div className='contianer' >

                        <SliderSites data={item}> </SliderSites>
                    </div>

                )}
                <div className='p-4  '>
                    <nav class="pagination is-right" role="navigation" aria-label="pagination">
                        {data.answer.hasPrevPage == true &&

                            <a href={`/froum/${id}?page=${data.answer.prevPage}`} class="pagination-previous">Previous</a>
                        }
                        {data.answer.hasNextPage == true &&
                            <a href={`/froum/${id}?page=${data.answer.nextPage}`} class="pagination-next">Next page</a>

                        }
                        <ul class="pagination-list">

                            {Array.from(Array(data.answer.totalPages), (e, i) => {
                                return <li ><a class="pagination-link" href={`/froum/${id}?page=${i + 1}`} aria-label={`Goto page ${i + 1}`} >{i + 1}</a></li>

                            })}
                        </ul>
                    </nav>
                </div>
            </div>

            <hr />
        </div>

    )
}
export const getServerSideProps = async (context) => {
    let page = context.query != null ? context.query.page : '1'
    const res = await fetch(`${url}/v1/fsubject/${context.params.id}?page=${page}`);
    const data = await res.json()
    console.log(data);
    return {
        props: {
            data,
            id: context.params.id

        }
    };
}