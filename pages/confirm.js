import { setCookie, hasCookie, deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { url } from '../data/config';
import React from 'react'
import { useForm, Controller } from "react-hook-form";

export default function confirmfile({ }) {
    const [domLoaded, setDomLoaded] = useState(false);
    const { Controller, register, handleSubmit, watch, formState: { errors } } = useForm();
    let token = getCookie('_token');

    let [data, setData] = useState(null);
    let [showcodebox, setShowCode] = useState(false);

    const router = useRouter()
    let checklogin = hasCookie('_token');
    const [errorlist, setPost] = React.useState(null);
    const [changemode, setMode] = React.useState(false);
    useEffect(() => {

        checklogin != true && router.push('/', { shallow: true });
        axios.get(`${url}/v1/user/profile`, {

            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(async function (res, req) {
            setData(res.data);
        }).catch(function (error) {

         
            // router.push('/notacess')
        });


    }, []);
    const sendrequest = data => {


        axios.post(`${url}/v1/confrimpassword`, data,{

            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(async function (res, req) {
            // router.push(`/con`);
            setMode(true);
            setPost(null);
        }).catch((error) => {
            setPost(error.response);
        });

    };
    const onSubmit = data => {
        axios.put(`${url}/v1/confrimpassword/check`,data,{

            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(async function (res, req) {
            router.push(`/profile`);
        }).catch((error) => {
            setPost(error.response);
        });

    };
    return (
        <>
            <div className={` ${styles.backwhite} `}>
                <section className=" container hero is-secondry ">
                    <div className="hero-body">
                        {data != null &&

                            <div className='has-text-centered'>
                                {changemode == false ?
                                    <>
                                        <p className='m-3'>Send request confrim code</p>

                                        <a onClick={() => sendrequest({ email: data.message.email })} className='button is-primary'>Send Confirm Code to {data.message.email}</a>
                                        <div className='mt-4'>
                                            <a onClick={ () => setMode(true)}  className='button is-primary' >I have cofrim code</a>
                                        </div>
                                    </>
                                    :
                                    <div className={`container ${styles.withlimited}`}>

                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="field">
                                                <label for="" className="label">enter confirm code *</label>
                                                <small>please check your inbox mail or spam</small>
                                                <div className="control ">
                                                    <input
                                                        {...register("code", { required: "code  is required", }, { default: "" })}
                                                        type="text"
                                                        placeholder='enter confrim code'
                                                        class="input" />
                                                       
                                                        <button  type='submit' className='button  mt-5 is-primary'>Send Code</button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                }
                            </div>

                        }
                    </div>
                    {
                        errorlist!=null && 
                        <>
                            <article class="message is-danger">
                                                <div class="message-body">
                                                    {errorlist.data.message}
                                                </div>
                                            </article>
                        </>
                    }

                    <pre>{ JSON.stringify(errorlist,null,2) }</pre>

                </section>

            </div>
        </>
    )
}

