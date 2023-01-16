
import { hasCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import { url } from '../data/config'
import styles from '../styles/Home.module.css';

export function ThumpnailAvtar({ avatar }) {
    const [domLoaded, setDomLoaded] = useState(false);

    return (
        <>
            <figure class="image is-64x64">
                {avatar.avatar != null && <img class="is-rounded" src={avatar.avatar} />}
            </figure>
            <div className={styles.avatarname}>{` ${avatar.name} ${avatar.lastname}  `} </div>
            <div className={styles.avatarname}><strong> { avatar.staff &&  'Official Staff' } </strong></div>


        </>
    )
}