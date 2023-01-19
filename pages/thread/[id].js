import { url } from '../../data/config'
import { HeaderofSite } from '../../component/template'
import React, { useState, useEffect } from 'react';
import { ReplyEditor } from '../../component/answercomponent'
import styles from '../../styles/Home.module.css';
import { useRouter } from "next/router";
import { ThumpnailAvtar } from '../../component/thumpnail';
import axios from 'axios';
import { setCookie, hasCookie, deleteCookie, getCookie } from 'cookies-next';
import Head from 'next/head'

const Swal = require('sweetalert2');
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faReply,
    faLock,
    faStar,
    faHeart,
    faQuoteLeft,
    fas
} from "@fortawesome/free-solid-svg-icons";
export default function thread({ mydata, id, pages }) {
    const router = useRouter()
    let token = getCookie('_token');

    const [data, setMydata] = useState(mydata);
    const [key, setKey] = useState(1);
    const [showreply, setReply] = useState(false);

    const [domLoaded, setDomLoaded] = useState(false);
    let checklogin = hasCookie('_token');
    const [quate, setquate] = useState('');
    const ReloadPage = async (e) => {
        setReply(false);
        await axios.get(`${url}/v1/fanswer/${id}?page=1`).then(function (res) {
            setMydata(res.data);
            router.replace(router.asPath);

        }).catch((error) => {
            //  that.error=error.response.data.message;
            //setPost(error.response.data);

        });;
    }
    const ReloadPage2 = async (e) => {
        setReply(false);
        await axios.get(`${url}/v1/fanswer/${id}?page=${pages}`).then(function (res) {
            setMydata(res.data);
            //router.replace(router.asPath);

        }).catch((error) => {
            //  that.error=error.response.data.message;
            //setPost(error.response.data);

        });;
    }
    const liked = async (file) => {
        console.log(`${url}/v1/user/like`);
        await axios.post(`${url}/v1/user/like`, {
            parent: file
        },
            {

                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(function (res) {
            ReloadPage2();


        }).catch((error) => {

            Swal.fire('please login user');


        });;
    };
    useEffect(() => {
        setDomLoaded(true);
    }, []);
    return (
        <div className={styles.backwhite}>
            <Head>
                <title>{data.message.q.toSubject.toGroup.name}</title>
                <meta name="description" content="danco froum" />
            </Head>
            <div className='container '>
                <div className='p-4'>
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
                                <a href={`/group/${data.message.q.toSubject.toGroup.id}`}>
                                    <span class="icon is-small">
                                        <i class="fas fa-home" aria-hidden="true"></i>
                                    </span>
                                    <span>{data.message.q.toSubject.toGroup.name}</span>
                                </a>
                            </li>
                            <li>
                                <a href={`/froum/${data.message.q.toSubject.id}`}>
                                    <span class="icon is-small">
                                        <i class="fas fa-home" aria-hidden="true"></i>
                                    </span>
                                    <span>{data.message.q.toSubject.name}</span>
                                </a>
                            </li>
                            <li class="is-active">
                                <a href="#">
                                    <span class="icon is-small">
                                        <i class="fas fa-thumbs-up" aria-hidden="true"></i>
                                    </span>
                                    <span>{data.message.q.title}</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <article class=" is-info mb-2">
                        <div class="box">
                            <div className="columns">
                                <div className="column is-1 is-centered">
                                    <ThumpnailAvtar avatar={data.message.q.toUser}></ThumpnailAvtar>

                                </div>
                                <div className="column  ">

                                    <h1 class="title">{data.message.q.title}</h1>
                                    <p>{data.message.q.description}</p>
                                    <hr />
                                    <div className="field">
                                        {domLoaded && (

                                            checklogin == true ?
                                                <a className="button m-3   is-small "
                                                    onClick={(e) => {
                                                        let item = key + 1;
                                                        setReply(true);
                                                        setKey(item);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faReply} />  Replay
                                                </a>
                                                : <a className="button m-3 is-danger  is-small " href='/login'>
                                                    <FontAwesomeIcon icon={faLock} /> <p className='p-3'> Login for Replay</p>
                                                </a>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>

                    </article>
                </div>

                <div className='container'>
                    {/* <pre> {JSON.stringify(data, null, 2)}</pre> */}
                    {showreply == true &&
                        <ReplyEditor ReloadPage={ReloadPage} key={key} text={''} aoute={quate} parent={data.message.q.id}></ReplyEditor>
                    }
                </div>
                <div >
                    {
                        data.message.a.docs.map((d, index) => (
                            <article class={` mb-2 ${styles.backdanesh}`}>
                                <div class=" p-4">
                                    <div className="columns">
                                        <div className={`column is-1 is-centered ${styles.bluesection} `}>
                                            <figure class="image is-64x64">
                                                {data.message.q.toUser.avatar != null && <img class="is-rounded" src={d.toUser.avatar} />}
                                            </figure>
                                            <div className={styles.avatarname}>{` ${d.toUser.name} ${d.toUser.lastname}  `} </div>

                                        </div>
                                        <div className={`column  ${styles.textblack}  `}>
                                            {domLoaded && (
                                                <p dangerouslySetInnerHTML={{ __html: d.text }}></p>
                                            )}
                                            <hr />
                                            <div className="field">
                                                {/* {domLoaded && (

                                                    checklogin == true ?
                                                        <button className="button is-small " size="small" >
                                                            <FontAwesomeIcon icon={faQuoteLeft} />  Qoute
                                                        </button>
                                                        : <button size="small" className="button is-small ">
                                                            <FontAwesomeIcon icon={faLock} /> <p className={`p-3 `}> Login</p>
                                                        </button>
                                                )} */}
                                                <a size="small" onClick={() => liked(d.id)} className="button is-small  ml-3 ">
                                                    <FontAwesomeIcon icon={faHeart} />  <p className=' p-3'> {d.toLike}  Like </p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </article>
                        ))}
                </div>
                <div className='p-4' dir='ltr'>
                    <nav class="pagination is-right" role="navigation" aria-label="pagination">
                        {data.message.a.hasPrevPage == true &&

                            <a href={`/thread/${id}?page=${data.message.a.prevPage}`} class="pagination-previous">Previous</a>
                        }
                        {data.message.a.hasNextPage == true &&
                            <a href={`/thread/${id}?page=${data.message.a.nextPage}`} class="pagination-next">Next page</a>

                        }
                        <ul class="pagination-list">

                            {Array.from(Array(data.message.a.totalPages), (e, i) => {
                                return <li className={`  `} ><a className="pagination-link is-primary" href={`/thread/${id}?page=${i + 1}`} aria-label={`Goto page ${i + 1}`} >{i + 1}</a></li>

                            })}
                        </ul>
                    </nav>
                </div>
            </div>


        </div>
    )
}
export const getServerSideProps = async (context) => {
    let page = context.query != null ? context.query.page : '1';
    const res = await fetch(`${url}/v1/fanswer/${context.params.id}?page=${page}`)
    const data = await res.json()
    return {
        props: {
            mydata: data,
            id: context.params.id,
            pages: page == null ? 1 : page


        }
    };
}