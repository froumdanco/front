
import { useEditor, EditorContent } from '@tiptap/react'
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from 'react';
import { url } from '../data/config'
import { setCookie, getCookie } from 'cookies-next';

import {
    faReply,
    faFloppyDisk
} from "@fortawesome/free-solid-svg-icons";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

export function ReplyEditor({ text = '', parent, quate ,ReloadPage}) {
    const [domLoaded, setDomLoaded] = useState(false);
    const [content, setContent] = useState('');

    const [htmltext, chanagetext] = React.useState('');
    const [htmltext2, chanagetext2] = React.useState('');
    const QuillNoSSRWrapper = dynamic(
        async () => {
            const { default: RQ } = await import('react-quill');
            // eslint-disable-next-line react/display-name
            return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
        },
        { ssr: false }
    );
    function submitHandler() {
        let checklogin = getCookie('_token');

        let data = {
            text: content,
            parent: parent
        }
        axios.post(url + '/v1/fanswerquiz', data, {
            headers: {

                Authorization: 'Bearer ' + checklogin
            },
        }).then(function (res) {
            ReloadPage();
        }).catch((error) => {


        });


    }
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'video', 'image', 'color'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }

    return (
        <div>
            <div className='card p-3 mt-4'>
                <div className={styles.backwhite}>

                    <ReactQuill modules={modules} onChange={setContent} />
                    <button
                        onClick={submitHandler}
                        size={`small`}
                        className="button m-3 ">
                        <FontAwesomeIcon icon={faFloppyDisk} /> <p className='p-3'>Send</p>
                    </button>


                </div>

            </div>

        </div>
    )

}