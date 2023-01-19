
import styles from '../styles/Home.module.css'
import { hasCookie } from 'cookies-next';
import { faL } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../data/config';
export const HeaderofSite = () => {
    const [listoftgroup, SetGroop] = React.useState(null);
    const [itemshow, SetItem] = React.useState(false);

    useEffect(() => {
        // let data = await axios.get(`${url}/v1/fgroup`);
        axios.get(`${url}/v1/fgroup`).then(function (res) {
            SetGroop(res.data);
        });

    }, []);
    let lgoincheck = hasCookie('_token');
    return (
        <div>
            <div className={styles.headerofwebsite} >
                <div className="columns">
                    <div className={`column ${styles.wright}`}>
                        <img src='/logo2.png' className={styles.treebook} />
                    </div>
                    <div className="column">
                    </div>

                </div>
            </div>
            <nav className={`navbar ${styles.borderos}`} role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <div className={` ${styles.whitetext}`}>
                            <h4>DANCO COIN </h4>
                        </div>
                    </a>
                    {/* itemshow, SetItem */}
                    <a role="button" onClick={() => SetItem(itemshow == true ? false : true)} className="navbar-burger" aria-label="menu" aria-expanded="true" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>

                </div>


                <div id="navbarBasicExample" className={` navbar-menu ${styles.whitetext}`} >
                    <a class="navbar-item" href='/'>
                        Home
                    </a>

                    {listoftgroup != null &&
                        listoftgroup.message.map((item, key) => {

                            return (<div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link"> {item.name} </a>

                                <div className="navbar-dropdown">
                                    {item.tosubject.map((items, keys) => {
                                        return (<a href={`/froum/${items.id}`} className={`navbar-item ${styles.colorblack}`} > {items.name} </a>)

                                    })}


                                </div>
                            </div>)
                        })}


                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {
                                    lgoincheck == false ?
                                        <section>
                                            <a href='/register' className="button is-danger">
                                                <strong>Sign up</strong>
                                            </a>
                                            <a href='/login' className="button is-primary">
                                                <strong>Login</strong>
                                            </a>
                                        </section>
                                        :
                                        <a href='/profile' className="button is-light">
                                            Profile
                                        </a>
                                }



                            </div>
                        </div>
                    </div>
                </div>

            </nav>
            <hr />
            <div>
                {itemshow == true &&
                    <>
                        <ul className=''>
                        <div className="navbar-item "> <a class="button navbar-item" href='/'>
                                Home
                            </a></div>
                            {listoftgroup != null &&
                                listoftgroup.message.map((item, key) => {

                                    return (<div className="navbar-item ">

                                        <a className="button navbar-item" href={`/group/${item.id}`}> {item.name} </a>

                                    </div>)
                                })}

                        </ul>
                        <div className="buttons m-4">
                            {
                                lgoincheck == false ?
                                    <section>
                                        <a href='/register' className="button is-danger">
                                            <strong>Sign up</strong>
                                        </a>
                                        <a href='/login' className="button is-primary">
                                            <strong>Login</strong>
                                        </a>
                                    </section>
                                    :
                                    <a href='/profile' className="button is-light">
                                        Profile
                                    </a>
                            }



                        </div>
                    </>
                }

            </div>
        </div>

    )
}