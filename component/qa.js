import styles from '../styles/Home.module.css';
import FontAwesomeIcon from 'react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
export function AnSection({ data }) {
    return (
        <>
            <div>
                <div className={`card p-5`}>
                    <div className={'columns'}>
                        <div className={'column'}>
                            <img src={data.toUser.avatar} />
                            <div>
                                <div className={'badge'}>
                                    {data.toUser.name} {data.toUser.lastname}
                                </div>

                            </div>
                        </div>
                        <div className={'column'}>
                            <div>
                                <h4>{data.title}</h4>
                                <hr />
                                <p ></p>
                            </div>
                        </div>
                    </div>
                    {data.title}
                    {data.description}
                    <img src={data.toUser.avatar} />

                </div>
            </div>
        </>
    )
}
export function SliderSites({ data }) {
    return (
        <div>
            <article className={` ${styles.myboxs} `}>
                <div  >
                    <div className={` columns ${styles.backheader}`}>
                        <div className="column   is-left">
                            <div className={styles.avatarname}>{` Author: ${data.toUser.name} ${data.toUser.lastname}  `} </div>

                        </div>
                        <div className="column text-left  is-right">
                            <div className={`${styles.avatarname} ${styles.textleft}`}>
                                {/* <a className=' '>
                                   Share 
                        
                                </a> */}

                            </div>

                        </div>
                    </div>
                    <div className={` columns ${styles.backheader2}`}>

                        <div className={`column is-1 is-centered  ${styles.bluesection} `}>
                            <figure class="image is-64x64">
                                {data.toUser.avatar != null && <img class="is-rounded" src={data.toUser.avatar} />}
                            </figure>
                            <div className={styles.avatarname}>
                                <small>Last Update : </small>
                                <time datetime={data.createdAt.split('T')[0]} >{data.createdAt.split('T')[0]}</time>
                            </div>
                        </div>

                        <div className="column  ">
                            <a className={` ${styles.hrefname} `} href={`/thread/${data.id}`}>
                                <div className={` ${styles.mytitlefehater} bluetext `}>
                                    <strong > {data.title}</strong>
                                </div>
                                <br />
                                <p className={` ${styles.listofitem} `}>{data.description}</p>
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}
