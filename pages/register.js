import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import axios from 'axios';
import { url } from '../data/config'
import React from 'react'
import { ShowErrors } from "../component/systemjs";
export default function Regsiter() {
    const router = useRouter()
    const [errorlist, setPost] = React.useState(null);

    const { Controller, register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post(`${url}/v1/register`, data).then(function (res, req) {
            router.push('/login', { shallow: true })

        }).catch((error) => {
            //  that.error=error.response.data.message;
            setPost(error.response.data);
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
                                        <div className="control ">

                                            <input
                                                {...register("email", { required: "Email  is required" }, { default: "" })}
                                                type="email"
                                                class="input" />
                                        
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label for="" className="label">Name *</label>
                                        <div className="control ">
                                            <input
                                                {...register("name", { required: "Name  is required" }, { default: "" })}

                                                class="input" />                                            <span className="icon is-small is-left">
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label for="" className="label">Last Name *</label>
                                        <div className="control ">
                                            <input
                                                {...register("lastname", { default: "" })}

                                                class="input" />                                            <span className="icon is-small is-left">
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label for="" className="label">Password</label>
                                        <div className="control ">
                                            <input
                                                {...register("password", { default: "" })}
                                                type="password"

                                                class="input" />                                            <span className="icon is-small is-left">
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label for="" className="label">Confirm Password</label>
                                        <div className="control ">
                                            <input
                                                {...register("confirm_password", { default: "", type: 'password' })}
                                                type="password"
                                                class="input" />                                            <span className="icon is-small is-left">
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <button className="button m-2 is-success">
                                            Register
                                        </button>
                                        <button className="button m-2 is-danger">
                                            I have account
                                        </button>
                                        <hr />
                                        <small>Password Recovery</small>
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