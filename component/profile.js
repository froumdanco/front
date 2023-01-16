
import { setCookie, getCookie } from 'cookies-next';
import axios from 'axios';
import { url } from '../data/config'
import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import styles from '../styles/Home.module.css';
const Swal = require('sweetalert2');
import { useRouter } from "next/router";
import ReactDOM from "react-dom";

import SweetAlert2 from 'react-sweetalert2';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

export function ChangeAvatqr({ }) {
    return (
        <div>gfgf</div>
    )
}
export function AvatarImage({ data }) {
    const router = useRouter();
    const [cropsuccess, setSuccess] = useState(false);
    const [finalimage, setFinalImage] = useState('');
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [result, setResult] = useState(null);

    const [swalProps, setSwalProps] = useState({});
    let [image, setImage] = useState(0);
    const [completedCrop, setCompletedCrop] = useState();

    const { Controller, register, handleSubmit, watch, formState: { errors } } = useForm();
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const uoloadimage = async () => {
        let checklogin = getCookie('_token');
        let idata = {
            image: finalimage
        };
        axios.post(`${url}/v1/user/profile/changprofile`, idata, {

            headers: {

                Authorization: 'Bearer ' + checklogin
            },
        }).then(function (res) {

        });
        // console.log(response);
    }
    const onSubmit2 = async data => {
        const file = data.avatar[0];
        const base64 = await convertBase64(file);
        setImage(base64);
        router.replace(router.asPath);

    }
    const setfinalImage = async data => {
        const canvas = document.createElement("canvas");
        var images = document.getElementById('slam');
        images.src = image;
        const scaleX = images.naturalWidth / images.width;
        const scaleY = images.naturalHeight / images.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        canvas.x = crop.y;
        canvas.y = crop.x;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            images,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        const base64Image = canvas.toDataURL("image/jpeg", 1);
        setFinalImage(base64Image);
        setSuccess(true);
        router.replace(router.asPath);
    }

    return (
        <div className='is-centered columns '>
            <div>

                <figure className={`image  is-128x128 ${styles.iamgeavatarbox} `}>
                    {data.message.avatar == null ?
                        <img

                            className="is-rounded" src="/person.jpg" />
                        :
                        <div>
                            <img

                                className="is-rounded" src={data.message.avatar} />

                        </div>
                    }
                    <div onClick={(e) => {
                        setSwalProps({
                            show: true,
                            title: 'Change Avatar',
                            showConfirmButton: true,


                        });
                    }} className={styles.changeavatartext}>Change Avatar</div>

                </figure>
                <SweetAlert2 {...swalProps}>
                    <div>
                        {image != '' ?
                            <div>

                                <ReactCrop
                                    style={{ display: cropsuccess == false ? 'block' : 'none' }}

                                    onComplete={(c) => setCompletedCrop(c)}
                                    crop={crop} onChange={c => setCrop(c)}>

                                    <img src={image} id="slam" />
                                </ReactCrop>
                                <div className='is-centered'>
                                    <img
                                        style={{ display: cropsuccess == true ? 'block' : 'none' }}
                                        src={finalimage} id="slam2" />
                                </div>

                                <button
                                    style={{ display: cropsuccess == false ? 'block' : 'none' }}
                                    className='button m-2 is-danger'
                                    type='button' onClick={(e) => {
                                        setfinalImage(e);
                                    }} >Crop</button>
                                <button
                                    onClick={(e) => {
                                        setSuccess(false)
                                    }}
                                    className='button m-2 is-success'

                                >Back</button>
                                <button
                                    onClick={(e) => {
                                        uoloadimage();
                                    }}
                                    className='button m-2 is-success'
                                >Upload Image</button>
                            </div>
                            :

                            <form onSubmit={handleSubmit(onSubmit2)} >
                                <div className="file is-centered">
                                    <label className="file-label">



                                        <input

                                            accept="image/png, image/jpg,image image/jpeg"
                                            className="file-input"
                                            type="file"
                                            {...register("avatar", { required: "Name  is required", value: data.message.lastname }, {})}

                                        />

                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <i className="fas fa-upload"></i>
                                            </span>
                                            <span className="file-label">
                                                Choose a file…
                                            </span>
                                        </span>
                                    </label>
                                </div>

                                <div className="field">

                                    <button className="button m-2 is-success">
                                        Change Profile
                                    </button>

                                </div>
                            </form>
                        }
                    </div>
                </SweetAlert2>
            </div>

        </div>
    )
}
export function ProfileEdit() {
    let checklogin = getCookie('_token');
    const router = useRouter()

    let [data, setData] = useState(0);
    const { Controller, register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        axios.get(`${url}/v1/user/profile`, {

            headers: {
                Authorization: 'Bearer ' + checklogin
            }
        }).then(async function (res, req) {
            setData(res.data);
        }).catch(function (error) {
            router.push('/notacess')
        });
    }, []);
    const onSubmit = data => {
        axios.put(`${url}/v1/user/profile/1`, data, {
            headers: {
                Authorization: 'Bearer ' + checklogin

            }
        }).then(function (res, req) {
            Swal.fire({
                icon: 'success',
                title: 'Your Profile Update',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(function () {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            })
        });
    }
    return (
        <div>
            <h4>Edit Profile</h4>
            <hr />
            {data != '' &&
                <div >
                    <AvatarImage data={data}></AvatarImage>

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formprofile}>
                        <div className="field ">
                            <label for="" className="label">Name *</label>
                            <div className="control has-icons-left">

                                <input
                                    {...register("name", { required: "Name  is required", value: data.message.name }, {})}

                                    className="input" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label for="" className="label">Last Name *</label>
                            <div className="control has-icons-left">

                                <input
                                    {...register("lastname", { required: "Name  is required", value: data.message.lastname }, {})}

                                    className="input" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label for="" className="label">Email *</label>
                            <div className="control has-icons-left">

                                <input
                                    readOnly
                                    {...register("email", { required: "Last Name  is required", value: data.message.email }, {})}
                                    type="email"
                                    className="input" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label for="" className="label">Slogen</label>
                            <div className="control has-icons-left">

                                <textarea

                                    {...register("solgen", { value: data.message.solgen }, {})}
                                    className="textarea" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <button type='submit' className="button m-2 is-success" >
                                Save
                            </button>
                        </div>

                    </form>
                </div>
            }

        </div>
    )

}
export function ProfileSecurity() {
    const [result, setResult] = useState(null);
    const { Controller, register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <div>
            <form>
                <div className="field">
                    <div className="control ">
                        <label for="" className="label">Current Password *</label>

                        <input
                            {...register("cpsw", { required: "Current password  is required" }, {})}
                            className="input" />

                        <label for="" className="label"> Password *</label>
                        <input
                            {...register("password", { required: "Password  is required" }, {})}
                            className="input" />
                      
                      <label for="" className="label"> Password *</label>
                        <input
                            {...register("password", { required: "Password  is required" }, {})}
                            className="input" />
                    </div>
                </div>
            </form>
        </div>

    )
}
export function ProfilePost() {
    return (
        <div>
            ProfilePost
        </div>
    )
}