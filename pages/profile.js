import { setCookie, hasCookie, deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { faL } from "@fortawesome/free-solid-svg-icons";
import { ProfileEdit } from "../component/profile";
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { HeaderofSite } from '../component/template'
import axios from 'axios';
import { url  } from '../data/config';
let DynamicHeader = dynamic(() => import('../component/profile').then((mod) => mod.ProfileEdit), {
})
export default function getProfile() {
    const [domLoaded, setDomLoaded] = useState(false);

    let [data, setData] = useState(null);
    const router = useRouter()
    let checklogin = hasCookie('_token');
    useEffect(() => {

        checklogin != true && router.push('/', { shallow: true });
        let token = getCookie('_token');
            axios.get(`${url}/v1/user/profile`, {
    
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(async function (res, req) {
                setData(res.data);
            }).catch(function (error) {
                console.log(error);
               // router.push('/notacess')
            });
  

        }, []);


    const menuitem = [
        {
            component: 'ProfileEdit',
            name: 'Detail',
            active: true

        },
        {
            component: 'ProfileSecurity',
            name: 'Security',
            active: false,
        },
        {
            component: 'ProfilePost',
            name: 'Post',
            active: false
        }
    ];

    let [menuitems, setTab] = useState(menuitem);
    const logout = (index) => {
        deleteCookie('_token');
        router.push('/');
    }


    const changetab = (index) => {
        let newitem = menuitems;
        newitem.map((item, i) => {
            if (i == index) {
                newitem[index].active = true;

            } else {
                newitem[i].active = false;

            }
        });

        setTab(newitem);

        DynamicHeader = dynamic(() => import('../component/profile').then((mod) => mod[newitem[index].component]), {
        })
        router.replace(router.asPath);
    }

    return (
        <div >

            <div className={styles.whiteback}>
                {domLoaded && (

                    <HeaderofSite ></HeaderofSite>

                )}
             
                <div className="container">
                
                { data!=null &&   data.message.confrimemail != true && 

                
                    <div className="box message is-danger">
                        <div class="columns is-gapless ">
                            <div class="column">
                               Confirm  your Email 
                            </div>
                            <div class="column has-text-right">
                                <a href='/confirm' class="button is-danger">
                               Confirm your Email

                                </a>

                            </div>
                          
                        </div>
                    </div>
                }
                    <div className="tabs is-centered">
                        <ul>
                            {

                                menuitems.map((d, index) => (
                                    <li
                                        key={index}
                                        onClick={(e) => {
                                            changetab(index);
                                        }}
                                        className={` ${d.active == true && 'is-active'} `}
                                    >
                                        <a>
                                            {d.name}
                                        </a>
                                    </li>
                                ))
                            }
                            <li onClick={logout}>

                                <a className={styles.colorred}>
                                    Logout
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="card">
                    <div className="container">
                        <div class="content p-3">
                            <div className="container p-5">
                                <Suspense fallback={`Loading...`}>
                                    <DynamicHeader />
                                </Suspense>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
