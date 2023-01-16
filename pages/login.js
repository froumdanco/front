import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import axios from 'axios';
import { url } from '../data/config'
import React from 'react'
import { ShowErrors } from "../component/systemjs";
import { setCookie, hasCookie } from 'cookies-next';

var cookie = require('cookie');

export default function Regsiter({ check }) {

    const router = useRouter()
    let checklogin = hasCookie('_token');
    if (checklogin == true) {

        router.push('/profile', { shallow: true })

    }
    const [errorlist, setPost] = React.useState(null);

    const { Controller, register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post(`${url}/v1/login`, data).then(async function (res, req) {
            const sessionUser = { token: res.data.token }
            console.log(res.data.token)
            setCookie('_token', res.data.token);

            router.push('/profile')


        }).catch((error) => {
            //  that.error=error.response.data.message;
            //setPost(error.response.data);

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
                                    <div className="field">
                                        <label for="" className="label">Email *</label>
                                        <div className="control has-icons-left">

                                            <input
                                                {...register("email", { required: "Email  is required" }, { default: "" })}
                                                type="email"
                                                class="input" />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>



                                    <div className="field">
                                        <label for="" className="label">Password</label>
                                        <div className="control has-icons-left">
                                            <input
                                                {...register("password", { default: "" })}
                                                type="password"

                                                class="input" />                                            <span className="icon is-small is-left">
                                                <i className="fa fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>


                                    <div className="field">
                                        <button className="button m-2 is-success">
                                            Login
                                        </button>
                                        <a href="/register" className="button m-2 is-danger">
                                            Regsiter
                                        </a>
                                        <hr />
                                        <small><a href="forget">Password Recovery</a></small>
                                    </div>
                                    <ShowErrors data={errorlist}></ShowErrors>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
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