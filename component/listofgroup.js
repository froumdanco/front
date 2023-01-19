import { url } from '../data/config'
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css'
import { Facebook } from '@fortawesome/fontawesome-svg-core'
export function MyGroup({ }) {
  let [groupitem, setGroup] = useState();
  useEffect(() => {
    axios.get(`${url}/v1/fgroup`).then(async function (res, req) {

      setGroup(res.data);


    }).catch((error) => {


    });
  }, []);


  return (
    <div>
      {groupitem != null &&
        <div>

          {groupitem.message.map((item, key) =>

            <GroupDetailList item={item}></GroupDetailList>
          )}
        </div>

      }

    </div>
  )
}
export const GroupDetailList = ({ item }) => {

  return (
    <div>
      <div className={`card mt-4 green ${styles.topheader}`} >
        <header className={`card-header ${styles.topheader2} `} color='has-text-black'>
          <p className={`card-header-title`}>

            <a href={`/group/${item.id}`} >

              <div className={` ${styles.hastextwhite} `}>{item.name}</div>
            </a>


          </p>
          <div className='p-2'>
            <small  className={` ${styles.hastextwhite} `}>{item.description}</small>

          </div>

        </header>

        <div className={`card-content`}>
          {item.tosubject.map((items, key) =>
            <a href={`/froum/${items.id}`} key={key} >

              <article className={` mt-3 ${styles.mb2}  `}>
                <div class="">
                  <div className="content">
                    
                    <h4 className={` ${styles.mytitlefehater}  `}>{items.name}</h4>
                    <p className={` ${styles.mydescription}`}>{items.description}</p>

                    <br />
                    <div className={`columns ${styles.footergroup} `}>
                      <div className={'column'}>
                        <small>
                          <i>Last Update</i>
                          <time dateTime={items.createdAt.split('T')[0]}>{items.createdAt.split('T')[0]}</time>

                        </small>
                      </div>
                      <div className={'column'}>
                        <small>
                          <span>[{items.toAnswerCount}]</span>
                           <small>Topics</small>
                        </small>
                      </div>
                    </div>

                  </div>

                </div>
              </article>
            </a>
          )}
        </div>

      </div>
    </div>



  )
}