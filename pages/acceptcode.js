import { setCookie, hasCookie } from 'cookies-next';
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import axios from 'axios';
import { url } from '../data/config'
import React from 'react'

export default function AcceptCode({ email, code }) {
    const router = useRouter()
    let checklogin = hasCookie('_token');
    if (checklogin == true) {

        router.push('/profile', { shallow: true })

    }
    const [errorlist, setPost] = React.useState(null);

    const { Controller, register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.put(`${url}/v1/forgetpassword/${data.email}`, data).then(async function (res, req) {


            router.push(`/login`);


        }).catch((error) => {
            setPost(error.response.data);

            console.log(error);
        });
        console.log(data);
    };
    return (

        <div classNameName={` container  mt-5`}>
            <section className="hero is-secondry is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                <form onSubmit={handleSubmit(onSubmit)} className="box">
                                    <h1>Enter Confirm Code</h1>
                                    <hr />
                                    <div className="field">
                                        <label for="" className="label">Email *</label>
                                        <div className="control ">

                                            <input
                                                {...register("email", { required: "Email  is required", value: email }, { default: email })}
                                                type="email"
                                                class="input" />
                                          
                                        </div>
                                        <label for="" className="label">Recovery Code *</label>

                                        <div className="control ">

                                            <input
                                                {...register("code", { required: "Code  is required", value: code }, { default: email })}
                                              
                                                class="input" />
                                     
                                        </div>
                                        <label for="" className="label">New Password *</label>

                                        <div className="control ">

                                            <input
                                                {...register("password", { type: 'password', required: "Password  is required" }, { default: email })}
                                                type="password"
                                                class="input" />
                                          
                                        </div>
                                        <label for="" className="label">Confrim new Password *</label>

                                        <div className="control ">

                                            <input
                                                {...register("confrimpassword", { required: "Confrim Passowrd  is required" }, { default: email })}
                                                type="password"
                                                class="input" />
                                          
                                        </div>
                                        <div className=" is-full m-2">
                                            <button type="submit" className="button  is-success">
                                                Send Recovery Code
                                            </button>
                                        </div>
                                        <div className=" is-full m-2">
                                            <button className="button  is-full is-primary">
                                                I have code
                                            </button>
                                        </div>

                                    </div>


                                    {
                                        errorlist != null &&

                                        <>
                                            <article class="message is-danger">
                                                <div class="message-body">
                                                    {errorlist.message}
                                                </div>
                                            </article>
                                        </>
                                    }

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export const getServerSideProps = async (context) => {
    console.log(context.query.email);
    let checklogin = hasCookie('_token'); // => true
    if (checklogin == true) {
        router.push('/');
    }
    return {
        props: {
            email: context.query.email != undefined ? context.query.email : null,
            code: context.query.code != undefined ? context.query.code : null

        }
    };
}