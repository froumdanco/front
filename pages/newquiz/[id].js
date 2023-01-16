import { url } from '../../data/config'
import { HeaderofSite } from '../../component/template'
import { GroupDetailList } from '../../component/listofgroup';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { SearchBox } from '../../component/search';
import { useForm, Controller } from "react-hook-form";

import styles from '../../styles/Home.module.css'

import axios from 'axios';
const Swal = require('sweetalert2');
import Head from 'next/head';
import { setCookie, hasCookie, deleteCookie, getCookie } from 'cookies-next';

import dynamic from 'next/dynamic'

export default function NewQuiz({ id }) {
    const router = useRouter()
    let checklogin = hasCookie('_token');
    const [myquiz, setQuize] = React.useState(false);

    useEffect(() => {

        checklogin != true && router.push('/', { shallow: true });

    })
    const onSubmit = data => {
        data.parent = id;
        axios.post(`${url}/v1/quiz`, data, {
            headers: {

                Authorization: 'Bearer ' + getCookie('_token')
            },
        }).then(async function (res, req) {
            setQuize(true);
            Swal.fire('thanks for yours quistion');

        }).catch((error) => {
            if (error.response.status == 423) {
                Swal.fire(error.response.data.message)
            };
            if (error.response.status == 422) {
                Swal.fire(error.response.data.message)
            };
        });

    }
    const [domLoaded, setDomLoaded] = useState(false);
    const { Controller, register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <div className={` ${styles.backwhite}`}>
                <Head>
                    <title>New Quistion </title>
                </Head>

            <div className='container'>
                <div className=' is-centered'>
                    {/* <div className='p-4'>
                        <h3>Please before create new question Search in community</h3>
                        <SearchBox></SearchBox>

                    </div> */}
                    <hr />

                    {myquiz == false ?
                        <div className='mt-5 container is-centered'>

                            <form onSubmit={handleSubmit(onSubmit)} className="box">
                                <div>
                                    <h4>Enter your question</h4>

                                </div>
                                <div className="field">
                                    <label for="" className="label">Title *</label>
                                    <div className="control ">

                                        <input
                                            {...register("title", { required: true }, { default: "" })}

                                            placeholder='Name'
                                            class="input" />

                                    </div>
                                </div>
                                <div className="field">
                                    <label for="" className="label">description *</label>
                                    <div className="control ">

                                        <textarea
                                            {...register("description", { required: true }, { default: "" })}
                                            type="email"
                                            placeholder='Description'
                                            class="textarea" />

                                    </div>
                                </div>
                                <div className="field">
                                    <button type='submit' className="button m-2 is-success">
                                        Send Question
                                    </button>

                                    <hr />
                                </div>

                            </form>
                        </div>
                        :
                        <div><a href={`/froum/${id}`}>

                            <button className="button m-2 is-success">
                                Back to Group
                            </button>
                        </a></div>
                    }
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async (context) => {

    return {
        props: {
            id: context.params.id

        }
    };
}