import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import axios from 'axios';
import { url } from '../data/config'
import React from 'react'
import { ShowErrors } from "../component/systemjs";
import { setCookie, hasCookie } from 'cookies-next';

export default function foregetpassword() {
    const router = useRouter()
    let checklogin = hasCookie('_token');
    if (checklogin == true) {

        router.push('/profile', { shallow: true })

    }
    const [errorlist, setPost] = React.useState(null);

    const { Controller, register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post(`${url}/v1/forgetpassword`, data).then(async function (res, req) {
            router.push(`/acceptcode?email=${data.email}`);
        }).catch((error) => {
            setPost(error.response.data);
        });

    };
    return (

        <div classNameName={` container  mt-5`}>
            <section className="hero is-secondry is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                <form onSubmit={handleSubmit(onSubmit)} className="box">
                                    <h1>Forget Password </h1>
                                    <hr />
                                    <p>Please enter your email to recovery password</p>
                                    <div className="field">
                                        <label for="" className="label">Email *</label>
                                        <div className="control ">

                                            <input
                                                {...register("email", { required: "Email  is required" }, { default: "" })}
                                                type="email"
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

export async function getServerSideProps() {
    let checklogin = hasCookie('_token'); // => true
    if (checklogin == true) {
        router.push('/');
    }
    return {
        props: {
            check: checklogin,

        }
    }

}